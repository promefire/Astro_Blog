---
title: MindSpeed-LLM训练Qwen.2.5-coder流程
published: 2025-07-3 16:00:00
category: 深度学习
tags:
  - 华为昇腾
cover: https://img.promefire.top/Ascend.png
description: 国产之光！
---

1、[昇腾镜像仓库](https://www.hiascend.com/developer/ascendhub/detail/e26da9266559438b93354792f25b2f4a)

2、[MindSpeed-LLm文档](https://gitee.com/ascend/MindSpeed-LLM/blob/1.0.RC3/docs/DOCKER_GUIDE.md)

3、[用户指南](https://gitee.com/ascend/MindSpeed-LLM/blob/1.0.RC3/examples/README.md)

4、[参考流程](https://www.hiascend.com/forum/thread-02115183735165287002-1-1.html)

## 拉取镜像创建容器
![](https://cdn.nlark.com/yuque/0/2025/png/35766745/1751271574567-ca0c07f8-383b-4f88-a3e3-979358746369.png)
在镜像仓库搜索mindspeed-llm找到合适版本的镜像点击立即下载
<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/e11ab8d3321bf725a3e69a7c98bdb01a.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    下载镜像
  </p>
</div>

```bash
docker run -itd --privileged  --name=LLM-2025-rc1 --net=host \
   --shm-size 200g \
   --device=/dev/davinci4 \
   --device=/dev/davinci5 \
   --device=/dev/davinci6 \
   --device=/dev/davinci7 \
   -v /usr/local/Ascend/driver:/usr/local/Ascend/driver \
   -v /usr/local/Ascend/firmware:/usr/local/Ascend/firmware \
   -v /usr/local/sbin/npu-smi:/usr/local/sbin/npu-smi \
   -v /usr/local/sbin:/usr/local/sbin \
   -v /etc/hccn.conf:/etc/hccn.conf \
   -v /home/zhij:/home/zhij \
   swr.cn-south-1.myhuaweicloud.com/ascendhub/mindspeed-llm:2025.rc1-arm  \
   bash

   #进入容器
   docker exec -it LLM-2025-rc1  /bin/bash
```



## <font style="color:rgb(36, 41, 46);">MindSpeed LLM及相关依赖安装</font>
```bash
# 设置环境变量
source /usr/local/Ascend/ascend-toolkit/set_env.sh
source /usr/local/Ascend/nnal/atb/set_env.sh  

# 安装MindSpeed加速库  
git clone https://gitee.com/ascend/MindSpeed.git
cd MindSpeed  
git checkout 2.0.0_core_r0.8.0 
pip install -r requirements.txt  
pip3 install -e .  
cd ..  

# 准备MindSpeed-LLM及Megatron-LM源码  
git clone https://gitee.com/ascend/MindSpeed-LLM.git
git clone https://github.com/NVIDIA/Megatron-LM.git 
cd Megatron-LM  
git checkout core_r0.8.0  
cp -r megatron ../MindSpeed-LLM/  
cd ../MindSpeed-LLM  
git checkout 2.0.0  

pip install -r requirements.txt # 安装其余依赖库
```

使用镜像创建的依赖应该没什么问题，这里服务器无法使用git，我是clone到本地上传到服务器，还挺方便的。建议不要下载zip版本，可能会因版本问题出现错误。在使用`git checkout xxx`切换分支时，会提示本地有未保存的修改，这是因为更近版本的代码也同时存在，直接丢弃即可。

```bash
git reset --hard HEAD
```

## 下载模型权重
从[huggingface](https://huggingface.co/Qwen/Qwen2.5-Coder-7B/tree/main)下载`Qwen/Qwen2.5-Coder-7B`权重，同样是使用git下载到本地上传到服务器

在MindSpeed-LLM  下新建文件夹↓，将下载的文件放在`qwen25-coder-7b-hf`下

```bash
mkdir -p ./model_from_hf/qwen25-coder-7b-hf
cd ./model_from_hf/qwen25-coder-7b-hf
```

### 验证模型完整性


```python
import torch
import torch_npu
import numpy as np
from transformers import AutoTokenizer, AutoModelForCausalLM, AutoConfig

def set_device(device_id):
    torch.npu.set_device(torch.device(f"npu:{device_id}"))

def load_model(load_dir):
    """load model"""
    config = AutoConfig.from_pretrained(load_dir, trust_remote_code=True)
    tokenizer = AutoTokenizer.from_pretrained(load_dir, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(load_dir, trust_remote_code=True).npu().eval()
    return tokenizer, model

if __name__ == "__main__":
    set_device(1)
    load_dir = "./model_from_hf/qwen25-coder-7b-hf"
    tokenizer, model = load_model(load_dir)
    print(model)
```

可以输出模型配置代表成功

## 转换权重
> <font style="color:rgb(25, 27, 31);">MindSpeed-LLM有两种模式下得大模型训练，分别是Mcore、Legacy。关于两种模式的差异，社区上并未给出任何功能定位解释，不过通过Readme特性解释可以看出，相较于legacy，Mcore模式下得大模型训练做了更多的并行加速特性支持，如长序列并行优化、MOE专家并行优化等高阶优化特性支持，即Mcore模式下的大模型训练性能会由于legacy，至于有了更高性能的mcore模式，为什么还要并行存在legacy，社区给的解释是：legacy为早期出版本模式，很多商用客户基于此模式在做版本维护，不能随意日落。</font>
>

这里选择的是mcore模式，转换权重文件的路径为`MindSpeed-LLM/examples/mcore/qwen25_coder/pretrain_qwen25_coder_7b_32k_ptd.sh` ,根据自己配置修改参数。

+ --target-tensor-parallel-size 2  张量并行度（TP），<font style="color:rgb(64, 64, 64);">将模型的单个层（如注意力头、MLP层）的参数</font>**<font style="color:rgb(64, 64, 64);">水平拆分</font>**<font style="color:rgb(64, 64, 64);">到 4 个设备上</font>
+ --target-pipeline-parallel-size 2  流水线并行度（PP），<font style="color:rgb(64, 64, 64);">将模型</font>**<font style="color:rgb(64, 64, 64);">垂直拆分</font>**<font style="color:rgb(64, 64, 64);">成 2 个连续阶段</font>
+ **<font style="color:rgb(64, 64, 64);"></font>**<font style="color:rgb(64, 64, 64);">总卡数 = 张量并行度（</font>**<font style="color:rgb(64, 64, 64);">TP</font>**<font style="color:rgb(64, 64, 64);">） × 流水线并行度（</font>**<font style="color:rgb(64, 64, 64);">PP</font>**<font style="color:rgb(64, 64, 64);">) × 数据并行度（</font>**<font style="color:rgb(64, 64, 64);">DP</font>**<font style="color:rgb(64, 64, 64);">），MindSpeed中没有显示设置DP的地方，通过 总卡数 / (TP × PP）自动计算</font>**<font style="color:rgb(64, 64, 64);">。</font>**后面**训练脚本**中要同步修改 TP和PP。

```diff
# 修改 ascend-toolkit 路径
source /usr/local/Ascend/ascend-toolkit/set_env.sh

# 设置需要的权重转换参数
python convert_ckpt.py \
       --use-mcore-models \
       --model-type GPT \
       --load-model-type hf \
       --save-model-type mg \
+       --target-tensor-parallel-size 2 \
+       --target-pipeline-parallel-size 2 \
       --add-qkv-bias \
+       --load-dir ./model_from_hf/qwen25-coder-7b-hf/ \
+       --save-dir ./model_weights/qwen25-coder-7b-mcore/ \
+       --tokenizer-model ./model_from_hf/qwen25-coder-7b-hf/tokenizer.json \
       --model-type-hf llama2 \
       --params-dtype bf16 
       # --num-layer-list 11, 13, 19, 21  参数根据需要添加
```

<font style="color:rgb(25, 27, 31);">注：修改脚本尽量使用vim修改，打开记事本修改后python命令可能被当作Shell命令执行 或 window下的换行符\r无法识别</font>

## 下载数据集
使用了一个自己的`EvolInstruct-900.jsonl`数据集，形式为：`{"instruction": "xxx", "output": "xxxx"}`,放在dataset目录下。

```diff
mkdir dataset
```

## 数据集预处理
> <font style="color:rgb(64, 72, 91);">【--input】</font>
>
> <font style="color:rgb(64, 72, 91);">可以直接输入到数据集目录或具体文件，如果是目录，则处理全部文件, 支持 .parquet \ .csv \ .json \ .jsonl \ .txt \ .arrow 格式， 同一个文件夹下的数据格式需要保持一致</font>
>
> <font style="color:rgb(64, 72, 91);">【--json-keys】</font>
>
><font style="color:rgb(64, 72, 91);">从文件中提取的列名列表，默认为 text，可以为 text, input, title 等多个输入 等多个输入，结合具体需求及数据集内容使用</font>



```bash
python ./preprocess_data.py \
    --input ./dataset/EvolInstruct-900.jsonl \
    --tokenizer-name-or-path ./model_from_hf/qwen25-coder-7b-hf/ \
    --tokenizer-type PretrainedFromHF \
    --output-prefix ./dataset/EvolInstruct-900 \   #转换后输出文件的文件名前缀
    --json-keys instruction output \ #根据数据集中的关键词进行分割
    --workers 4 \
    --log-interval 1000  
```

成功后多了下面四个文件，按不同的`json-keys`分开，生成`.bin`和`.idx`文件

> <font style="color:rgb(64, 72, 91);">预训练时，数据集路径输入 ./dataset/EvolInstruct-900_instruction_document 即可</font>
>
<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/%E8%BD%AC%E6%8D%A2%E6%95%B0%E6%8D%AE%E9%9B%86.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    转换数据集
  </p>
</div>



## 预训练
启动脚本为`MindSpeed-LLM/examples/mcore/qwen25_coder/pretrain_qwen25_coder_7b_32k_ptd.sh`,配置参数

```bash
export ASCEND_RT_VISIBLE_DEVICES=4,5,6,7
NPUS_PER_NODE=4


# please fill these path configurations
CKPT_LOAD_DIR="./model_weights/qwen25-coder-7b-mcore/"
CKPT_SAVE_DIR="./ckpt/qwen25-coder-7b"
DATA_PATH="/dataset/EvolInstruct-900_instruction_document"
TOKENIZER_MODEL="./model_from_hf/qwen25-coder-7b-hf/"

TP=2
PP=2
SEQ_LEN=1638
```

+ 1，2设置npu数量及id号
+ CKPT_LOAD_DIR：转换后的权重路径
+ CKPT_SAVE_DIR：训练后权重保存路径
+ DATA_PATH：数据集路径
+ TOKENIZER_MODEL：分词器路径
+ TP、PP 与前面统一
+ SEQ_LEN：默认是31K，基本都会OOM，修改到几千即可

在`MindSpeed-LLM`目录下启动

```bash
bash examples/mcore/qwen25_coder/pretrain_qwen25_coder_7b_32k_ptd.sh
```

<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/%E8%AE%AD%E7%BB%83%E7%BB%93%E6%9E%9C.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    训练结果
  </p>
</div>


**<font style="color:rgb(64, 64, 64);"></font>**

**<font style="color:rgb(64, 64, 64);"></font>**


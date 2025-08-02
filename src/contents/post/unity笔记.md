---
title: unity-ruby大冒险
published: 2023-06-05 15:01:48
category: 是游戏哦
tags:
  - Unity
  - C#
cover: https://img.promefire.top/blog-img/20240110-4f699e0e7681be6ebaa5f96bd40f0a8c.png
description: unity笔记，有点乱，有空再整理
highlight_shrink: true

---

## 前言

三天时间跟着B站教程终于把入门小游戏做完了！可喜可贺！记一下笔记

贴上B站教程：

[Ruby大冒险](https://www.bilibili.com/video/BV1V4411W787/?spm_id_from=333.337.search-card.all.click)

---

* 切记一点：不要再场景运行时后进行修改，一定要关了之后再修改

1、在人物属性刚体界面冻结Z轴旋转，可以使人物刚体碰撞时不旋转

![image-20230602103837705](https://img.promefire.top/blog-img/20240110-518bcbf3446c71a0f30107eae80da5cf.png)



2、碰撞抖动问题

要使用刚体更新位置

3、相机跟随

窗口-->包管理器--->包：Unity注册表--->cinemachine. 安装完成后可以在菜单游戏对象中找到。创建一个2d cinema

4、设置水面不能走

将除水面的其他tile右侧的碰撞器类型设置为无

![image-20230602111828620](https://img.promefire.top/blog-img/20240110-6b7d1714d03da94ec2a23a1d38642fcd.png)

5、合并一些碰撞格

给tilemap添加组件 Composite Collider 2D,

在由复合使用上打勾

![image-20230602112421994](https://img.promefire.top/blog-img/20240110-e7b9fb558d0a2063087fc7b8865d6a9b.png)

* 记得要在地图的Rigibody 2D中把重力关掉（只关这一个没用），把地图刚体设置为静态

![image-20230602112659463](https://img.promefire.top/blog-img/20240110-fb841344318cffe5e9f4d3e5dbf4e201.png)

6、取消地图边界外视野

相机属性里添加一个cinemachineConfiner

![image-20230602112830954](https://img.promefire.top/blog-img/20240110-30df5777989ae988596a8c652705526e.png)

新建一个CameraConfiner

![image-20230602113021563](https://img.promefire.top/blog-img/20240110-e417887ddbaa6df0860b668e94762e3f.png)

属性里添加一个可编程的碰撞体


点击编辑碰撞器，框出边界

只是触发，要不然会和人物产生碰撞

![image-20230602113519684](https://img.promefire.top/blog-img/20240110-18556ff956efaa5fd3c27f9fecc9e2ec.png)

* 要把新建成的CameraConfiner拖动到2D相机的Bounding Shape 2D，要把框好的边界赋给相机，要不然就只是一个文件

7、使用math函数时，直接添加了`using System;`添加``using System.Math`会报错，不晓得什么情况

8、预置体，树木、草莓等元素设置好脚本和碰撞体积以后，想要批量复制，就用到了预置体，再Assets下新建一个prefabs文件夹，将做好的元素放入其中，如果变蓝了就说明已经是预置体了

9、

```c#
#是进入有伤害
void OnTriggerEnter2D(Collider2D other){}
#呆在区域内一直有伤害
void OnTriggerStay2D(Collider2D other){}
```

10、

报错：[ AnimationEvent has no function name specified!

在动画编辑器中添加了动画事件但没有进行后续处理，删除即可

![image-20230604112938771](https://img.promefire.top/blog-img/20240110-b4dbe3d241499fb18a0373a5cd6d7733.png)

11、图层之间不希望碰撞，在项目设置--> 2d物理中把√去掉

![image-20230604140038562](https://img.promefire.top/blog-img/20240110-e342164fc5e8b937cc2c2034291a293e.png)

12、

在对象刚生成的时候就会执行Awake方法，在start方法之前执行。

```C#
Void Awake(){}
```

发射子弹的时候，不能用start()方法

13、

```c#
Destroy(this.gameObject,2f);
```

参数： 要销毁的游戏对象，经过多长时间销毁。

14、

这个不行

```c#
EnemyController ec = other.GetComponent<EnemyController>();
```

要加一个gameObject

```c#
EnemyController ec = other.gameObject.GetComponent<EnemyController>();
```

15、

启动特定动画

```c#
private Animator anim;//获取动画组件

void Start()
    {
        .
        .
        .
        anim = GetComponent<Animator>();
    }
void something(){
    anim.SetTrigger("Launch");
}

```

16、特效

![image-20230604144025643](https://img.promefire.top/blog-img/20240110-bc407720c1f1a380bb3ce8b6c2ff6324.png)

0-2可以在两张贴图中随机

![image-20230604143959187](https://img.promefire.top/blog-img/20240110-2dde14aa2aac267f015d182ad99ac318.png)

生命周期颜色，烟冒到上面会变淡



![image-20230604144837441](https://img.promefire.top/blog-img/20240110-bdf40630f7a6913a350c9084637f4c68.png)

打败敌人后，停止特效

```c#
 public ParticleSystem brokenEffect;//获取特效组件

 public void Fixed(){
		.
        .
     
        if(brokenEffect.isPlaying == true){
            brokenEffect.Stop();
        }
     	.
        .

    }
```



![image-20230604145736865](https://img.promefire.top/blog-img/20240110-1eda2b8012da3d8aa95495cc17aabd61.png)

17、画布

![image-20230604154233728](https://img.promefire.top/blog-img/20240110-dff000b023ed07e93095ceacb5cdfaf8.png)

18、音乐组件`Audio source` 

19、离敌人远声音小，声音改成3D，最大距离改小

![image-20230605093848619](https://img.promefire.top/blog-img/20240110-c780ffcb7294ef963acf8328d4c39db5.png)

20、UImanager中Text组件托不上去

原因是组件类型是Text TMP，而代码中是Text，把代码改成:

```c#
using TMPro;
public TMP_Text progressText;
```

21、地图编辑

窗口---》2d--》平铺调色板

22、

vscode代码补全问题https://blog.csdn.net/G0rgeoustray/article/details/106754628

23、射线检测

射线未能检测到碰撞体：最终发现问题是由于使用了错误的`Physics.Raycast`方法而不是`Physics2D.Raycast`。由于你的游戏对象是2D的，因此需要使用2D版本的射线检测方法。

```c#
 foreach (Vector3 direction in directions)
    {
        RaycastHit2D[] hits = Physics2D.RaycastAll(explosionPosition, direction, power);
            Debug.DrawRay(explosionPosition, direction * power, Color.red, 1f); // 打印射线起始点和终点
            foreach (RaycastHit2D hit in hits)
            {
                if (hit.collider.CompareTag("iceCube"))
                {
                    Debug.Log("有冰块！！！");
                    Destroy(hit.collider.gameObject);
                }
            }
 }
```



## 代码：

1、PlayController.cs

*   玩家

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class PlayerController : MonoBehaviour
{
    // Start is called before the first frame update
    public float speed = 5f;
    private int maxHealth = 5;
    private int currentHealth ;

    //玩家的朝向
    private   Vector2 lookDirection = new Vector2(1,0);//默认朝右  

    Rigidbody2D rbody;//刚体组件
    public int MyMaxHealth{get {return maxHealth;}}
    public int MyCurrentHealth{get{return currentHealth;}}

    private float invincibleTime = 2f;//无敌时间2秒

    private float invincibleTimer;//无敌计时器

    private bool isInvincible;//是否无敌

    private Animator anim;//获取动画组件

    public GameObject bulletPrefab;

    //音效
    public AudioClip hitClip; //受伤

    public AudioClip bulletClip;

    public int curBulletCount;

    public int maxBulletCount = 99;






    void Start()
    {
        rbody = GetComponent<Rigidbody2D>();
        invincibleTimer = 0;
        currentHealth = maxHealth;

        curBulletCount  = 2;
        anim = GetComponent<Animator>();
        UImanager.instance.UpdateHealthBar(currentHealth,maxHealth);//更新血条
        UImanager.instance.UpdateBulletCount(curBulletCount,maxBulletCount);

    }

    // Update is called once per frame
    void Update()
    {
        // transform.Translate(transform.right * speed * Time.deltaTime);
        float moveX = Input.GetAxisRaw("Horizontal");//控制水平
        float moveY = Input.GetAxisRaw("Vertical");//W:1,S:-1;


        //
        Vector2 moveVector = new Vector2(moveX,moveY);
        if(moveVector.x != 0 || moveVector.y != 0 ){
            lookDirection = moveVector;
        }
        anim.SetFloat("Look X",lookDirection.x);
        anim.SetFloat("Look Y",lookDirection.y);
        anim.SetFloat("Speed",moveVector.magnitude);//取向量长度

        
        //移动
        Vector2 position = rbody.position;
        // position.x += moveX * speed * Time.deltaTime;
        // position.y += moveY * speed * Time.deltaTime;
        // transform.position = position;  更新组件位置
        position += moveVector * speed *Time.deltaTime;
        rbody.MovePosition(position);//更新刚体位置

        //无敌计时
        if(isInvincible){
        invincibleTimer -= Time.deltaTime;
        if(invincibleTimer < 0){
            isInvincible = false;
        }
    }  


    //按下J建进行攻击
    if(Input.GetKeyDown(KeyCode.J) && curBulletCount > 0){
        ChangeBulletCount(-1);
        anim.SetTrigger("Launch");
        GameObject bullet = Instantiate(bulletPrefab,rbody.position + Vector2.up * 0.5f,Quaternion.identity);//参数分别是对象、位置、方向（默认方向）
        AudioManager.instance.AudioPlay(bulletClip);//播放音效
        BulletController bc = bullet.GetComponent<BulletController>();
        if(bc != null){
            bc.move(lookDirection,300);
            
        }

    }
    //按下E建与npc交互
    if(Input.GetKeyDown(KeyCode.E)){
        RaycastHit2D hit = Physics2D.Raycast(rbody.position,lookDirection,2f,LayerMask.GetMask("NPC"));//layerMask根据名字检测层级
        if(hit.collider != null){
            Debug.Log("hit npc!!");
            NpcManager npc = hit.collider.GetComponent<NpcManager>();
            if(npc != null){
                npc.show();
            }
        }
    }


    }


    public void ChangeHealth(int amount){
        // 伤害是传入负值的，受到伤害，如果是无敌状态，就不进行伤害判定，反之，开启无敌状态
        if(amount < 0){
            if(isInvincible){
                return;
            }
            anim.SetTrigger("Hit");
            AudioManager.instance.AudioPlay(hitClip);//播放音效
            isInvincible = true;
            invincibleTimer = invincibleTime;//重置无敌时间
            
        }

        // 约束一下玩家生命值，0---max
        currentHealth = Math.Clamp(currentHealth + amount ,0,maxHealth);
        UImanager.instance.UpdateHealthBar(currentHealth,maxHealth);//更新血条
        Debug.Log(currentHealth + "/" + maxHealth);
    }

    public void ChangeBulletCount(int amount){
        curBulletCount = Math.Clamp(curBulletCount + amount ,0,maxBulletCount);
        UImanager.instance.UpdateBulletCount(curBulletCount,maxBulletCount);
    }

}


```

2、EnemyController.cs

*   敌人相关

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class EnemyController : MonoBehaviour
{
    public int speed = 3;
    public float changeDirectionTime = 2f;//改变方向的时间。
    public float changeTimer;//改变方向的计时器 

    private int Health = 5;

    public int getHealth{get {return Health;}}

    private bool isDead;

    public ParticleSystem brokenEffect;//获取特效组件

    // private Health;
    private Rigidbody2D rbody;
    public bool isVertical;
    private Vector2 moveDirection;
    private Animator anim;//获取动画组件

    public AudioClip robotFixedClip;

    // public AudioClip robotWalkClip;


    // Start is called before the first frame update
    void Start()
    {
        rbody = GetComponent<Rigidbody2D>();
        anim = GetComponent<Animator>();
        moveDirection = isVertical ? Vector2.up : Vector2.right;
        changeTimer = changeDirectionTime;
        isDead = false;
    
        

    }

    // Update is called once per frame
    void Update()
    {
        if(isDead){return;}//挂了就别移动了
        changeTimer -= Time.deltaTime;
        if(changeTimer < 0){
            moveDirection *= -1;
            changeTimer = changeDirectionTime;
        }
        Vector2 position = rbody.position;
        position.x += moveDirection.x * speed * Time.deltaTime;
        position.y += moveDirection.y * speed * Time.deltaTime;
        rbody.MovePosition(position);
        anim.SetFloat("moveX",moveDirection.x);
        anim.SetFloat("moveY",moveDirection.y);

    }
    //怪物掉血
    public void ChangeHealth(int amount){
        Health = Math.Clamp(Health + amount ,0,Health);
        if(Health == 0){
            Fixed();
            Destroy(this.gameObject,3f);
        }
        Debug.Log(Health);
    }
    //播放死亡动画
    public void Fixed(){
        isDead = true;
        if(brokenEffect.isPlaying == true){
            brokenEffect.Stop();
        }
        AudioManager.instance.AudioPlay(robotFixedClip);//播放音效
        //死了就没碰撞掉血了
        rbody.simulated = false;
        anim.SetTrigger("fix");
    }
    
    private void OnCollisionEnter2D(Collision2D other) {
        PlayerController pc = other.gameObject.GetComponent<PlayerController>();
        if(pc != null){
            pc.ChangeHealth(-1);
        }
    }
}

```

3、Collectible.cs

*   草莓

```c#
using static System.Console;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
// using System.Math;

public class Collectible : MonoBehaviour
{

    
    public ParticleSystem collectEffect;

    public AudioClip collectClip;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    // 碰撞检测相关类
    // <param name="other"></param>

    void OnTriggerEnter2D(Collider2D other){
        //检测一下与草莓碰撞的物体有没有挂载playercontroller脚本
        PlayerController pc = other.GetComponent<PlayerController>();
        if(pc != null){
            if(pc.MyCurrentHealth < pc.MyMaxHealth){
            
            pc.ChangeHealth(1);  
        
            
            Instantiate(collectEffect,transform.position,Quaternion.identity);
            AudioManager.instance.AudioPlay(collectClip);//播放音效
            Destroy(this.gameObject);
            }
            
            // Debug.Log("玩家碰到草莓");
        }
    }
}

```



4、BulletController.cs

*   子弹相关

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletController : MonoBehaviour
{

    Rigidbody2D rbody;
    
    public AudioClip hitEnemyClip;
    // Start is called before the first frame update
    void Awake()
    {
        rbody = GetComponent<Rigidbody2D>();

        Destroy(this.gameObject,2f);

    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void move(Vector2 moveDirection,float moveForce){
        rbody.AddForce(moveDirection * moveForce);//施加一个移动方向的力


    }
    private void OnCollisionEnter2D(Collision2D other) {
        EnemyController ec = other.gameObject.GetComponent<EnemyController>();
        if(ec != null){
            ec.ChangeHealth(-1);
            
        }
        AudioManager.instance.AudioPlay(hitEnemyClip);//播放音效
        Destroy(this.gameObject);//碰到就销毁    
    
    } 


}

```

5、BulletBox.cs

*   子弹袋

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletBox : MonoBehaviour
{
    public int bulletCount = 10;

    public ParticleSystem collectEffect;

    public AudioClip collectClip;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnTriggerEnter2D(Collider2D other){
        PlayerController pc = other.GetComponent<PlayerController>();
        if(pc != null){
            if(pc.curBulletCount < pc.maxBulletCount){
            pc.ChangeBulletCount(bulletCount);

            Instantiate(collectEffect,transform.position,Quaternion.identity);

            // AudioManager.instance.AudioPlay(collectClip);//播放音效
            Destroy(this.gameObject);
        }
        }
    }
}

```

6、UImanager.cs

*   UI界面（血条、子弹数量）

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class UImanager : MonoBehaviour
{
    
    public TMP_Text  bulletCountText;

    public static UImanager instance{get;  private set;}

    void Start(){
        instance = this;
    }
    public Image healthBar;//角色血条

    public void UpdateHealthBar(int curAmount,int maxAmount){
        healthBar.fillAmount = (float)curAmount / (float)maxAmount;



    }

    //更新子弹数量文本
    public void UpdateBulletCount(int curAmount,int maxAmount){
        bulletCountText.text = curAmount.ToString() + " / " + maxAmount.ToString();
    }
}

```

7、AudioManager.cs

*   音效

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioManager : MonoBehaviour
{
    public static AudioManager instance {get; private set;}
    private AudioSource audioS;


    // Start is called before the first frame update
    void Start()
    {
        instance = this;
        audioS = GetComponent<AudioSource>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }


    public void AudioPlay(AudioClip clip){
        audioS.PlayOneShot(clip);
    }
}

```

8、NpcManager.cs

*   NPC对话框显示

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class NpcManager : MonoBehaviour
{

    public GameObject dialogImage;

    public GameObject tipImage;

    public float showTime = 4f;

    public float showTimer;//计时器
    // Start is called before the first frame update
    void Start()
    {
        showTimer = -1;
        tipImage.SetActive(true);
        dialogImage.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {
        showTimer -= Time.deltaTime;
        if(showTimer < 0){
            dialogImage.SetActive(false);
            tipImage.SetActive(true);
        }
    }
    //显示对话框
    public void show(){
        showTimer = showTime;
        tipImage.SetActive(false);
        dialogImage.SetActive(true);


    }
}

```




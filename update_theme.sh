#!/bin/bash

# =================================================================
# Astro 模板增强同步脚本 (NPM 版本)
#
# 版本: 2.1
#
# 功能:
#   - 从名为 'template' 的远程仓库拉取更新。
#   - 检出除 'src/contents' 之外的所有模板相关文件和目录。
#   - 自动使用 npm 处理依赖安装，并暂存 package-lock.json。
#   - 自动获取模板仓库的最新 commit 信息并生成新的 commit。
#   - (可选) 允许传入参数作为自定义 commit 信息。
#
# 用法:
#   - 自动模式: ./update-theme.sh
#   - 手动模式: ./update-theme.sh "你的自定义 commit 标题"
# =================================================================

# --- 配置 ---
TEMPLATE_REMOTE="template"
TEMPLATE_BRANCH="main"
# --- 结束配置 ---

set -e # 如果任何命令失败，则立即退出脚本

echo "▶️  步骤 1/5: 从远程仓库 '$TEMPLATE_REMOTE' 获取最新变更..."
git fetch $TEMPLATE_REMOTE

echo "▶️  步骤 2/5: 检出模板文件，覆盖本地版本..."
ROOT_ITEMS=(
    .gitignore .prettierrc.mjs astro.config.mjs package.json
    README_zh.md README.md svelte.config.js tailwind.config.mjs tsconfig.json
)
SRC_ITEMS=(
    src/components src/layouts src/locales src/pages src/plugins
    src/styles src/types src/utils src/content.config.ts src/env.d.ts
)
git checkout ${TEMPLATE_REMOTE}/${TEMPLATE_BRANCH} -- "${ROOT_ITEMS[@]}" "${SRC_ITEMS[@]}"

echo "▶️  步骤 3/5: 根据 package.json 更新依赖 (使用 npm)..."
npm install
echo "  -> 将 package-lock.json 添加到暂存区..."
git add package-lock.json


echo "▶️  步骤 4/5: 生成并执行 commit..."
# 检查是否传入了第一个参数 ($1)
if [ -n "$1" ]; then
    # --- 手动模式 ---
    echo "  -> 使用了自定义 commit 信息。"
    COMMIT_MSG="$1"
    git commit -m "$COMMIT_MSG"
else
    # --- 自动模式 ---
    echo "  -> 自动从模板仓库获取 commit 信息..."
    # 获取模板仓库最新 commit 的完整信息
    LATEST_TEMPLATE_MSG=$(git log -1 --format=%B ${TEMPLATE_REMOTE}/${TEMPLATE_BRANCH})

    # 创建一个新的、更具描述性的 commit 信息
    # -m "标题" -m "正文" 可以创建带换行的 commit
    COMMIT_TITLE="feat(theme): 同步模板更新"
    COMMIT_BODY="从 '${TEMPLATE_REMOTE}/${TEMPLATE_BRANCH}' 同步变更。

原始 commit 信息如下：
--------------------------------
$LATEST_TEMPLATE_MSG"

    git commit -m "$COMMIT_TITLE" -m "$COMMIT_BODY"
fi

echo "▶️  步骤 5/5: 推送变更到远程仓库..."
# 这里假设你的主分支是 main，如果不是请修改
git push origin main

echo "✅ 同步完成并已自动推送！"
# Paper Knowledge Base

Obsidian vault，按研究方向组织的论文笔记库。

## 目录结构

按研究主题分文件夹，小写 + 连字符命名：

```
papers/
├── assets/                              # 论文图片（按论文简称分子文件夹）
│   ├── RewardDance/
│   └── SoliReward/
├── generation-model/                    # 生成模型（Diffusion, AR, GAN, VAE 等）
├── image-generation-posttrain/          # 图像生成后训练（RLHF, DPO, ReFL 等）
├── reward-model/                        # 奖励模型
├── unified-understanding-generation/    # 多模态统一理解与生成
├── vision-tokenizer/                    # 视觉 tokenizer（VQ-VAE, VQGAN 等）
├── vlm/                                 # Vision-Language Model
└── other/                               # 不属于以上分类
```

新建文件夹需符合已有粒度——只在论文数量 ≥ 3 且主题与现有文件夹无法归类时创建。

## 文件命名

```
YYYY-MM PaperName.md
```

- `YYYY-MM` = 论文首次提交（非修订）的年月
- `PaperName` = 论文简称或缩写（如 DDPM, VAR, ImageReward）
- 无简称的论文用方法名或关键词（如 PhysicalSimulator）

## 论文笔记模板

每篇论文严格使用以下格式：

```markdown
---
title: "完整论文标题"
arxiv_id: "YYMM.NNNNN"
arxiv_url: "https://arxiv.org/abs/YYMM.NNNNN"
authors:
  - "Author 1"
  - "Author 2"
published: "YYYY-MM-DD"
categories:
  - "cs.CV"
tags:
  - paper
  - <folder-name>          # 与所在文件夹一致
  - <institution-tag>      # 小写，如 bytedance, tsinghua, google
  - modality/<modality>    # 论文涉及的模态，可多选：image, video, text, audio, 3d
institution: "机构名"
notion_topic: "中文主题标签"
added: "YYYY-MM-DD"        # 加入知识库的日期
rating: ""
aliases:
  - "简称"
extends: []                 # 基于/改进自哪些工作 [[Paper]]
baseline: []                # 对比基线 [[Paper]]
related_topic: []           # 相关论文 [[Paper]]
---

# 简称

## 📌 核心贡献

> 一句话总结核心贡献（中文）。

## 📖 摘要

原文 Abstract（英文）。

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | xxx |
| 发表 | YYYY-MM-DD |
| 分类 | cs.CV, cs.LG |
| 链接 | [arXiv](url) |

## 📝 我的笔记

详细技术笔记（中文），包括：
- 动机与问题定义
- 方法细节（公式、架构、算法）
- 关键实验结果（表格）
- Ablation 分析
- 个人思考与评价

这个 section 内容深浅不限，可以后续逐步补充。

## 🔗 相关论文

**基于/改进自：** [[Paper1]]

**同方向：** [[Paper2]], [[Paper3]]
```

## 添加论文流程

1. **获取元数据**：WebFetch `arxiv.org/abs/{ID}`，提取 title, authors, abstract, date, categories
2. **获取方法细节**：WebFetch `arxiv.org/html/{ID}`（不可用时用 pdf），提取完整方法描述
3. **获取关键图片**：WebFetch `arxiv.org/html/{ID}` 提取图片 URL 列表，选择 2-4 张关键图下载
4. **确定分类**：选择最匹配的文件夹；无法归类放 `other/`
5. **创建文件**：按模板填写 YAML frontmatter + 所有 section
6. **核心贡献**：用一句中文概括论文最重要的贡献
7. **我的笔记**：将方法细节整理为结构化中文笔记，重点包括：
   - 核心问题/动机
   - 方法（含关键公式）
   - 关键定量结果（表格形式）
   - 总结性评价
8. **交叉引用**：填写 extends / baseline / related_topic，在 🔗 section 用 `[[]]` 链接

## 图片规范

### 存储结构

```
assets/<PaperName>/
├── fig1-method-overview.png     # 方法总览/架构图
├── fig3-results-comparison.png  # 结果对比
└── fig5-ablation.png            # Ablation 可视化
```

- 文件夹名 = 论文简称（与 aliases 一致）
- 文件名 = `fig{原文编号}-{描述}.png`，描述用小写连字符

### 下载流程

1. WebFetch `arxiv.org/html/{ID}`，提取所有图片的相对路径和描述
2. 构造完整 URL：`https://arxiv.org/html/{ID}v{version}/{relative_path}`
3. 用 `curl -sO` 下载到 `assets/<PaperName>/`
4. 重命名为描述性文件名

### 选图原则（每篇选 2-4 张）

必选：
- **方法总览图**（通常是 Figure 1 或 2）— 放在「📝 我的笔记」的最前面作为「方法总览」小节
- **核心结果对比图** — 放在「关键结果」小节前

可选：
- Ablation 可视化、分布对比图、定性结果对比

### 嵌入格式

```markdown
![中文描述：概括图片内容和关键信息](../assets/PaperName/fig1-method-overview.png)
```

- 使用标准 Markdown 图片语法（非 Obsidian `![[]]`），保证跨平台兼容
- alt text 用中文，简要说明图片展示了什么

## Tags 规范

每篇论文的 tags 包含四类：

| 类别 | 格式 | 示例 |
|------|------|------|
| 类型 | `paper` | `paper`（固定） |
| 主题 | `<folder-name>` | `reward-model`, `generation-model` |
| 机构 | `<institution>` | `bytedance`, `tsinghua`, `google` |
| 模态 | `modality/<modality>` | `modality/image`, `modality/video`, `modality/text` |

可用模态标签：`modality/image`, `modality/video`, `modality/text`, `modality/audio`, `modality/3d`

一篇论文可以有多个模态标签（如同时涉及 T2I 和 T2V 的论文标记 `modality/image` + `modality/video`）。

## 其他注意事项

- 语言：frontmatter 字段用英文，核心贡献和笔记用中文，摘要保留英文原文
- 公式：用 LaTeX `$$...$$` 格式
- 表格：实验结果尽量用 Markdown 表格呈现
- 不要遗漏 YAML frontmatter 中的任何字段，空值填 `""` 或 `[]`
- tags 中的 folder-name 必须与论文所在文件夹名一致
- added 日期填写实际加入知识库的日期，不是论文发表日期

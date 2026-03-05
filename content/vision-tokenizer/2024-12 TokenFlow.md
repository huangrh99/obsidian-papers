---
arxiv_id: "2412.03069"
arxiv_url: "https://arxiv.org/abs/2412.03069"
authors:
  - ""
published: "2024-12"
categories:
  - ""
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: "ByteDance"
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
extends:
  - "[[VQGAN]]"
  - "[[CLIP]]"
baseline:
  - "[[VQGAN]]"
  - "[[CLIP]]"
  - "[[DINOv2]]"
related_topic:
  - "[[UniTok]]"
  - "[[TokLIP]]"
  - "[[MUSE-VL]]"
  - "[[QLIP]]"
---

# TokenFlow

## 📌 核心贡献

> semantic encoder+pixel encoder, semantic decoder+pixel decoder; 词表：两套codebook 但是shared mapping; 词表大小128k；理解和生成的验证时分开做的，生成用的VAR setting，其实指标没有MUSE-VL高

## 📖 摘要

semantic encoder+pixel encoder, semantic decoder+pixel decoder; 词表：两套codebook 但是shared mapping; 词表大小128k；理解和生成的验证时分开做的，生成用的VAR setting，其实指标没有MUSE-VL高

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | ByteDance |
| 发表 | 2024-12 |
| 分类 |  |
| 链接 | [arXiv](https://arxiv.org/abs/2412.03069) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[VQGAN]], [[CLIP]]
**对比基线：** [[VQGAN]], [[CLIP]], [[DINOv2]]
**同方向：** [[UniTok]], [[TokLIP]], [[MUSE-VL]], [[QLIP]]

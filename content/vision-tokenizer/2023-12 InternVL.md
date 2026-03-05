---
arxiv_id: "2312.14238"
arxiv_url: "https://arxiv.org/abs/2312.14238"
authors:
  - "Zhe Chen"
  - "Jiannan Wu"
  - "Wenhai Wang"
  - "Weijie Su"
  - "Guo Chen"
  - "Sen Xing"
published: "2023-12-21"
categories:
  - "cs.CV"
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
aliases:
  - "InternVL"
extends:
  - "[[CLIP]]"
baseline:
  - "[[CLIP]]"
  - "[[DINO]]"
related_topic:
  - "[[AIMv2]]"
  - "[[SigLIP2]]"
  - "[[DINOv2]]"
---

# internViT

## 📌 核心贡献

> 切片方案；Stage 1:  图文对数据对比学习，Stage 2: 生成式微调 (Generative Fine-tuning)：连接 LLM，冻结视觉编码器，训练连接层（MLP）。这一步让视觉特征能被 LLM “读懂”。Stage 3: 像素级解冻 (Pixel Unfreezing): 同时解冻视觉编码器 (InternViT) 和 LLM• 使用高质量的指令微调数据（SFT Data），让 InternViT 适应具体的任务（如 OCR、问答）。

## 📖 摘要

切片方案；Stage 1:  图文对数据对比学习，Stage 2: 生成式微调 (Generative Fine-tuning)：连接 LLM，冻结视觉编码器，训练连接层（MLP）。这一步让视觉特征能被 LLM “读懂”。Stage 3: 像素级解冻 (Pixel Unfreezing): 同时解冻视觉编码器 (InternViT) 和 LLM• 使用高质量的指令微调数据（SFT Data），让 InternViT 适应具体的任务（如 OCR、问答）。

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2023-12-21 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2312.14238) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[CLIP]]
**对比基线：** [[CLIP]], [[DINO]]
**同方向：** [[AIMv2]], [[SigLIP2]], [[DINOv2]]

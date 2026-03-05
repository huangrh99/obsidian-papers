---
arxiv_id: "2506.03147"
arxiv_url: "https://arxiv.org/abs/2506.03147"
authors:
  - "Bin Lin"
  - "Zongjian Li"
  - "Xinhua Cheng"
  - "Yuwei Niu"
  - "Yang Ye"
  - "Xianyi He"
published: "2025-06-03"
categories:
  - "cs.CV"
tags:
  - paper
  - vision-tokenizer
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-04"
rating: ""
aliases:
  - "UniWorld"
extends:
  - "[[DINO]]"
  - "[[DINOv2]]"
  - "[[CLIP]]"
baseline:
  - "[[DINOv2]]"
  - "[[CLIP]]"
related_topic:
  - "[[DINO-Foresight]]"
  - "[[InternVL]]"
  - "[[AIMv2]]"
---

# UniWorld

## 📌 核心贡献

> 本文提出了 UniWorld，针对UniWorld-V1: High-Resolution Semantic En... 方向进行研究，提出了新颖的方法并在相关基准上取得了优异性能。

## 📖 摘要

Although existing unified models achieve strong performance in vision-language understanding and text-to-image generation, they remain limited in addressing image perception and manipulation -- capabilities increasingly demanded in practical applications. Recently, OpenAI introduced the powerful GPT-4o-Image model, which showcases advanced capabilities in comprehensive image perception and manipulation, sparking widespread interest. Through carefully designed experiments, we observe that GPT-4o-Image likely relies on semantic encoders rather than VAEs for feature extraction, despite VAEs being commonly regarded as crucial for image manipulation tasks. Inspired by this insight, we propose UniWorld-V1, a unified generative framework built upon semantic features extracted from powerful multimodal large language models and contrastive semantic encoders. Using only 2.7M training data, UniWorld-V1 achieves impressive performance across diverse tasks, including image understanding, generation, manipulation, and perception. We fully open-source the UniWorld-V1 framework, including model weights, training and evaluation scripts, and datasets to promote reproducibility and further research.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-06-03 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2506.03147) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[DINO]], [[DINOv2]], [[CLIP]]
**对比基线：** [[DINOv2]], [[CLIP]]
**同方向：** [[DINO-Foresight]], [[InternVL]], [[AIMv2]]

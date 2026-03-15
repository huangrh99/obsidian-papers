---
title: "NextFlow: Unified Sequential Modeling Activates Multimodal Understanding and Generation"
arxiv_id: "2601.02204"
arxiv_url: "https://arxiv.org/abs/2601.02204"
authors:
  - "Huichao Zhang"
  - "Liao Qu"
  - "Yiheng Liu"
  - "Hang Chen"
  - "Yangyang Song"
  - "Yongsheng Dong"
published: "2026-01-05"
categories:
  - "cs.CV"
  - "cs.AI"
tags:
  - paper
  - zju
institution: "Zhejiang University"
notion_topic: "理解生成统一"
added: "2026-03-04"
rating: ""
aliases:
  - "NextFlow"
related_topic:
  - "[[Transfusion]]"
  - "[[UniFluid]]"
  - "[[Show-o2]]"
---

# NextFlow: Unified Sequential Modeling Activates Multimodal Understanding and Generation

## 📌 核心贡献

> NextFlow是一个统一的解码器自回归Transformer模型，通过在6万亿个交错的文本-图像离散tokens上训练，实现了多模态理解和生成。其核心创新在于将统一的视觉表示融入统一的自回归架构中，并针对图像的层级特性，创造性地采用了“下一尺度预测”而非传统的“下一token预测”进行视觉生成。这使得模型能够原生支持图像编辑、交错内容和视频生成等多种高级功能。

## 📖 摘要

We present NextFlow, a unified decoder-only autoregressive transformer trained on 6 trillion interleaved text-image discrete tokens. By leveraging a unified vision representation within a unified autoregressive architecture, NextFlow natively activates multimodal understanding and generation capabilities, unlocking abilities of image editing, interleaved content and video generation. Motivated by the distinct nature of modalities - where text is strictly sequential and images are inherently hierarchical - we retain next-token prediction for text but adopt next-scale prediction for visual generation. This departs from traditional raster-scan methods, enabling the generation of 1024x1024 images in just 5 seconds - orders of magnitude faster than comparable AR models. We address the instabilities of multi-scale generation through a robust training recipe. Furthermore, we introduce a prefix-tuning strategy for reinforcement learning. Experiments demonstrate that NextFlow achieves state-of-the-art performance among unified models and rivals specialized diffusion baselines in visual quality.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2026-01-05 |
| 分类 | cs.CV, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2601.02204) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[Transfusion]], [[UniFluid]], [[Show-o2]]
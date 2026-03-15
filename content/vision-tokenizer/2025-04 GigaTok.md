---
title: "GigaTok: Scaling Visual Tokenizers to 3 Billion Parameters for Autoregressive Image Generation"
arxiv_id: "2504.08736"
arxiv_url: "https://arxiv.org/abs/2504.08736"
authors:
  - "Tianwei Xiong"
  - "Jun Hao Liew"
  - "Zilong Huang"
  - "Jiashi Feng"
  - "Xihui Liu"
published: "2025-04-11"
categories:
  - "cs.CV"
tags:
  - paper
  - vision-tokenizer
  - multimodal
  - bytedance
  - hku
institution: "HKU, ByteDance"
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
aliases:
  - "GigaTok"
extends:
  - "[[VQGAN]]"
  - "[[ViT-VQGAN]]"
baseline:
  - "[[VQGAN]]"
  - "[[ViT-VQGAN]]"
  - "[[FSQ]]"
related_topic:
  - "[[FQGAN]]"
  - "[[UniTok]]"
  - "[[VQGAN-100k]]"
---

# Gigatok

## 📌 核心贡献

> 首个将视觉 tokenizer 扩展到 30亿参数的工作，同时提升重建质量、生成质量和表征学习能力。发现 tokenizer 扩大后 latent space 复杂度上升导致下游 AR 生成质量下降（reconstruction vs. generation dilemma），提出 semantic regularization 对齐预训练视觉编码器特征以约束 latent space 复杂度，配合 1D tokenizer、decoder 优先扩展和 entropy loss 实现稳定的亿级参数扩展。

## 📖 摘要

Video tokenizers are essential for latent video diffusion models, converting raw video data into spatiotemporally compressed latent spaces for efficient training. However, extending state-of-the-art video tokenizers to achieve a temporal compression ratio beyond 4× without increasing channel capacity poses significant challenges.
In this work, we propose an alternative approach to enhance temporal compression. We find that the reconstruction quality of temporally subsampled videos from a low-compression encoder surpasses that of high-compression encoders applied to original videos. This indicates that high-compression models can leverage representations from lower-compression models.
Building on this insight, we develop a bootstrapped high-temporal-compression model that progressively trains high-compression blocks atop well-trained lower-compression models. Our method includes a cross-level feature-mixing module to retain information from the pretrained low-compression model and guide higher-compression blocks to capture the remaining details from the full video sequence.
Evaluation of video benchmarks shows that our method significantly improves reconstruction quality while increasing temporal compression compared to
directly training the full model. Furthermore, the resulting compact latent space effectively trains a video diffusion model for high-quality video generation with a significantly reduced token budget.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-04-11 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2504.08736) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[VQGAN]], [[ViT-VQGAN]]
**对比基线：** [[VQGAN]], [[ViT-VQGAN]], [[FSQ]]
**同方向：** [[FQGAN]], [[UniTok]], [[VQGAN-100k]]

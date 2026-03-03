---
title: "Gigatok"
arxiv_id: "2501.05442"
arxiv_url: "https://arxiv.org/abs/2501.05442"
authors:
  - ""
published: "unknown"
categories:
  - ""
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
---

# Gigatok

## 📌 核心贡献

> （待补充）

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
| 发表 | unknown |
| 分类 |  |
| 链接 | [arXiv](https://arxiv.org/abs/2501.05442) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

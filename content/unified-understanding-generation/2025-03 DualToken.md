---
arxiv_id: "2503.14324"
arxiv_url: "https://arxiv.org/abs/2503.14324"
authors:
  - "Wei Song"
  - "Yuran Wang"
  - "Zijia Song"
  - "Yadong Li"
  - "Haoze Sun"
  - "Weipeng Chen"
published: "2025-03-18"
categories:
  - "cs.CV"
  - "cs.CL"
tags:
  - paper
  - computer-vision
  - nlp
  - multimodal
added: "2026-03-05"
rating: ""
---

# DualToken: Towards Unifying Visual Understanding and Generation with Dual Visual Vocabularies

## 📌 核心贡献

>

## 📖 摘要

The differing representation spaces required for visual understanding and generation pose a challenge in unifying them within the autoregressive paradigm of large language models. A vision tokenizer trained for reconstruction excels at capturing low-level perceptual details, making it well-suited for visual generation but lacking high-level semantic representations for understanding tasks. Conversely, a vision encoder trained via contrastive learning aligns well with language but struggles to decode back into the pixel space for generation tasks. To bridge this gap, we propose DualToken, a method that unifies representations for both understanding and generation within a single tokenizer. However, directly integrating reconstruction and semantic objectives in a single tokenizer creates conflicts, leading to degraded performance in both reconstruction quality and semantic performance. Instead of forcing a single codebook to handle both semantic and perceptual information, DualToken disentangles them by introducing separate codebooks for high and low-level features, effectively transforming their inherent conflict into a synergistic relationship. As a result, DualToken achieves state-of-the-art performance in both reconstruction and semantic tasks while demonstrating remarkable effectiveness in downstream MLLM understanding and generation tasks. Notably, we also show that DualToken, as a unified tokenizer, surpasses the naive combination of two distinct types vision encoders, providing superior performance within a unified MLLM.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2025-03-18 |
| 分类 | cs.CV, cs.CL |
| 链接 | [arXiv](https://arxiv.org/abs/2503.14324) |

## 📝 我的笔记

## 🔗 相关论文


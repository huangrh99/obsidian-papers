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
  - huawei
added: "2026-03-05"
rating: ""
institution: "Huawei Noah's Ark Lab"
---

# DualToken: Towards Unifying Visual Understanding and Generation with Dual Visual Vocabularies

## 📌 核心贡献

> DualToken提出了一种方法，通过使用双视觉词汇表来统一视觉理解和生成。该方法旨在弥合视觉理解和生成所需的表示空间差异，通过为生成任务训练擅长捕捉低级细节的视觉分词器，并为理解任务训练与语言对齐的视觉编码器，从而在统一自回归LLM框架中实现视觉理解和生成的融合。

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

[[DualToken]]
[[VQGAN]]
[[VQ-VAE]]
[[CLIP]]
[[LDM]]

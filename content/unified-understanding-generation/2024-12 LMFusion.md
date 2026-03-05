---
arxiv_id: "2412.15188"
arxiv_url: "https://arxiv.org/abs/2412.15188"
authors:
  - "Weijia Shi"
  - "Xiaochuang Han"
  - "Chunting Zhou"
  - "Weixin Liang"
  - "Xi Victoria Lin"
  - "Luke Zettlemoyer"
published: "2024-12-19"
categories:
  - "cs.CL"
  - "cs.AI"
tags:
  - paper
  - nlp
  - computer-vision
  - machine-learning
  - multimodal
added: "2026-03-05"
rating: ""
---

# LMFusion: Adapting Pretrained Language Models for Multimodal Generation

## 📌 核心贡献

>

## 📖 摘要

We present LMFusion, a framework for empowering pretrained text-only large language models (LLMs) with multimodal generative capabilities, enabling them to understand and generate both text and images in arbitrary sequences. LMFusion leverages existing Llama-3's weights for processing texts autoregressively while introducing additional and parallel transformer modules for processing images with diffusion. During training, the data from each modality is routed to its dedicated modules: modality-specific feedforward layers, query-key-value projections, and normalization layers process each modality independently, while the shared self-attention layers allow interactions across text and image features. By freezing the text-specific modules and only training the image-specific modules, LMFusion preserves the language capabilities of text-only LLMs while developing strong visual understanding and generation abilities. Compared to methods that pretrain multimodal generative models from scratch, our experiments demonstrate that, LMFusion improves image understanding by 20% and image generation by 3.6% using only 50% of the FLOPs while maintaining Llama-3's language capabilities. We also demonstrate that this framework can adapt existing vision-language models with multimodal generation ability. Overall, this framework not only leverages existing computational investments in text-only LLMs but also enables the parallel development of language and vision capabilities, presenting a promising direction for efficient multimodal model development.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2024-12-19 |
| 分类 | cs.CL, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2412.15188) |

## 📝 我的笔记

## 🔗 相关论文


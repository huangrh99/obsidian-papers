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
  - meta
added: "2026-03-05"
rating: ""
institution: "Meta AI"
---

# LMFusion: Adapting Pretrained Language Models for Multimodal Generation

## 📌 核心贡献

> LMFusion是一个旨在赋予预训练纯文本大语言模型（LLM）多模态生成能力的框架，使其能够理解和生成任意序列的文本和图像。该方法利用现有Llama-3的权重进行自回归文本处理，并引入额外的并行Transformer模块通过扩散处理图像，实现模态特定模块处理各自数据。

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

[[LMFusion]]
[[LDM]]
[[DiT]]
[[DDPM]]
[[Emu]]

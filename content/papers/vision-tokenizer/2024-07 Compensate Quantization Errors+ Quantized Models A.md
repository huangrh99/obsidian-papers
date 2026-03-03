---
title: "Compensate Quantization Errors+: Quantized Models Are Inquisitive Learners"
arxiv_id: "2407.15508"
arxiv_url: "https://arxiv.org/abs/2407.15508"
authors:
  - "Yifei Gao"
  - "Jie Ou"
  - "Lei Wang"
  - "Jun Cheng"
  - "Mengchu Zhou"
published: "2024-07-22"
categories:
  - "cs.CL"
  - "cs.AI"
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
---

# LFQ Look-up free Quantization

## 📌 核心贡献

> 大语言模型的量化部署常因忽略量化过程中权重的调整而导致精度不佳。该文创新性地提出补偿量化误差的方法，使量化模型能像“求知型学习者”一样自适应，有效提升了模型性能。

## 📖 摘要

The quantization of large language models (LLMs) has been a prominent research area aimed at enabling their lightweight deployment in practice. Existing research about LLM's quantization has mainly explored the interplay between weights and activations, or employing auxiliary components while neglecting the necessity of adjusting weights during quantization. Consequently, original weight distributions frequently fail to yield desired results after round-to-nearest (RTN) quantization. Even though incorporating techniques such as mixed precision and low-rank error approximation in LLM's quantization can yield improved results, they inevitably introduce additional computational overhead. On the other hand, traditional techniques for weight quantization, such as Generative Post-Training Quantization, rely on manually tweaking weight distributions to minimize local errors, but they fall short of achieving globally optimal outcomes. Although the recently proposed Learnable Singular-value Increment improves global weight quantization by modifying weight distributions, it disrupts the original distribution considerably. This introduces pronounced bias toward the training data and can degrade downstream task performance. In this paper, we introduce Singular-value Diagonal Expansion, a more nuanced approach to refining weight distributions to achieve better quantization alignment. Furthermore, we introduce Cross-layer Learning that improves overall quantization outcomes by distributing errors more evenly across layers. Our plug-and-play weight-quantization methods demonstrate substantial performance improvements over state-of-the-art approaches, including OmniQuant, DuQuant, and PrefixQuant.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2024-07-22 |
| 分类 | cs.CL, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2407.15508) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

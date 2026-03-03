---
title: "Our: A New Family of Image Generation Models with Next-Token Prediction"
arxiv_id: "2406.06525"
arxiv_url: "https://arxiv.org/abs/2406.06525"
authors:
  - ""
published: "2024-06"
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

# llamagen

## 📌 核心贡献

> 该论文引入了一种名为“Our”的图像生成模型新范式，将大语言模型的“下一词元预测”机制应用于视觉生成。研究表明，通过适当的扩展，即使没有视觉归纳偏置的自回归模型也能实现最先进的图像生成性能。主要贡献包括高效的图像分词器设计，以及在ImageNet基准上优于主流扩散模型的类别条件图像生成模型，并实现了推理速度的显著提升。

## 📖 摘要

We introduce \our, a new family of image generation models that apply original ``next-token prediction'' paradigm of large language models to visual generation domain. It is an affirmative answer to whether vanilla autoregressive models, e.g., Llama, without inductive biases on visual signals can achieve state-of-the-art image generation performance if scaling properly. We reexamine design spaces of image tokenizers, scalability properties of image generation models, and their training data quality. The outcome of this exploration consists of: (1) An image tokenizer with downsample ratio of 16, reconstruction quality of 0.94 rFID and codebook usage of 97\% on ImageNet benchmark. (2) A series of class-conditional image generation models ranging from 111M to 3.1B parameters, achieving 2.18 FID on ImageNet 256×256 benchmarks, outperforming the popular diffusion models such as LDM, DiT. (3) A text-conditional image generation model with 775M parameters, from two-stage training on LAION-COCO and high aesthetics quality images, demonstrating competitive performance of visual quality and text alignment. (4) We verify the effectiveness of LLM serving frameworks in optimizing the inference speed of image generation models and achieve 326\% - 414\% speedup. We release all models and codes to facilitate open-source community of visual generation and multimodal foundation models.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2024-06 |
| 分类 |  |
| 链接 | [arXiv](https://arxiv.org/abs/2406.06525) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

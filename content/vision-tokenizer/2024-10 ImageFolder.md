---
arxiv_id: "2410.01756"
arxiv_url: "https://arxiv.org/abs/2410.01756"
authors:
  - "Xiang Li"
  - "Kai Qiu"
  - "Hao Chen"
  - "Jason Kuen"
  - "Jiuxiang Gu"
  - "Bhiksha Raj"
published: "2024-10-02"
categories:
  - "cs.CV"
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
aliases:
  - "ImageFolder"
extends:
  - "[[VQGAN]]"
baseline:
  - "[[VQGAN]]"
  - "[[LlamaGen]]"
related_topic:
  - "[[LlamaGen]]"
  - "[[Infinity]]"
  - "[[VQGAN-100k]]"
---

# ImageFolder

## 📌 核心贡献

> 这篇论文提出了一种基于折叠令牌（Folded Tokens）的自回归图像生成方法。其创新点在于灵活地解决了图像标记器中令牌长度对重建和生成质量的权衡问题，旨在优化视觉生成模型的性能。

## 📖 摘要

Image tokenizers are crucial for visual generative models, e.g., diffusion models (DMs) and autoregressive (AR) models, as they construct the latent representation for modeling. Increasing token length is a common approach to improve the image reconstruction quality. However, tokenizers with longer token lengths are not guaranteed to achieve better generation quality. There exists a trade-off between reconstruction and generation quality regarding token length. In this paper, we investigate the impact of token length on both image reconstruction and generation and provide a flexible solution to the tradeoff. We propose ImageFolder, a semantic tokenizer that provides spatially aligned image tokens that can be folded during autoregressive modeling to improve both generation efficiency and quality. To enhance the representative capability without increasing token length, we leverage dual-branch product quantization to capture different contexts of images. Specifically, semantic regularization is introduced in one branch to encourage compacted semantic information while another branch is designed to capture the remaining pixel-level details. Extensive experiments demonstrate the superior quality of image generation and shorter token length with ImageFolder tokenizer.



## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2024-10-02 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2410.01756) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[VQGAN]]
**对比基线：** [[VQGAN]], [[LlamaGen]]
**同方向：** [[LlamaGen]], [[Infinity]], [[VQGAN-100k]]

---
title: "MaskGIT: Masked Generative Image Transformer"
arxiv_id: "2202.04200"
arxiv_url: "https://arxiv.org/abs/2202.04200"
authors:
  - "Huiwen Chang"
  - "Han Zhang"
  - "Lu Jiang"
  - "Ce Liu"
  - "William T. Freeman"
published: "2022-02-08"
categories:
  - "cs.CV"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: ""
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
---

# MaskGIT: Masked Generative Image Transformer

## 📌 核心贡献

> MaskGIT提出了一种新颖的图像生成范式，采用双向Transformer解码器，通过预测随机遮蔽的图像tokens来学习。在推理时，模型能够并行生成所有图像tokens，并进行迭代优化，从而打破了传统顺序生成图像的低效性。

## 📖 摘要

Generative transformers have experienced rapid popularity growth in the computer vision community in synthesizing high-fidelity and high-resolution images. The best generative transformer models so far, however, still treat an image naively as a sequence of tokens, and decode an image sequentially following the raster scan ordering (i.e. line-by-line). We find this strategy neither optimal nor efficient. This paper proposes a novel image synthesis paradigm using a bidirectional transformer decoder, which we term MaskGIT. During training, MaskGIT learns to predict randomly masked tokens by attending to tokens in all directions. At inference time, the model begins with generating all tokens of an image simultaneously, and then refines the image iteratively conditioned on the previous generation. Our experiments demonstrate that MaskGIT significantly outperforms the state-of-the-art transformer model on the ImageNet dataset, and accelerates autoregressive decoding by up to 64x. Besides, we illustrate that MaskGIT can be easily extended to various image editing tasks, such as inpainting, extrapolation, and image manipulation.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2022-02-08 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2202.04200) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

---
title: "FQGAN"
arxiv_id: "2202.04200"
arxiv_url: "https://arxiv.org/abs/2202.04200"
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

# FQGAN

## 📌 核心贡献

> （待补充）

## 📖 摘要

Generative transformers have experienced rapid popularity growth in the computer vision community in synthesizing high-fidelity and high-resolution images. The best generative transformer models so far, however, still treat an image naively as a sequence of tokens, and decode an image sequentially following the raster scan ordering (i.e. line-by-line). We find this strategy neither optimal nor efficient. This paper proposes a novel image synthesis paradigm using a bidirectional transformer decoder, which we term MaskGIT. During training, MaskGIT learns to predict randomly masked tokens by attending to tokens in all directions. At inference time, the model begins with generating all tokens of an image simultaneously, and then refines the image iteratively conditioned on the previous generation. Our experiments demonstrate that MaskGIT significantly outperforms the state-of-the-art transformer model on the ImageNet dataset, and accelerates autoregressive decoding by up to 64x. Besides, we illustrate that MaskGIT can be easily extended to various image editing tasks, such as inpainting, extrapolation, and image manipulation.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | unknown |
| 分类 |  |
| 链接 | [arXiv](https://arxiv.org/abs/2202.04200) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

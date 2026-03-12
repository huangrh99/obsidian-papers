---
arxiv_id: "2603.09408"
arxiv_url: "https://arxiv.org/abs/2603.09408"
authors:
  - "Taesung Kwon"
  - "Lorenzo Bianchi"
  - "Lennart Wittke"
  - "Felix Watine"
  - "Fabio Carrara"
published: "2026-03-10"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.LG"
tags:
  - paper
  - computer-vision
  - ai
  - machine-learning
added: "2026-03-12"
rating: ""
institution: ""
---

# Reviving ConvNeXt for Efficient Convolutional Diffusion Models

## 📌 核心贡献

> Recent diffusion models increasingly favor Transformer backbones, motivated by the remarkable scalability of fully attentional architectures. Yet the locality bias, parameter efficiency, and hardware friendliness--the attributes that established ConvNets as the efficient vision backbone--have seen limited exploration in modern generative modeling.

## 📖 摘要

Recent diffusion models increasingly favor Transformer backbones, motivated by the remarkable scalability of fully attentional architectures. Yet the locality bias, parameter efficiency, and hardware friendliness--the attributes that established ConvNets as the efficient vision backbone--have seen limited exploration in modern generative modeling. Here we introduce the fully convolutional diffusion model (FCDM), a model having a backbone similar to ConvNeXt, but designed for conditional diffusion modeling. We find that using only 50% of the FLOPs of DiT-XL/2, FCDM-XL achieves competitive performance with 7$\times$ and 7.5$\times$ fewer training steps at 256$\times$256 and 512$\times$512 resolutions, respectively. Remarkably, FCDM-XL can be trained on a 4-GPU system, highlighting the exceptional training efficiency of our architecture. Our results demonstrate that modern convolutional designs provide a competitive and highly efficient alternative for scaling diffusion models, reviving ConvNeXt as a simple yet powerful building block for efficient generative modeling.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-10 |
| 机构 |  |
| 分类 | cs.CV, cs.AI, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2603.09408) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

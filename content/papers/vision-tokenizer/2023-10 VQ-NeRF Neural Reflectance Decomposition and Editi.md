---
title: "VQ-NeRF: Neural Reflectance Decomposition and Editing with Vector Quantization"
arxiv_id: "2310.11864"
arxiv_url: "https://arxiv.org/abs/2310.11864"
authors:
  - "Hongliang Zhong"
  - "Jingbo Zhang"
  - "Jing Liao"
published: "2023-10-18"
categories:
  - "cs.CV"
  - "cs.GR"
  - "cs.LG"
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
---

# LG-VQ

## 📌 核心贡献

> VQ-NeRF提出了一种双分支神经网络模型，通过引入矢量量化（VQ）来分解和编辑三维场景中的反射场。它创新性地解决了传统神经反射场连续表示导致的材质分解噪声大、编辑复杂的问题，实现了离散化的材质表示，从而提高了分解质量和编辑效率。

## 📖 摘要

We propose VQ-NeRF, a two-branch neural network model that incorporates Vector Quantization (VQ) to decompose and edit reflectance fields in 3D scenes. Conventional neural reflectance fields use only continuous representations to model 3D scenes, despite the fact that objects are typically composed of discrete materials in reality. This lack of discretization can result in noisy material decomposition and complicated material editing. To address these limitations, our model consists of a continuous branch and a discrete branch. The continuous branch follows the conventional pipeline to predict decomposed materials, while the discrete branch uses the VQ mechanism to quantize continuous materials into individual ones. By discretizing the materials, our model can reduce noise in the decomposition process and generate a segmentation map of discrete materials. Specific materials can be easily selected for further editing by clicking on the corresponding area of the segmentation outcomes. Additionally, we propose a dropout-based VQ codeword ranking strategy to predict the number of materials in a scene, which reduces redundancy in the material segmentation process. To improve usability, we also develop an interactive interface to further assist material editing. We evaluate our model on both computer-generated and real-world scenes, demonstrating its superior performance. To the best of our knowledge, our model is the first to enable discrete material editing in 3D scenes.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2023-10-18 |
| 分类 | cs.CV, cs.GR, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2310.11864) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

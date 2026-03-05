---
arxiv_id: "2503.20853"
arxiv_url: "https://arxiv.org/abs/2503.20853"
authors:
  - "Alexander Swerdlow"
  - "Mihir Prabhudesai"
  - "Siddharth Gandhi"
  - "Deepak Pathak"
  - "Katerina Fragkiadaki"
published: "2025-03-26"
categories:
  - "cs.CV"
  - "cs.AI"
tags:
  - paper
  - computer-vision
  - machine-learning
  - multimodal
  - berkeley
added: "2026-03-05"
rating: ""
institution: "UC San Diego"
---

# Unified Multimodal Discrete Diffusion

## 📌 核心贡献

> 该研究探索了离散扩散模型作为联合文本和图像领域统一生成框架的潜力，以克服自回归模型在处理多模态数据时推理速度慢的缺点。它利用了离散扩散模型在文本生成方面的成功，旨在为多模态理解和生成提供一种统一且高效的解决方案。

## 📖 摘要

Multimodal generative models that can understand and generate across multiple modalities are dominated by autoregressive (AR) approaches, which process tokens sequentially from left to right, or top to bottom. These models jointly handle images, text, video, and audio for various tasks such as image captioning, question answering, and image generation. In this work, we explore discrete diffusion models as a unified generative formulation in the joint text and image domain, building upon their recent success in text generation. Discrete diffusion models offer several advantages over AR models, including improved control over quality versus diversity of generated samples, the ability to perform joint multimodal inpainting (across both text and image domains), and greater controllability in generation through guidance. Leveraging these benefits, we present the first Unified Multimodal Discrete Diffusion (UniDisc) model which is capable of jointly understanding and generating text and images for a variety of downstream tasks. We compare UniDisc to multimodal AR models, performing a scaling analysis and demonstrating that UniDisc outperforms them in terms of both performance and inference-time compute, enhanced controllability, editability, inpainting, and flexible trade-off between inference time and generation quality. Code and additional visualizations are available at https://unidisc.github.io.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2025-03-26 |
| 分类 | cs.CV, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2503.20853) |

## 📝 我的笔记

## 🔗 相关论文

[[UniDisc]]
[[DiT]]
[[LDM]]
[[DDPM]]
[[Emu]]

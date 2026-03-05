---
arxiv_id: "2310.03739"
arxiv_url: "https://arxiv.org/abs/2310.03739"
authors:
  - "Mihir Prabhudesai"
  - "Anirudh Goyal"
  - "Deepak Pathak"
  - "Katerina Fragkiadaki"
published: "2023-10-05"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.LG"
  - "cs.RO"
tags:
  - paper
  - image-generation-posttrain
  - cmu
institution: "Carnegie Mellon University"
notion_topic: "图像生成后训练"
added: "2026-03-04"
rating: ""
aliases:
  - "AlignProp"
extends:
  - "[[2023-09 ReFL]]"
related_topic:
  - "[[2023-05 DDPO]]"
  - "[[2023-05 DPOK]]"
---

# AlignProp

## 📌 核心贡献

> 采用端到端奖励梯度反向传播直接优化扩散模型，通过结合LoRA和梯度检查点技术解决了长链条采样中的显存瓶颈。相比强化学习算法，AlignProp在更少的训练步数下即可获得更高的奖励分增益，显著提升了训练效率。

## 📖 摘要

Text-to-image diffusion models have recently emerged at the forefront of image generation, powered by very large-scale unsupervised or weakly supervised text-to-image training datasets. Due to their unsupervised training, controlling their behavior in downstream tasks, such as maximizing human-perceived image quality, image-text alignment, or ethical image generation, is difficult. Recent works finetune diffusion models to downstream reward functions using vanilla reinforcement learning, notorious for the high variance of the gradient estimators. In this paper, we propose AlignProp, a method that aligns diffusion models to downstream reward functions using end-to-end backpropagation of the reward gradient through the denoising process. While naive implementation of such backpropagation would require prohibitive memory resources for storing the partial derivatives of modern text-to-image models, AlignProp finetunes low-rank adapter weight modules and uses gradient checkpointing, to render its memory usage viable. We test AlignProp in finetuning diffusion models to various objectives, such as image-text semantic alignment, aesthetics, compressibility and controllability of the number of objects present, as well as their combinations. We show AlignProp achieves higher rewards in fewer training steps than alternatives, while being conceptually simpler, making it a straightforward choice for optimizing diffusion models for differentiable reward functions of interest.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Carnegie Mellon University |
| 发表 | 2023-10-05 |
| 分类 | cs.CV, cs.AI, cs.LG, cs.RO |
| 链接 | [arXiv](https://arxiv.org/abs/2310.03739) |

## 📝 我的笔记

该论文被后续工作 arXiv:2407.08737 所取代。使用 LoRA + gradient checkpointing 控制显存。

## 🔗 相关论文

**基于/改进自：** [[2023-09 ReFL]]

**同方向：** [[2023-05 DDPO]], [[2023-05 DPOK]]

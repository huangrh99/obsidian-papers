---
arxiv_id: "2110.04627"
arxiv_url: "https://arxiv.org/abs/2110.04627"
authors:
  - "Jiahui Yu"
  - "Xin Li"
  - "Jing Yu Koh"
  - "Han Zhang"
  - "Ruoming Pang"
  - "James Qin"
  - "Alexander Ku"
  - "Yuanzhong Xu"
  - "Jason Baldridge"
  - "Yonghui Wu"
published: "2021-10-09"
categories:
  - "cs.CV"
  - "cs.LG"
tags:
  - paper
  - vision-tokenizer
institution: "Google"
notion_topic: "视觉编码器/词表"
added: "2026-03-04"
rating: ""
extends:
  - "[[VQGAN]]"
  - "[[VQ-VAE]]"
baseline:
  - "[[VQGAN]]"
  - "[[VQ-VAE-2]]"
related_topic:
  - "[[BEiT]]"
  - "[[FSQ]]"
  - "[[GigaTok]]"
---

# ViT-VQGAN

## 📌 核心贡献

> 将 VQGAN 的 CNN 骨干替换为 Vision Transformer，并改进码本学习方式，显著提升量化效率和重建质量。在 ImageNet 256×256 上 IS=175.1、FID=4.17，远超原始 VQGAN，并验证了离散自回归预训练用于无监督表征学习的潜力。

## 📖 摘要

Pretraining language models with next-token prediction on massive text corpora has delivered phenomenal zero-shot, few-shot, transfer learning and multi-tasking capabilities on both generative and discriminative language tasks. Motivated by this success, we explore a Vector-quantized Image Modeling (VIM) approach that involves pretraining a Transformer to predict rasterized image tokens autoregressively. The discrete image tokens are encoded from a learned Vision-Transformer-based VQGAN (ViT-VQGAN). We first propose multiple improvements over vanilla VQGAN from architecture to codebook learning, yielding better efficiency and reconstruction fidelity. The improved ViT-VQGAN further improves vector-quantized image modeling tasks, including unconditional, class-conditioned image generation and unsupervised representation learning. When trained on ImageNet at 256×256 resolution, we achieve Inception Score (IS) of 175.1 and Fréchet Inception Distance (FID) of 4.17, a dramatic improvement over the vanilla VQGAN, which obtains 70.6 and 17.04 for IS and FID, respectively. Based on ViT-VQGAN and unsupervised pretraining, we further evaluate the pretrained Transformer by averaging intermediate features, similar to Image GPT (iGPT). This ImageNet-pretrained VIM-L significantly beats iGPT-L on linear-probe accuracy from 60.3% to 73.2% for a similar model size. VIM-L also outperforms iGPT-XL which is trained with extra web image data and larger model size.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Google |
| 发表 | 2021-10-09 |
| 分类 | cs.CV, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2110.04627) |

## 📝 我的笔记

ICLR 2022 accepted.

## 🔗 相关论文

**基于/改进自：** [[VQGAN]], [[VQ-VAE]]
**对比基线：** [[VQGAN]], [[VQ-VAE-2]]
**同方向：** [[BEiT]], [[FSQ]], [[GigaTok]]

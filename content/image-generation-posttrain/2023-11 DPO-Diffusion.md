---
arxiv_id: "2311.12908"
arxiv_url: "https://arxiv.org/abs/2311.12908"
authors:
  - "Bram Wallace"
  - "Meihua Dang"
  - "Rafael Rafailov"
  - "Linqi Zhou"
  - "Aaron Lou"
  - "Senthil Purushwalkam"
  - "Stefano Ermon"
  - "Caiming Xiong"
  - "Shafiq Joty"
  - "Nikhil Naik"
published: "2023-11-21"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.GR"
  - "cs.LG"
tags:
  - paper
  - image-generation-posttrain
  - stanford
  - salesforce
institution: "Salesforce Research / Stanford University"
notion_topic: "图像生成后训练"
added: "2026-03-04"
rating: ""
extends: []
related_topic:
  - "[[2023-04 RAFT]]"
  - "[[2023-05 DDPO]]"
---

# DPO-Diffusion

## 📌 核心贡献

> 成功将大语言模型的DPO（直接偏好优化）算法迁移至扩散模型，重新推导了基于证据下界（ELBO）的可微对齐目标。该方法无需训练显式的奖励模型，直接利用偏好数据微调即可在视觉效果和提示词对齐上实现跨越式提升。

## 📖 摘要

Large language models (LLMs) are fine-tuned using human comparison data with Reinforcement Learning from Human Feedback (RLHF) methods to make them better aligned with users' preferences. In contrast to LLMs, human preference learning has not been widely explored in text-to-image diffusion models; the best existing approach is to fine-tune a pretrained model using carefully curated high quality images and captions to improve visual appeal and text alignment. We propose Diffusion-DPO, a method to align diffusion models to human preferences by directly optimizing on human comparison data. Diffusion-DPO is adapted from the recently developed Direct Preference Optimization (DPO), a simpler alternative to RLHF which directly optimizes a policy that best satisfies human preferences under a classification objective. We re-formulate DPO to account for a diffusion model notion of likelihood, utilizing the evidence lower bound to derive a differentiable objective. Using the Pick-a-Pic dataset of 851K crowdsourced pairwise preferences, we fine-tune the base model of the state-of-the-art Stable Diffusion XL (SDXL)-1.0 model with Diffusion-DPO. Our fine-tuned base model significantly outperforms both base SDXL-1.0 and the larger SDXL-1.0 model consisting of an additional refinement model in human evaluation, improving visual appeal and prompt alignment. We also develop a variant that uses AI feedback and has comparable performance to training on human preferences, opening the door for scaling of diffusion model alignment methods.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Salesforce Research / Stanford University |
| 发表 | 2023-11-21 |
| 分类 | cs.CV, cs.AI, cs.GR, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2311.12908) |

## 📝 我的笔记

使用 Pick-a-Pic 的 851k 配对偏好数据微调 SDXL-1.0 基础模型。核心：将 DPO loss 适配到扩散模型的 ELBO 框架。

## 🔗 相关论文

**基于/改进自：** —

**同方向（DPO思路用于diffusion）：** [[2023-04 RAFT]], [[2023-05 DDPO]]

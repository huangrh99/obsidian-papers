---
arxiv_id: "2412.09604"
arxiv_url: "https://arxiv.org/abs/2412.09604"
authors:
  - "Hao Li"
  - "Changyao Tian"
  - "Jie Shao"
  - "Xizhou Zhu"
  - "Zhaokai Wang"
  - "Jinguo Zhu"
published: "2024-12-12"
categories:
  - "cs.CV"
tags:
  - paper
  - computer-vision
  - multimodal
  - alibaba
added: "2026-03-05"
rating: ""
aliases:
  - "SynerGen-VL"
institution: "Alibaba"
---

# SynerGen-VL: Towards Synergistic Image Understanding and Generation with Vision Experts and Token Folding

## 📌 核心贡献

> SynerGen-VL提出了一个简单而强大的无编码器多模态大语言模型（MLLM），能够同时进行图像理解和生成。该方法通过整合视觉专家和令牌折叠技术，旨在解决现有统一MLLM在模型架构或训练流程中涉及复杂设计的问题，从而简化模型训练和扩展的难度。

## 📖 摘要

The remarkable success of Large Language Models (LLMs) has extended to the multimodal domain, achieving outstanding performance in image understanding and generation. Recent efforts to develop unified Multimodal Large Language Models (MLLMs) that integrate these capabilities have shown promising results. However, existing approaches often involve complex designs in model architecture or training pipeline, increasing the difficulty of model training and scaling. In this paper, we propose SynerGen-VL, a simple yet powerful encoder-free MLLM capable of both image understanding and generation. To address challenges identified in existing encoder-free unified MLLMs, we introduce the token folding mechanism and the vision-expert-based progressive alignment pretraining strategy, which effectively support high-resolution image understanding while reducing training complexity. After being trained on large-scale mixed image-text data with a unified next-token prediction objective, SynerGen-VL achieves or surpasses the performance of existing encoder-free unified MLLMs with comparable or smaller parameter sizes, and narrows the gap with task-specific state-of-the-art models, highlighting a promising path toward future unified MLLMs. Our code and models shall be released.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2024-12-12 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2412.09604) |

## 📝 我的笔记

## 🔗 相关论文

[[SynerGen-VL]]
[[CLIP]]
[[LDM]]
[[DiT]]
[[Emu]]

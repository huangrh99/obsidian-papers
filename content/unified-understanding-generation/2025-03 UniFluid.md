---
title: "Unified Autoregressive Visual Generation and Understanding with Continuous Tokens"
arxiv_id: "2503.13436"
arxiv_url: "https://arxiv.org/abs/2503.13436"
authors:
  - "Lijie Fan"
  - "Luming Tang"
  - "Siyang Qin"
  - "Tianhong Li"
  - "Xuan Yang"
  - "Siyuan Qiao"
published: "2025-03-17"
categories:
  - "cs.CV"
  - "cs.LG"
tags:
  - paper
  - understanding-generation
  - multimodal
  - bytedance
institution: "ByteDance"
notion_topic: "理解生成统一"
added: "2026-03-04"
rating: ""
aliases:
  - "UniFluid"
extends:
  - "[[MAR]]"
related_topic:
  - "[[Transfusion]]"
  - "[[Chameleon]]"
---

# UniFluid

## 📌 核心贡献

> UniFluid提出了一个统一的自回归框架，通过连续视觉标记实现视觉生成与理解。其创新之处在于，该框架能够处理多模态图像和文本输入，为文本生成离散标记，为图像生成连续标记。研究发现，通过精心调整的训练配方，尽管生成与理解任务存在权衡，但两者能相互促进。

## 📖 摘要

We present UniFluid, a unified autoregressive framework for joint visual generation and understanding leveraging continuous visual tokens. Our unified autoregressive architecture processes multimodal image and text inputs, generating discrete tokens for text and continuous tokens for image. We find though there is an inherent trade-off between the image generation and understanding task, a carefully tuned training recipe enables them to improve each other. By selecting an appropriate loss balance weight, the unified model achieves results comparable to or exceeding those of single-task baselines on both tasks. Furthermore, we demonstrate that employing stronger pre-trained LLMs and random-order generation during training is important to achieve high-fidelity image generation within this unified framework. Built upon the Gemma model series, UniFluid exhibits competitive performance across both image generation and understanding, demonstrating strong transferability to various downstream tasks, including image editing for generation, as well as visual captioning and question answering for understanding.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-03-17 |
| 分类 | cs.CV, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2503.13436) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[MAR]]
**同方向：** [[Transfusion]], [[Chameleon]]
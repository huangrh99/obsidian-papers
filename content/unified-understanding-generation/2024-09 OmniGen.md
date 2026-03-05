---
arxiv_id: "2409.11340"
arxiv_url: "https://arxiv.org/abs/2409.11340"
authors:
  - "Shitao Xiao"
  - "Yueze Wang"
  - "Junjie Zhou"
  - "Huaying Yuan"
  - "Xingrun Xing"
  - "Ruiran Yan"
published: "2024-09-17"
categories:
  - "cs.CV"
  - "cs.AI"
tags:
  - paper
institution: "BAAI"
notion_topic: "理解生成统一"
added: "2026-03-04"
rating: ""
related_topic:
  - "[[SEED-LLaMA]]"
  - "[[Chameleon]]"
---

# OmniGen: Unified Image Generation

## 📌 核心贡献

> OmniGen是一个统一的扩散模型，旨在革新图像生成领域，解决此前缺乏单一框架处理多种任务的问题。其核心创新在于，不仅能进行文本到图像生成，还原生支持图像编辑、主体驱动生成等多种下游任务。这标志着图像生成领域向大型语言模型在语言生成中实现的统一范式迈进。

## 📖 摘要

The emergence of Large Language Models (LLMs) has unified language generation tasks and revolutionized human-machine interaction. However, in the realm of image generation, a unified model capable of handling various tasks within a single framework remains largely unexplored. In this work, we introduce OmniGen, a new diffusion model for unified image generation. OmniGen is characterized by the following features: 1) Unification: OmniGen not only demonstrates text-to-image generation capabilities but also inherently supports various downstream tasks, such as image editing, subject-driven generation, and visual-conditional generation. 2) Simplicity: The architecture of OmniGen is highly simplified, eliminating the need for additional plugins. Moreover, compared to existing diffusion models, it is more user-friendly and can complete complex tasks end-to-end through instructions without the need for extra intermediate steps, greatly simplifying the image generation workflow. 3) Knowledge Transfer: Benefit from learning in a unified format, OmniGen effectively transfers knowledge across different tasks, manages unseen tasks and domains, and exhibits novel capabilities. We also explore the model's reasoning capabilities and potential applications of the chain-of-thought mechanism. This work represents the first attempt at a general-purpose image generation model, and we will release our resources at https://github.com/VectorSpaceLab/OmniGen to foster future advancements.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | BAAI |
| 发表 | 2024-09-17 |
| 分类 | cs.CV, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2409.11340) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[SEED-LLaMA]], [[Chameleon]]
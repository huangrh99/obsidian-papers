---
arxiv_id: "2507.16746"
arxiv_url: "https://arxiv.org/abs/2507.16746"
authors:
  - "Ang Li"
  - "Charles Wang"
  - "Deqing Fu"
  - "Kaiyu Yue"
  - "Zikui Cai"
  - "Wang Bill Zhu"
published: "2025-07-22"
categories:
  - "cs.CV"
  - "cs.CL"
  - "cs.LG"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: ""
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
aliases:
  - "Zebra-CoT"
related_topic:
  - "[[Chameleon]]"
  - "[[MAR]]"
---

# Zebra-CoT

## 📌 核心贡献

> 这篇论文介绍了Zebra-CoT数据集，旨在解决多模态模型在视觉思维链（Visual CoT）中表现不佳和高质量训练数据匮乏的问题。该数据集包含182,384个交错的文本-图像推理样本，创新性地为模型学习像人类一样利用视觉辅助解决复杂问题提供了基础。

## 📖 摘要

Humans often use visual aids, for example diagrams or sketches, when solving complex problems. Training multimodal models to do the same, known as Visual Chain of Thought (Visual CoT), is challenging due to: (1) poor off-the-shelf visual CoT performance, which hinders reinforcement learning, and (2) the lack of high-quality visual CoT training data. We introduce $\textbf{Zebra-CoT}$, a diverse large-scale dataset with 182,384 samples, containing logically coherent interleaved text-image reasoning traces. We focus on four categories of tasks where sketching or visual reasoning is especially natural, spanning scientific questions such as geometry, physics, and algorithms; 2D visual reasoning tasks like visual search and jigsaw puzzles; 3D reasoning tasks including 3D multi-hop inference, embodied and robot planning; visual logic problems and strategic games like chess. Fine-tuning the Anole-7B model on the Zebra-CoT training corpus results in an improvement of +12% in our test-set accuracy and yields up to +13% performance gain on standard VLM benchmark evaluations. Fine-tuning Bagel-7B yields a model that generates high-quality interleaved visual reasoning chains, underscoring Zebra-CoT's effectiveness for developing multimodal reasoning abilities. We open-source our dataset and models to support development and evaluation of visual CoT.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-07-22 |
| 分类 | cs.CV, cs.CL, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2507.16746) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[Chameleon]], [[MAR]]
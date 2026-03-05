---
arxiv_id: "2506.18898"
arxiv_url: "https://arxiv.org/abs/2506.18898"
authors:
  - "Jiaming Han"
  - "Hao Chen"
  - "Yang Zhao"
  - "Hanyu Wang"
  - "Qi Zhao"
  - "Ziyan Yang"
published: "2025-06-23"
categories:
  - "cs.CV"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: ""
notion_topic: "理解生成统一"
added: "2026-03-04"
rating: ""
related_topic:
  - "[[UniFluid]]"
  - "[[Transfusion]]"
  - "[[TokenFlow]]"
---

# UniDialect

## 📌 核心贡献

> 本文提出了 UniDialect，针对Vision as a Dialect: Unifying Visual Und... 方向进行研究，提出了新颖的方法并在相关基准上取得了优异性能。

## 📖 摘要

This paper presents a multimodal framework that attempts to unify visual understanding and generation within a shared discrete semantic representation. At its core is the Text-Aligned Tokenizer (TA-Tok), which converts images into discrete tokens using a text-aligned codebook projected from a large language model's (LLM) vocabulary. By integrating vision and text into a unified space with an expanded vocabulary, our multimodal LLM, Tar, enables cross-modal input and output through a shared interface, without the need for modality-specific designs. Additionally, we propose scale-adaptive encoding and decoding to balance efficiency and visual detail, along with a generative de-tokenizer to produce high-fidelity visual outputs. To address diverse decoding needs, we utilize two complementary de-tokenizers: a fast autoregressive model and a diffusion-based model. To enhance modality fusion, we investigate advanced pre-training tasks, demonstrating improvements in both visual understanding and generation. Experiments across benchmarks show that Tar matches or surpasses existing multimodal LLM methods, achieving faster convergence and greater training efficiency. Code, models, and data are available at https://tar.csuhan.com

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-06-23 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2506.18898) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[UniFluid]], [[Transfusion]], [[TokenFlow]]
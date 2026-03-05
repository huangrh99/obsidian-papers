---
arxiv_id: "2509.16197"
arxiv_url: "https://arxiv.org/abs/2509.16197"
authors:
  - "Yanghao Li"
  - "Rui Qian"
  - "Bowen Pan"
  - "Haotian Zhang"
  - "Haoshuo Huang"
  - "Bowen Zhang"
published: "2025-09-19"
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
aliases:
  - "MANZANO"
related_topic:
  - "[[ILLUME]]"
  - "[[Chameleon]]"
  - "[[UniFluid]]"
---

# MANZANO

## 📌 核心贡献

> 本文提出了 MANZANO，针对MANZANO: A Simple and Scalable Unified M... 方向进行研究，提出了新颖的方法并在相关基准上取得了优异性能。

## 📖 摘要

Unified multimodal Large Language Models (LLMs) that can both understand and generate visual content hold immense potential. However, existing open-source models often suffer from a performance trade-off between these capabilities. We present Manzano, a simple and scalable unified framework that substantially reduces this tension by coupling a hybrid image tokenizer with a well-curated training recipe. A single shared vision encoder feeds two lightweight adapters that produce continuous embeddings for image-to-text understanding and discrete tokens for text-to-image generation within a common semantic space. A unified autoregressive LLM predicts high-level semantics in the form of text and image tokens, with an auxiliary diffusion decoder subsequently translating the image tokens into pixels. The architecture, together with a unified training recipe over understanding and generation data, enables scalable joint learning of both capabilities. Manzano achieves state-of-the-art results among unified models, and is competitive with specialist models, particularly on text-rich evaluation. Our studies show minimal task conflicts and consistent gains from scaling model size, validating our design choice of a hybrid tokenizer.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-09-19 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2509.16197) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[ILLUME]], [[Chameleon]], [[UniFluid]]
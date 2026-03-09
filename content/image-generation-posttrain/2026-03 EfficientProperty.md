---
arxiv_id: "2603.06397"
arxiv_url: "https://arxiv.org/abs/2603.06397"
authors:
  - "Pengcheng Jiang"
  - "Judith Yue Li"
  - "Moonkyung Ryu"
  - "R. Lily Hu"
  - "Kun Su"
published: "2026-03-06"
categories:
  - "cs.IR"
  - "cs.LG"
tags:
  - paper
  - machine-learning
added: "2026-03-10"
rating: ""
institution: "\thepa x University of Illinois Urbana Champaign"
---

# Efficient, Property-Aligned Fan-Out Retrieval via RL-Compiled Diffusion

## 📌 核心贡献

> 这论文针对传统搜索只给「最佳单个」结果的痛点，提出了「集合值检索」。核心是「Retrieve-for-Train (R4T)」框架：1. 先用强化学习（RL）训一个「泛出语言模型 (FOLM)」，让它学会咋高效地捞出一堆好结果；2. 再用这个FOLM生成一大堆高质量的合成数据；3. 最后拿这些数据来训练咱们最终的、又快又准的扩散检索模型。

## 📖 摘要

Many modern retrieval problems are set-valued: given a broad intent, the system must return a collection of results that optimizes higher-order properties   (e.g., diversity, coverage, complementarity, coherence) while remaining grounded with respect to a fixed database. Set-valued objectives are typically   non-decomposable and are not captured by existing supervised (query, content) datasets which only prioritize top-1 retrieval. Consequently, fan-out   retrieval is often employed to generate diverse subqueries to retrieve item sets. While reinforcement learning (RL) can optimize set-level objectives via   interaction, deploying an RL-tuned LLM for fan-out retrieval is prohibitively expensive at inference time. Conversely, diffusion-based generative   retrieval enables efficient single-pass fan-out in embedding space, but requires objective-aligned training targets. To address these issues, we propose   R4T (Retrieve-for-Train), which uses RL once as an objective transducer in a three-step process: (i) train a fan-out LLM with composite set-level rewards,   (ii) synthesize objective-consistent training pairs, and (iii) train a lightweight diffusion retriever to model the conditional distribution of set-valued   outputs. Across large-scale fashion and music benchmarks consisting of curated item sets, we show that R4T improves retrieval quality relative to strong   baselines while reducing query-time fan-out latency by an order of magnitude.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-06 |
| 机构 | \thepa x University of Illinois Urbana Champaign |
| 分类 | cs.IR, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2603.06397) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

---
title: "Byte Latent Transformer: Patches Scale Better Than Tokens"
arxiv_id: "unknown"
arxiv_url: "https://arxiv.org/abs/unknown"
authors:
  - "Artidoro Pagnoni"
  - "Ram Pasunuru"
  - "Pedro Rodriguez"
  - "John Nguyen"
  - "Benjamin Muller"
  - "Margaret Li"
published: "unknown"
categories:
  - "cs.CL"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: ""
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
---

# Infinity

## 📌 核心贡献

> 这篇论文提出了一种创新的字节级大语言模型架构——字节潜变量转换器（BLT）。其方法创新在于将字节编码为动态大小的“补丁”，并根据下一个字节的熵进行自适应分割，从而根据数据复杂性灵活分配计算资源。这种方式使BLT在达到与基于Token的模型同等性能的同时，显著提升了推理效率和鲁棒性。

## 📖 摘要

We introduce the Byte Latent Transformer (BLT), a new byte-level LLM architecture that, for the first time, matches tokenization-based LLM performance at scale with significant improvements in inference efficiency and robustness. BLT encodes bytes into dynamically sized patches, which serve as the primary units of computation. Patches are segmented based on the entropy of the next byte, allocating more compute and model capacity where increased data complexity demands it. We present the first FLOP controlled scaling study of byte-level models up to 8B parameters and 4T training bytes. Our results demonstrate the feasibility of scaling models trained on raw bytes without a fixed vocabulary. Both training and inference efficiency improve due to dynamically selecting long patches when data is predictable, along with qualitative improvements on reasoning and long tail generalization. Overall, for fixed inference costs, BLT shows significantly better scaling than tokenization-based models, by simultaneously growing both patch and model size.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2024-12-13 |
| 分类 | cs.CL |
| 链接 | [arXiv](https://arxiv.org/abs/2412.09871) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

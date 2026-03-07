---
arxiv_id: "2603.04736"
arxiv_url: "https://arxiv.org/abs/2603.04736"
authors:
  - "Nic Fishman"
  - "Gokul Gowri"
  - "Paolo L. B. Fischer"
  - "Marinka Zitnik"
  - "Omar Abudayyeh"
published: "2026-03-05"
categories:
  - "cs.LG"
tags:
  - paper
  - machine-learning
added: "2026-03-07"
rating: ""
institution: ""
---

# Distribution-Conditioned Transport

## 📌 核心贡献

> 就像是训练一个“快递员”，不光知道怎么把包裹（数据）从A地送到B地，还能举一反三，没见过的新路线也能快速送达。

## 📖 摘要

Learning a transport model that maps a source distribution to a target distribution is a canonical problem in machine learning, but scientific applications increasingly require models that can generalize to source and target distributions unseen during training. We introduce distribution-conditioned transport (DCT), a framework that conditions transport maps on learned embeddings of source and target distributions, enabling generalization to unseen distribution pairs. DCT also allows semi-supervised learning for distributional forecasting problems: because it learns from arbitrary distribution pairs, it can leverage distributions observed at only one condition to improve transport prediction. DCT is agnostic to the underlying transport mechanism, supporting models ranging from flow matching to distributional divergence-based models (e.g. Wasserstein, MMD). We demonstrate the practical performance benefits of DCT on synthetic benchmarks and four applications in biology: batch effect transfer in single-cell genomics, perturbation prediction from mass cytometry data, learning clonal transcriptional dynamics in hematopoiesis, and modeling T-cell receptor sequence evolution.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-05 |
| 机构 |  |
| 分类 | cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2603.04736) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

---
arxiv_id: "2603.03792"
arxiv_url: "https://arxiv.org/abs/2603.03792"
authors:
  - "Haowei Zhu"
  - "Tingxuan Huang"
  - "Xing Wang"
  - "Tianyu Zhao"
  - "Jiexi Wang"
published: "2026-03-04"
categories:
  - "cs.CV"
  - "cs.LG"
tags:
  - paper
  - computer-vision
  - machine-learning
added: "2026-03-06"
rating: ""
institution: ""
---

# TAP: A Token-Adaptive Predictor Framework for Training-Free Diffusion Acceleration

## 📌 核心贡献

> Diffusion models achieve strong generative performance but remain slow at inference due to the need for repeated full-model denoising passes. We present Token-Adaptive Predictor (TAP), a training-free, probe-driven framework that adaptively selects a predictor for each token at every sampling step.

## 📖 摘要

Diffusion models achieve strong generative performance but remain slow at inference due to the need for repeated full-model denoising passes. We present Token-Adaptive Predictor (TAP), a training-free, probe-driven framework that adaptively selects a predictor for each token at every sampling step. TAP uses a single full evaluation of the model's first layer as a low-cost probe to compute proxy losses for a compact family of candidate predictors (instantiated primarily with Taylor expansions of varying order and horizon), then assigns each token the predictor with the smallest proxy error. This per-token "probe-then-select" strategy exploits heterogeneous temporal dynamics, requires no additional training, and is compatible with various predictor designs. TAP incurs negligible overhead while enabling large speedups with little or no perceptual quality loss. Extensive experiments across multiple diffusion architectures and generation tasks show that TAP substantially improves the accuracy-efficiency frontier compared to fixed global predictors and caching-only baselines.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-04 |
| 机构 |  |
| 分类 | cs.CV, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2603.03792) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

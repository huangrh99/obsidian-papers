---
arxiv_id: "2603.05503"
arxiv_url: "https://arxiv.org/abs/2603.05503"
authors:
  - "Shai Yehezkel"
  - "Shahar Yadin"
  - "Noam Elata"
  - "Yaron Ostrovsky-Berman"
  - "Bahjat Kawar"
published: "2026-03-05"
categories:
  - "cs.CV"
tags:
  - paper
  - computer-vision
added: "2026-03-07"
rating: ""
institution: ""
---

# Accelerating Text-to-Video Generation with Calibrated Sparse Attention

## 📌 核心贡献

> 简单来说，就是文生视频模型里有很多“废话”计算——令牌（token）之间的互动，很多时候根本没用还重复。这篇论文就教我们怎么把这些“废话”找出来，然后直接跳过，让视频生成速度飙升。

## 📖 摘要

Recent diffusion models enable high-quality video generation, but suffer from slow runtimes. The large transformer-based backbones used in these models are bottlenecked by spatiotemporal attention. In this paper, we identify that a significant fraction of token-to-token connections consistently yield negligible scores across various inputs, and their patterns often repeat across queries. Thus, the attention computation in these cases can be skipped with little to no effect on the result. This observation continues to hold for connections among local token blocks. Motivated by this, we introduce CalibAtt, a training-free method that accelerates video generation via calibrated sparse attention. CalibAtt performs an offline calibration pass that identifies block-level sparsity and repetition patterns that are stable across inputs, and compiles these patterns into optimized attention operations for each layer, head, and diffusion timestep. At inference time, we compute the selected input-dependent connections densely, and skip the unselected ones in a hardware-efficient manner. Extensive experiments on Wan 2.1 14B, Mochi 1, and few-step distilled models at various resolutions show that CalibAtt achieves up to 1.58x end-to-end speedup, outperforming existing training-free methods while maintaining video generation quality and text-video alignment.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-05 |
| 机构 |  |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2603.05503) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

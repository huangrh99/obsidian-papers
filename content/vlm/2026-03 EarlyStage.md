---
arxiv_id: "2603.03681"
arxiv_url: "https://arxiv.org/abs/2603.03681"
authors:
  - "Yuhao Chen"
  - "Bin Shan"
  - "Xin Ye"
  - "Cheng Chen"
published: "2026-03-04"
categories:
  - "cs.CV"
  - "cs.AI"
tags:
  - paper
  - computer-vision
  - ai
added: "2026-03-06"
rating: ""
institution: ""
---

# EvoPrune: Early-Stage Visual Token Pruning for Efficient MLLMs

## 📌 核心贡献

> 你给大模型看一张高清图，视觉编码器（ViT）得先把图片切成几百甚至几千个小块处理，然后才传给语言模型——EvoPrune 要做的事，就是在编码器「处理图片的过程中」就把没用的小块早点踢走，不等到编码完再剪，相当于在流水线入口就减少了搬运量，而不是在出口堆了一大堆再挑。

## 📖 摘要

Multimodal Large Language Models (MLLMs) have shown strong performance in vision-language tasks, but their inference efficiency is severely limited by the exponential growth of visual tokens in complex scenarios such as high-resolution images and videos. Existing visual token pruning methods mainly operate after visual encoding, overlooking the substantial computational cost incurred during the encoding stage. To address this issue, we propose EvoPrune, an early-stage visual token pruning method for MLLMs that performs pruning directly during visual encoding. Specifically, EvoPrune employs a layer-wise pruning strategy guided by token similarity, diversity, and attention-based importance to retain the most informative visual tokens at selected encoding layers. Extensive experiments on image and video benchmarks validate the effectiveness of EvoPrune. In particular, on the VideoMME dataset, EvoPrune achieves 2$\times$ inference speedup with less than 1% performance degradation, demonstrating its potential for latency-sensitive MLLM deployment.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-04 |
| 机构 |  |
| 分类 | cs.CV, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2603.03681) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

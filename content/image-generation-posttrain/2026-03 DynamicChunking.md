---
arxiv_id: "2603.06351"
arxiv_url: "https://arxiv.org/abs/2603.06351"
authors:
  - "Akash Haridas"
  - "Utkarsh Saxena"
  - "Parsa Ashrafi Fashi"
  - "Mehdi Rezagholizadeh"
  - "Vikram Appia"
published: "2026-03-06"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.LG"
tags:
  - paper
  - computer-vision
  - ai
  - machine-learning
added: "2026-03-10"
rating: ""
institution: ""
---

# Dynamic Chunking Diffusion Transformer

## 📌 核心贡献

> 就像你读书时会跳过大段背景介绍，直接看重点内容，这篇论文让扩散模型（Diffusion Transformer，简称DiT）也能“看重点”，根据图片内容的复杂程度来分配计算资源。

## 📖 摘要

Diffusion Transformers process images as fixed-length sequences of tokens produced by a static $\textit{patchify}$ operation. While effective, this design spends uniform compute on low- and high-information regions alike, ignoring that images contain regions of varying detail and that the denoising process progresses from coarse structure at early timesteps to fine detail at late timesteps. We introduce the Dynamic Chunking Diffusion Transformer (DC-DiT), which augments the DiT backbone with a learned encoder-router-decoder scaffold that adaptively compresses the 2D input into a shorter token sequence in a data-dependent manner using a chunking mechanism learned end-to-end with diffusion training. The mechanism learns to compress uniform background regions into fewer tokens and detail-rich regions into more tokens, with meaningful visual segmentations emerging without explicit supervision. Furthermore, it also learns to adapt its compression across diffusion timesteps, using fewer tokens at noisy stages and more tokens as fine details emerge. On class-conditional ImageNet $256{\times}256$, DC-DiT consistently improves FID and Inception Score over both parameter-matched and FLOP-matched DiT baselines across $4{\times}$ and $16{\times}$ compression, showing this is a promising technique with potential further applications to pixel-space, video and 3D generation. Beyond accuracy, DC-DiT is practical: it can be upcycled from pretrained DiT checkpoints with minimal post-training compute (up to $8{\times}$ fewer training steps) and composes with other dynamic computation methods to further reduce generation FLOPs.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-06 |
| 机构 |  |
| 分类 | cs.CV, cs.AI, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2603.06351) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

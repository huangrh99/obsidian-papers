---
arxiv_id: "2409.16280"
arxiv_url: "https://arxiv.org/abs/2409.16280"
authors:
  - "Chuyang Zhao"
  - "Yuxing Song"
  - "Wenhao Wang"
  - "Haocheng Feng"
  - "Errui Ding"
  - "Yifan Sun"
published: "2024-09-24"
categories:
  - "cs.CV"
tags:
  - paper
  - computer-vision
  - multimodal
  - tsinghua
added: "2026-03-05"
rating: ""
institution: "Tsinghua University (THUDM)"
---

# MonoFormer: One Transformer for Both Diffusion and Autoregression

## 📌 核心贡献

> MonoFormer提出了一种新颖的思路：共享一个Transformer模型，同时支持自回归和扩散。该方法利用Transformer在视觉生成扩散模型中的成功应用，以及Transformer在自回归和扩散训练之间的相似性，旨在克服现有多模态方法为不同生成范式使用独立骨干网络的限制。

## 📖 摘要

Most existing multimodality methods use separate backbones for autoregression-based discrete text generation and diffusion-based continuous visual generation, or the same backbone by discretizing the visual data to use autoregression for both text and visual generation. In this paper, we propose to study a simple idea: share one transformer for both autoregression and diffusion. The feasibility comes from two main aspects: (i) Transformer is successfully applied to diffusion for visual generation, and (ii) transformer training for autoregression and diffusion is very similar, and the difference merely lies in that diffusion uses bidirectional attention mask and autoregression uses causal attention mask. Experimental results show that our approach achieves comparable image generation performance to current state-of-the-art methods as well as maintains the text generation capability. The project is publicly available at https://monoformer.github.io/.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2024-09-24 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2409.16280) |

## 📝 我的笔记

## 🔗 相关论文

[[MonoFormer]]
[[DiT]]
[[LDM]]
[[DDPM]]
[[Emu]]

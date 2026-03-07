---
arxiv_id: "2603.03482"
arxiv_url: "https://arxiv.org/abs/2603.03482"
authors:
  - "Samuel Garcin"
  - "Thomas Walker"
  - "Steven McDonagh"
  - "Tim Pearce"
  - "Hakan Bilen"
  - "Tianyu He"
  - "Kaixin Wang"
  - "Jiang Bian"
published: "2026-03-05"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.LG"
tags:
  - paper
  - world-model
  - 3d-generation
  - video-generation
  - diffusion
added: "2026-03-07"
rating: ""
aliases:
  - "PERSIST"
institution: "University of Edinburgh × Microsoft Research"
extends:
  - "[[DiT]]"
---

# Beyond Pixel Histories: World Models with Persistent 3D State

## 📌 核心贡献

> 提出 PERSIST，一种具有持久 3D 状态的世界模型新范式。与现有世界模型依赖隐式 3D 学习不同，PERSIST 显式维护一个潜在 3D 体素场景表示，将世界模拟解耦为环境演化、相机追踪和可微渲染三个耦合组件，实现了持久空间记忆、几何一致性和长时间稳定性，FVD 大幅优于 Oasis/WorldMem 等基线。

## 📖 摘要

Interactive world models continually generate video by responding to a user's actions, enabling open-ended generation capabilities. However, existing models typically lack a 3D representation of the environment, meaning 3D consistency must be implicitly learned from data, and spatial memory is restricted to limited temporal context windows. This results in an unrealistic user experience and presents significant obstacles to down-stream tasks such as training agents. To address this, we present PERSIST, a new paradigm of world model which simulates the evolution of a latent 3D scene: environment, camera, and renderer. This allows us to synthesize new frames with persistent spatial memory and consistent geometry. Both quantitative metrics and a qualitative user study show substantial improvements in spatial memory, 3D consistency, and long-horizon stability over existing methods, enabling coherent, evolving 3D worlds. We further demonstrate novel capabilities, including synthesising diverse 3D environments from a single image, as well as enabling fine-grained, geometry-aware control over generated experiences by supporting environment editing and specification directly in 3D space.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | University of Edinburgh × Microsoft Research |
| 发表 | 2026-03-05 |
| 分类 | cs.CV, cs.AI, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2603.03482) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[DiT]]

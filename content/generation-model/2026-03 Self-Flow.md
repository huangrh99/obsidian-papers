---
arxiv_id: "self-flow-bfl"
arxiv_url: "https://bfl.ai/research/self-flow"
authors:
  - "Hila Chefer"
  - "Patrick Esser"
  - "Dominik Lorenz"
  - "Dustin Podell"
  - "Vikash Raja"
  - "Vinh Tong"
published: "2026-03-04"
categories:
  - "cs.CV"
  - "cs.LG"
institution: "Black Forest Labs × MIT"
tags:
  - diffusion
  - computer-vision
  - machine-learning
  - paper
  - mit
  - bfl
added: "2026-03-05"
rating: ""
---

# Self-Supervised Flow Matching for Scalable Multi-Modal Synthesis

## 📌 核心贡献

> 提出 Self-Flow 自监督流匹配框架，通过双时间步调度（Dual-Timestep Scheduling）在生成训练中内建表征学习，无需外部 CLIP/DINO 等预训练模型，支持图像/视频/音频多模态，收敛速度比 REPA 快 2.8×。

## 📖 摘要

We introduce Self-Flow: a self-supervised flow matching paradigm that integrates representation learning within the generative framework. Our key mechanism, Dual-Timestep Scheduling, applies heterogeneous noise levels across tokens, creating an information asymmetry that forces the model to infer missing information from corrupted inputs. This drives learning strong representations alongside generative capabilities without external supervision. Our method generalizes across modalities and enables multi-modal training while following expected scaling laws, achieving superior image, video, and audio generation.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-04 |
| 机构 | Black Forest Labs × MIT |
| 分类 | cs.CV, cs.LG |
| 链接 | [arXiv](https://bfl.ai/research/self-flow) |

## 📝 我的笔记

## 🔗 相关论文

[[REPA]]
[[DiT]]
[[LDM]]
[[SRA]]
[[DINO]]

---
arxiv_id: "2603.04948"
arxiv_url: "https://arxiv.org/abs/2603.04948"
authors:
  - "Peihao Wang"
  - "Ruisi Cai"
  - "Zhen Wang"
  - "Hongyuan Mei"
  - "Qiang Liu"
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

# $\nabla$-Reasoner: LLM Reasoning via Test-Time Gradient Descent in Latent Space

## 📌 核心贡献

> Scaling inference-time compute for Large Language Models (LLMs) has unlocked unprecedented reasoning capabilities. However, existing inference-time scaling methods typically rely on inefficient and suboptimal discrete search algorithms or trial-and-error prompting to improve the online policy.

## 📖 摘要

Scaling inference-time compute for Large Language Models (LLMs) has unlocked unprecedented reasoning capabilities. However, existing inference-time scaling methods typically rely on inefficient and suboptimal discrete search algorithms or trial-and-error prompting to improve the online policy. In this paper, we propose $\nabla$-Reasoner, an iterative generation framework that integrates differentiable optimization over token logits into the decoding loop to refine the policy on the fly. Our core component, Differentiable Textual Optimization (DTO), leverages gradient signals from both the LLM's likelihood and a reward model to refine textual representations. $\nabla$-Reasoner further incorporates rejection sampling and acceleration design to robustify and speed up decoding. Theoretically, we show that performing inference-time gradient descent in the sample space to maximize reward is dual to aligning an LLM policy via KL-regularized reinforcement learning. Empirically, $\nabla$-Reasoner achieves over 20% accuracy improvement on a challenging mathematical reasoning benchmark, while reducing number of model calls by approximately 10-40% compared to strong baselines. Overall, our work introduces a paradigm shift from zeroth-order search to first-order optimization at test time, offering a cost-effective path to amplify LLM reasoning.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-05 |
| 机构 |  |
| 分类 | cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2603.04948) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

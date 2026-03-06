---
arxiv_id: "2603.04333"
arxiv_url: "https://arxiv.org/abs/2603.04333"
authors:
  - "Bhavya Agrawalla"
  - "Michal Nauman"
  - "Aviral Kumar"
published: "2026-03-04"
categories:
  - "cs.LG"
  - "cs.AI"
tags:
  - paper
  - machine-learning
  - ai
  - cmu
added: "2026-03-06"
rating: ""
institution: "Carnegie Mellon University x University of Warsaw"
---

# What Does Flow Matching Bring To TD Learning?

## 📌 核心贡献

> Recent work shows that flow matching can be effective for scalar Q-value function estimation in reinforcement learning (RL), but it remains unclear why or how this approach differs from standard critics. Contrary to conventional belief, we show that their success is not explained by distributional RL, as explicitly modeling return distributions can reduce performance.

## 📖 摘要

Recent work shows that flow matching can be effective for scalar Q-value function estimation in reinforcement learning (RL), but it remains unclear why or how this approach differs from standard critics. Contrary to conventional belief, we show that their success is not explained by distributional RL, as explicitly modeling return distributions can reduce performance. Instead, we argue that the use of integration for reading out values and dense velocity supervision at each step of this integration process for training improves TD learning via two mechanisms. First, it enables robust value prediction through \emph{test-time recovery}, whereby iterative computation through integration dampens errors in early value estimates as more integration steps are performed. This recovery mechanism is absent in monolithic critics. Second, supervising the velocity field at multiple interpolant values induces more \emph{plastic} feature learning within the network, allowing critics to represent non-stationary TD targets without discarding previously learned features or overfitting to individual TD targets encountered during training. We formalize these effects and validate them empirically, showing that flow-matching critics substantially outperform monolithic critics (2$\times$ in final performance and around 5$\times$ in sample efficiency) in settings where loss of plasticity poses a challenge e.g., in high-UTD online RL problems, while remaining stable during learning.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-04 |
| 机构 | Carnegie Mellon University x University of Warsaw |
| 分类 | cs.LG, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2603.04333) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

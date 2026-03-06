---
arxiv_id: "2603.03485"
arxiv_url: "https://arxiv.org/abs/2603.03485"
authors:
  - "Haoran Lu"
  - "Shang Wu"
  - "Jianshu Zhang"
  - "Maojiang Su"
  - "Guo Ye"
published: "2026-03-03"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.RO"
tags:
  - paper
  - computer-vision
  - ai
  - robotics
added: "2026-03-06"
rating: ""
institution: ""
---

# Phys4D: Fine-Grained Physics-Consistent 4D Modeling from Video Diffusion

## 📌 核心贡献

> Recent video diffusion models have achieved impressive capabilities as large-scale generative world models. However, these models often struggle with fine-grained physical consistency, exhibiting physically implausible dynamics over time.

## 📖 摘要

Recent video diffusion models have achieved impressive capabilities as large-scale generative world models. However, these models often struggle with fine-grained physical consistency, exhibiting physically implausible dynamics over time. In this work, we present \textbf{Phys4D}, a pipeline for learning physics-consistent 4D world representations from video diffusion models. Phys4D adopts \textbf{a three-stage training paradigm} that progressively lifts appearance-driven video diffusion models into physics-consistent 4D world representations. We first bootstrap robust geometry and motion representations through large-scale pseudo-supervised pretraining, establishing a foundation for 4D scene modeling. We then perform physics-grounded supervised fine-tuning using simulation-generated data, enforcing temporally consistent 4D dynamics. Finally, we apply simulation-grounded reinforcement learning to correct residual physical violations that are difficult to capture through explicit supervision. To evaluate fine-grained physical consistency beyond appearance-based metrics, we introduce a set of \textbf{4D world consistency evaluation} that probe geometric coherence, motion stability, and long-horizon physical plausibility. Experimental results demonstrate that Phys4D substantially improves fine-grained spatiotemporal and physical consistency compared to appearance-driven baselines, while maintaining strong generative performance. Our project page is available at https://sensational-brioche-7657e7.netlify.app/

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-03 |
| 机构 |  |
| 分类 | cs.CV, cs.AI, cs.RO |
| 链接 | [arXiv](https://arxiv.org/abs/2603.03485) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

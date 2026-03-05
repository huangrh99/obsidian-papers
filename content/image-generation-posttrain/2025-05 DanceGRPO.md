---
arxiv_id: "2505.07818"
arxiv_url: "https://arxiv.org/abs/2505.07818"
authors:
  - "Zeyue Xue"
  - "Jie Wu"
  - "Yu Gao"
  - "Fangyuan Kong"
  - "Lingting Zhu"
  - "Mengzhao Chen"
  - "Zhiheng Liu"
  - "Wei Liu"
  - "Qiushan Guo"
  - "Weilin Huang"
  - "Ping Luo"
published: "2025-05-12"
categories:
  - "cs.CV"
tags:
  - paper
  - image-generation-posttrain
  - tencent
  - hku
institution: "HKU / Tencent"
notion_topic: "图像生成后训练"
added: "2026-03-04"
rating: ""
aliases:
  - "DanceGRPO"
extends: []
related_topic:
  - "[[2023-05 DDPO]]"
  - "[[2023-10 AlignProp]]"
  - "[[2023-04 RAFT]]"
---

# DanceGRPO

## 📌 核心贡献

> 首次将组相对策略优化（GRPO）引入视觉生成领域，通过组内相对奖励评估消除了对价值模型（Critic）的需求。该框架同时兼容扩散模型与整流流（Rectified Flow），在大规模多样化提示词下表现出极强的优化稳定性，大幅刷新了图像与视频生成的对齐基准。

## 📖 摘要

Recent advances in generative AI have revolutionized visual content creation, yet aligning model outputs with human preferences remains a critical challenge. While Reinforcement Learning (RL) has emerged as a promising approach for fine-tuning generative models, existing methods like DDPO and DPOK face fundamental limitations - particularly their inability to maintain stable optimization when scaling to large and diverse prompt sets, severely restricting their practical utility. This paper presents DanceGRPO, a framework that addresses these limitations through an innovative adaptation of Group Relative Policy Optimization (GRPO) for visual generation tasks. Our key insight is that GRPO's inherent stability mechanisms uniquely position it to overcome the optimization challenges that plague prior RL-based approaches on visual generation. DanceGRPO establishes several significant advances: First, it demonstrates consistent and stable policy optimization across multiple modern generative paradigms, including both diffusion models and rectified flows. Second, it maintains robust performance when scaling to complex, real-world scenarios encompassing three key tasks and four foundation models. Third, it shows remarkable versatility in optimizing for diverse human preferences as captured by five distinct reward models assessing image/video aesthetics, text-image alignment, video motion quality, and binary feedback. Our comprehensive experiments reveal that DanceGRPO outperforms baseline methods by up to 181% across multiple established benchmarks, including HPS-v2.1, CLIP Score, VideoAlign, and GenEval.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | HKU / Tencent |
| 发表 | 2025-05-12 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2505.07818) |

## 📝 我的笔记

Project Page: https://dancegrpo.github.io/  
GRPO 来自 DeepSeek-R1 中的 LLM 对齐算法，DanceGRPO 将其迁移至视觉生成。同时支持图像和视频生成任务。

## 🔗 相关论文

**基于/改进自：** —

**同方向（GRPO用于视觉生成）：** [[2023-05 DDPO]], [[2023-10 AlignProp]], [[2023-04 RAFT]]

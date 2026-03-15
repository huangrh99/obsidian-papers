---
title: "ImageReward: Learning and Evaluating Human Preferences for Text-to-Image Generation"
arxiv_id: "2304.05977"
arxiv_url: "https://arxiv.org/abs/2304.05977"
authors:
  - "Jiazheng Xu"
  - "Xiao Liu"
  - "Yuchen Wu"
  - "Yuxuan Tong"
  - "Qinkai Li"
  - "Ming Ding"
  - "Jie Tang"
  - "Yuxiao Dong"
published: "2023-04-12"
categories:
  - "cs.CV"
  - "cs.LG"
tags:
  - paper
  - reward-model
  - tsinghua
institution: "Tsinghua University (THUDM)"
notion_topic: "图像生成后训练"
added: "2026-03-04"
rating: ""
aliases:
  - "ImageReward"
extends: []
related_topic:
  - "[[PickScore]]"
  - "[[HPSv2]]"
---

# ImageReward

## 📌 核心贡献

> 构建了首个大规模通用T2I人类偏好奖励模型，通过对137k专家比较数据的建模解决偏好冲突问题。配套提出的ReFL算法通过在扩散采样链条末端反向传播奖励梯度，实现了比传统方法更精准的人类感知对齐。

## 📖 摘要

We present a comprehensive solution to learn and improve text-to-image models from human preference feedback. To begin with, we build ImageReward -- the first general-purpose text-to-image human preference reward model -- to effectively encode human preferences. Its training is based on our systematic annotation pipeline including rating and ranking, which collects 137k expert comparisons to date. In human evaluation, ImageReward outperforms existing scoring models and metrics, making it a promising automatic metric for evaluating text-to-image synthesis. On top of it, we propose Reward Feedback Learning (ReFL), a direct tuning algorithm to optimize diffusion models against a scorer. Both automatic and human evaluation support ReFL's advantages over compared methods.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Tsinghua University (THUDM) |
| 发表 | 2023-04-12 |
| 分类 | cs.CV, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2304.05977) |

## 📝 我的笔记

同时包含 ReFL 算法（直接对奖励分数反向传播）。

## 🔗 相关论文

**基于/改进自：** —

**同方向（reward model）：** [[PickScore]], [[HPSv2]]

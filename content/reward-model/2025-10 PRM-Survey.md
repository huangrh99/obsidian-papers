---
title: "A Survey of Process Reward Models: From Outcome Signals to Process Supervisions for Large Language Models"
arxiv_id: "2510.08049"
arxiv_url: "https://arxiv.org/abs/2510.08049"
authors:
  - "Congming Zheng"
  - "Jiachen Zhu"
  - "Zhuoying Ou"
  - "Yuxiang Chen"
  - "Kangning Zhang"
  - "Rong Shan"
  - "Zeyu Zheng"
  - "Mengyue Yang"
  - "Jianghao Lin"
  - "Yong Yu"
  - "Weinan Zhang"
published: "2025-10-09"
categories:
  - "cs.CL"
  - "cs.AI"
tags:
  - paper
  - reward-model
  - modality/text
institution: ""
notion_topic: "过程奖励模型综述"
added: "2026-03-15"
rating: ""
aliases:
  - "PRM-Survey"
extends: []
baseline: []
related_topic:
  - "[[PRM800K]]"
  - "[[Math-Shepherd]]"
  - "[[ThinkPRM]]"
  - "[[PRIME]]"
---

# PRM-Survey

## 📌 核心贡献

> 首个系统性的过程奖励模型 (PRM) 综述，覆盖过程数据生成、PRM 构建、测试时扩展和强化学习的完整闭环，总结了数学、代码、文本、多模态推理、机器人和 Agent 等领域的应用。

## 📖 摘要

Although Large Language Models (LLMs) exhibit advanced reasoning ability, conventional alignment remains largely dominated by outcome reward models (ORMs) that judge only final answers. Process Reward Models (PRMs) address this gap by evaluating and guiding reasoning at the step or trajectory level. This survey provides a systematic overview of PRMs through the full loop: how to generate process data, build PRMs, and use PRMs for test-time scaling and reinforcement learning. We summarize applications across math, code, text, multimodal reasoning, robotics, and agents, and review emerging benchmarks. Our goal is to clarify design spaces, reveal open challenges, and guide future research toward fine-grained, robust reasoning alignment.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | - |
| 发表 | 2025-10-09 |
| 分类 | cs.CL, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2510.08049) |

## 📝 我的笔记

### 动机与问题定义

传统对齐方法主要依赖结果奖励模型 (ORM)，只评判最终答案。PRM 通过在步骤或轨迹层面进行评估和引导来弥补这一不足。随着 PRM 研究的快速发展，亟需一个系统性的综述来梳理设计空间和开放挑战。

### 综述框架

本综述围绕 PRM 的**完整闭环**进行组织：

**1. 过程数据生成：**
- 人工标注（如 PRM800K）
- 自动化标注方法（如 Math-Shepherd 的蒙特卡洛估计）
- 混合标注策略

**2. PRM 构建：**
- 判别式 PRM：直接输出步骤正确性标签
- 生成式 PRM（如 ThinkPRM）：通过推理生成评估
- 隐式 PRM（如 GRPO 隐式 PRM）

**3. PRM 的应用：**
- **测试时扩展 (TTS)**：Best-of-N、Beam Search、引导搜索
- **强化学习**：过程级奖励信号用于 RL 训练
- **跨领域应用**：数学、代码、文本、多模态、机器人、Agent

**4. 基准评测：**
- ProcessBench、VisualProcessBench 等新兴基准

### 覆盖领域

| 应用领域 | 典型工作 |
|---------|---------|
| 数学推理 | PRM800K, Math-Shepherd, PRIME |
| 代码生成 | CodePRM |
| 文本推理 | ThinkPRM |
| 多模态推理 | VisualPRM, VL-PRM |
| 机器人 | Process-level RL |
| Agent | Agent reward shaping |

### 总结

这是一篇组织良好的综述，对 PRM 领域进行了全面的梳理。特别有价值的是其对设计空间的系统化分类和对开放挑战的总结，可作为 PRM 研究的入门参考。与之前的 RM Survey 相比，本综述更聚焦于过程级奖励建模的特定主题。

## 🔗 相关论文

**同方向：** [[PRM800K]], [[Math-Shepherd]], [[ThinkPRM]], [[PRIME]]

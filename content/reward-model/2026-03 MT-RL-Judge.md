---
title: "Multi-Task Reinforcement Learning for Enhanced Multimodal LLM-as-a-Judge"
arxiv_id: "2603.11665"
arxiv_url: "https://arxiv.org/abs/2603.11665"
authors:
  - "Junjie Wu"
  - "Xuan Kan"
  - "Zihao He"
  - "Shunwen Tan"
  - "Bo Pan"
  - "Kaitai Zhang"
published: "2026-03-12"
categories:
  - "cs.CL"
tags:
  - paper
  - reward-model
  - meta
  - hkust
  - emory
  - modality/image
  - modality/video
  - modality/text
institution: "Meta, Hong Kong University of Science and Technology, Emory University"
notion_topic: "多任务RL多模态评判"
added: "2026-03-16"
rating: ""
aliases:
  - "MT-RL-Judge"
extends:
  - "[[MLLM-as-a-Judge]]"
baseline:
  - "[[MJ-Bench]]"
related_topic:
  - "[[MLLM-as-a-Judge]]"
  - "[[J1]]"
  - "[[R1-Reward]]"
---

# MT-RL-Judge

## 📌 核心贡献

> 提出首个统一的多任务强化学习框架用于 MLLM-as-a-Judge，通过 GRPO 联合优化多种评估任务，在保持多任务性能的同时展现出对未见任务格式的强泛化能力（SFT 在 OOD 上灾难性退化而 RL 保持鲁棒）。

## 📖 摘要

Multimodal Large Language Models (MLLMs) have been widely adopted as MLLM-as-a-Judges due to their strong alignment with human judgment across various visual tasks. However, most existing judge models are optimized for single-task scenarios and struggle to generalize to diverse contexts, which is a critical requirement for reliable evaluation. To address this limitation, we propose Multi-Task Reinforcement Learning for MLLM-as-a-Judge (MT-RL-Judge), a framework that jointly optimizes the judge model across multiple tasks, leveraging the generalization capabilities of RL. Experimental results against several strong baselines demonstrate that MT-RL-Judge outperforms strong baselines in both judgment consistency and correlation with human preferences. Furthermore, our approach exhibits robust generalization on out-of-distribution tasks, further validating its effectiveness.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Meta, Hong Kong University of Science and Technology, Emory University |
| 发表 | 2026-03-12 |
| 分类 | cs.CL |
| 链接 | [arXiv](https://arxiv.org/abs/2603.11665) |

## 📝 我的笔记

### 动机与问题定义

现有 MLLM-as-a-Judge 方法面临两个关键局限：
1. **单任务专门化**：大多数评判模型针对单一评估任务优化，难以泛化到多样化的评估场景
2. **SFT 的过拟合风险**：通过监督微调训练的评判模型容易过拟合特定指令格式，限制了对新任务的适应能力

MT-RL-Judge 的核心洞察是：RL 训练能够激励模型内化底层的评判逻辑（而非记忆表面模式），从而在多任务统一训练下获得更好的泛化能力。

### 方法细节

#### 1. 统一问题建模

将 $K$ 个评估数据集统一为：

$$D_{\text{unified}} = \bigcup_{k=1}^{K} D_k$$

每个数据集包含标注的多模态输入 $(x_i, y_i)$ 和任务特定的 prompt $p_i$。

#### 2. 复合奖励函数设计

$$R_{\text{total}} = (1 - \alpha) \cdot R_{\text{Acc}} + \alpha \cdot R_{\text{For}}$$

- **准确率奖励** $R_{\text{Acc}}$：二元奖励，预测正确为 1.0，否则 0.0
- **格式奖励** $R_{\text{For}}$：二元奖励，推理格式正确为 1.0，否则 0.0

#### 3. GRPO 训练目标

$$\theta^* = \arg\max_{\theta} \mathbb{E}_{(x,p,y) \sim D_{\text{unified}}} \left[ R_{\text{total}}(M_\theta(x)) \right]$$

使用 Group Relative Policy Optimization，对每个 prompt 生成 $G$ 个输出，通过组内相对优势估计进行优化，无需单独的 value function。

#### 4. 推理优先范式（Reasoning-First Paradigm）

模型在输出最终判断前先生成显式推理链，促使模型深度内化评估逻辑而非记忆输入-输出映射。

### 训练数据集

| 任务 | Train | Val | Test | 描述 |
|------|-------|-----|------|------|
| AGIN-Nat | 4,839 | 605 | 605 | 图像自然度评估 |
| AGIN-Tech | 4,839 | 605 | 605 | 技术质量评估 |
| AGIN-Rat | 4,839 | 605 | 605 | 逻辑合理性评估 |
| SeeTrue | 5,544 | 693 | 693 | 图文对齐 |
| ImageReward | 6,194 | 2,584 | 2,720 | 质量与对齐 |
| UnsafeBench | 7,298 | 811 | 2,037 | 安全合规检测 |

### 关键实验结果

#### 主结果（Macro-F1）

| 方法 | AGIN-Nat | AGIN-Tech | AGIN-Rat | SeeTrue | ImageReward | UnsafeBench |
|------|----------|-----------|----------|---------|-------------|-------------|
| Off-the-shelf | 67.99 | 63.24 | 64.77 | 80.01 | 55.07 | 72.78 |
| SFT-Single | 78.64 | 77.04 | 78.08 | 80.41 | 64.95 | 90.28 |
| SFT-Unified | 81.75 | 81.22 | 81.31 | 82.32 | 63.34 | 89.49 |
| RL-Single | 80.50 | 80.77 | 82.71 | 83.41 | 65.07 | 86.92 |
| **MT-RL-Judge** | **81.63** | **81.37** | **81.58** | **83.67** | **64.97** | 85.22 |

**RL 在 6 个任务中的 5 个上超越 SFT（RL-Single vs SFT-Single）。**

#### 泛化性结果（MJ-Bench，未见过的成对比较格式，Macro-F1）

| 方法 | Image-text Alignment | Safety Judge |
|------|---------------------|-------------|
| Off-the-shelf | 59.41 | 73.07 |
| SFT-Unified | 55.82 | **49.40** |
| **MT-RL-Judge** | **60.59** | **82.23** |

**关键发现：SFT-Unified 在未见任务格式上灾难性退化**（Safety 从 73.07% 降至 49.40%），而 MT-RL-Judge 不仅保持鲁棒，还大幅超越基线（82.23% vs 73.07%）。这证实了 RL 训练确实帮助模型内化了评判逻辑，而非简单记忆训练数据的模式。

### Ablation 分析

通过基线对比隐含了三组消融：

| 对比 | 结论 |
|------|------|
| RL-Single vs SFT-Single | RL 优于 SFT（推理驱动 > 模式匹配） |
| SFT-Unified vs SFT-Single | 多任务训练提升泛化（跨任务知识共享） |
| MT-RL-Judge（RL + Multi-task） | 两者结合取得最佳效果 |

### 总结性评价

MT-RL-Judge 从工程和方法论角度都很有价值。核心贡献是证明了 RL 多任务训练在 MLLM-as-a-Judge 场景中的优势——特别是 OOD 泛化实验令人信服地展示了 SFT 的过拟合问题和 RL 的鲁棒性。框架设计简洁实用：统一数据集 + 复合奖励 + GRPO，无需额外的负样本合成或推理蒸馏。局限性在于论文没有公开实际的图架构图（HTML 版本中的"Figure"均为文本格式的 prompt 模板），且缺少对 $\alpha$ 超参数的敏感性分析。与 MR. Judge 相比，MT-RL-Judge 更侧重多任务泛化，而 MR. Judge 侧重推理能力注入——两者是互补的方向。

## 🔗 相关论文

**基于/改进自：** [[MLLM-as-a-Judge]]

**同方向：** [[J1]], [[R1-Reward]], [[MJ-Bench]]

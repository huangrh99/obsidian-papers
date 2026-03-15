---
title: "HelpSteer2: Open-source dataset for training top-performing reward models"
arxiv_id: "2406.08673"
arxiv_url: "https://arxiv.org/abs/2406.08673"
authors:
  - "Zhilin Wang"
  - "Yi Dong"
  - "Olivier Delalleau"
  - "Jiaqi Zeng"
  - "Gerald Shen"
  - "Daniel Egert"
  - "Jimmy J. Zhang"
  - "Makesh Narsimhan Sreedhar"
  - "Oleksii Kuchaiev"
published: "2024-06-12"
categories:
  - "cs.CL"
  - "cs.AI"
  - "cs.LG"
tags:
  - paper
  - reward-model
  - nvidia
  - modality/text
institution: "NVIDIA"
notion_topic: "多属性偏好数据集"
added: "2026-03-15"
rating: ""
aliases:
  - "HelpSteer2"
extends:
  - "[[Nemotron-4]]"
baseline: []
related_topic:
  - "[[Nemotron-4]]"
  - "[[ArmoRM]]"
---

# HelpSteer2

## 📌 核心贡献

> 发布仅含 1 万对响应的高效偏好数据集 HelpSteer2（CC-BY-4.0），训练出的奖励模型在 RewardBench 上达到 92.0% SOTA，并提出 SteerLM 2.0 对齐方法利用多属性奖励预测。

## 📖 摘要

High-quality preference datasets are essential for training reward models that can effectively guide large language models (LLMs) in generating high-quality responses aligned with human preferences. As LLMs become stronger and better aligned, permissively licensed preference datasets, such as Open Assistant, HH-RLHF, and HelpSteer need to be updated to remain effective for reward modeling. Methods that distil preference data from proprietary LLMs such as GPT-4 have restrictions on commercial usage imposed by model providers. To improve upon both generated responses and attribute labeling quality, we release HelpSteer2, a permissively licensed preference dataset (CC-BY-4.0). Using a powerful internal base model trained on HelpSteer2, we are able to achieve the SOTA score (92.0%) on Reward-Bench's primary dataset, outperforming currently listed open and proprietary models, as of June 12th, 2024. Notably, HelpSteer2 consists of only ten thousand response pairs, an order of magnitude fewer than existing preference datasets (e.g., HH-RLHF), which makes it highly efficient for training reward models. Our extensive experiments demonstrate that reward models trained with HelpSteer2 are effective in aligning LLMs. In particular, we propose SteerLM 2.0, a model alignment approach that can effectively make use of the rich multi-attribute score predicted by our reward models.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | NVIDIA |
| 发表 | 2024-06-12 |
| 分类 | cs.CL, cs.AI, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2406.08673) |

## 📝 我的笔记

### 动机与问题

随着 LLM 能力增强，现有开源偏好数据集（如 Open Assistant、HH-RLHF）已不够有效。从 GPT-4 蒸馏的数据受商业使用限制。需要一个许可宽松、高质量、数据高效的偏好数据集。

### 核心方法

**数据收集：**
- 提示来源：ShareGPT（95%+）+ 内部企业用例
- 每个提示生成 2 个响应，来源多样（内部 Nemotron 模型 18.9-40.4%、Mixtral 7.9%、人工 5.9%）
- 约 29% 为多轮对话提示
- 5 个属性在 Likert-5 量表上标注：helpfulness、correctness、coherence、complexity、verbosity
- 每个响应至少 3 名标注者

**奖励模型架构：**
- 基模型（Llama 3 70B 或 Nemotron-4 340B）+ 线性层
- 将 end-of-response token 的最终层表示转换为 5 个标量值
- 损失函数：MSE loss
- 优化器：AdamW，训练 2 epochs，batch size 128

**SteerLM 2.0：**
通过 KL 散度最小化优化：
$$\min_\theta \mathbb{E}_{a,x} D_{KL}(P(y|a,x) \| Q_\theta(y|a,x))$$
使用重要性采样 + 基线减法的梯度估计来减少方差。

### 关键结果

| 模型 | RewardBench 总分 | Chat | Chat-Hard | Safety | Reasoning |
|------|-----------------|------|-----------|--------|-----------|
| Nemotron-4 340B RM | **92.0%** | 95.8% | 87.1% | 91.5% | 93.7% |
| Llama 3 70B RM | 88.8% | — | — | — | — |
| GPT-4-0125-preview | 85.9% | — | — | — | — |

| 对齐方法 | MT Bench 分数 |
|----------|--------------|
| SteerLM 2.0 Iter 2 | **8.28** |
| DPO Iterative | 8.09 |
| Llama 3 70B Instruct | 8.16 |

**标注质量（Cohen's $\kappa$）**：多轮迭代改进后 helpfulness 0.465→0.791，correctness 0.472→0.793

**数据效率**：仅 1 万偏好对即超越使用千万级数据的 Llama 3 70B Instruct

### 总结

HelpSteer2 以极小的数据量实现了 SOTA 奖励模型性能，证明了高质量标注比数据规模更重要。5 属性多维评分提供了丰富的奖励信号，SteerLM 2.0 有效利用了这些多属性预测。CC-BY-4.0 许可也使其成为商业友好的基础资源。

## 🔗 相关论文

**基于/改进自：** [[Nemotron-4]]

**同方向：** [[ArmoRM]]

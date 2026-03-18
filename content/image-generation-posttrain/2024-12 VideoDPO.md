---
title: "VideoDPO: Omni-Preference Alignment for Video Diffusion Generation"
arxiv_id: "2412.14167"
arxiv_url: "https://arxiv.org/abs/2412.14167"
authors:
  - "Runtao Liu"
  - "Haoyu Wu"
  - "Zheng Ziqiang"
  - "Chen Wei"
  - "Yingqing He"
  - "Renjie Pi"
  - "Qifeng Chen"
published: "2024-12-18"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.LG"
tags:
  - paper
  - image-generation-posttrain
  - hkust
  - modality/video
  - modality/text
institution: "HKUST / Renmin University of China / Johns Hopkins University"
notion_topic: "视频扩散偏好对齐"
added: "2026-03-15"
rating: ""
aliases:
  - "VideoDPO"
extends:
  - "[[Diffusion-DPO]]"
baseline:
  - "[[T2V-Turbo]]"
related_topic:
  - "[[Step-Video]]"
---

# VideoDPO

## 📌 核心贡献

> 提出 VideoDPO，将 DPO 适配到视频扩散模型，引入 OmniScore 多维度评分机制同时考虑帧内视觉质量、帧间时序一致性和文本-视频语义对齐，并通过基于分数分布的数据重加权策略提升偏好学习效果。

## 📖 摘要

Recent progress in learning-based video generation has greatly advanced the visual quality and temporal coherence of generated videos. However, these models are not inherently aligned with human preferences, leading to potential issues in visual quality, content accuracy, and ethical concerns. To address this, aligning video diffusion models with human preferences has become a critical research goal. In this work, we introduce VideoDPO, a comprehensive framework that extends Direct Preference Optimization (DPO) to video diffusion models. VideoDPO consists of three key components: (1) OmniScore, an omni-dimensional preference scoring system that evaluates videos across visual quality, temporal consistency, and text-video semantic alignment; (2) an automated preference data generation pipeline that produces high-quality preference pairs; and (3) a score-based re-weighting strategy that assigns higher training weights to more distinctive preference pairs. Extensive experiments demonstrate that VideoDPO significantly improves both visual quality and semantic alignment, ensuring that no preference aspect is neglected.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | HKUST / Renmin University / Johns Hopkins University |
| 发表 | 2024-12-18 |
| 分类 | cs.CV, cs.AI, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2412.14167) |

## 📝 我的笔记

### 动机与问题

视频扩散模型生成质量不断提升，但缺乏与人类偏好的对齐。直接将图像 DPO 应用于视频面临两个挑战：(1) 视频质量是多维度的（帧内质量、帧间一致性、语义对齐），单一评分无法全面评估；(2) 不同偏好对之间的区分度差异大，需要差异化训练权重。

### 核心方法

**1. OmniScore 多维度评分**

OmniScore 从三个维度综合评估视频质量：

- **帧内质量（Intra-frame）**：使用 MUSIQ 和 LAION Aesthetic Predictor 评估单帧图像质量和美学
- **帧间质量（Inter-frame）**：评估时序一致性，包括：
  - 主体一致性（DINO 特征）
  - 背景稳定性
  - 运动平滑度（帧插值先验）
  - 时序闪烁（RAFT 光流）
  - 动态程度
- **文本-视频语义对齐**：使用 ViCLIP 计算视频-文本一致性

**2. 偏好对生成流程**

每个提示词生成 N=4 个视频，通过 OmniScore 选择最高分和最低分构成偏好对：

$$(v^w, v^l) = (v_i, v_j), \quad i = \arg\max s_i, \quad j = \arg\min s_j$$

**3. 基于分数的数据重加权**

对区分度更高的偏好对赋予更大训练权重：

$$w_{pair} = \left(\frac{\beta}{\text{prob}(s^w, s^l)}\right)^\alpha$$

其中 $\text{prob}(s^w, s^l)$ 基于分数分布的直方图计算几何均值概率。罕见的分数组合（高区分度偏好对）获得更大权重。

最终训练损失：

$$\mathcal{L}_{video} = \mathcal{L}_{DPO}(p, v^w, v^l) \cdot w_{pair}$$

### 关键实验结果

**VBench 基准：**

| 模型 | VBench Total | Quality | Semantics | HPS (V) | PickScore |
|------|-------------|---------|-----------|---------|-----------|
| VC2 Baseline | 80.44% | 82.20% | 73.42% | 0.258 | 20.65 |
| VC2 + VideoDPO | **81.93%** | **83.07%** | **77.38%** | **0.261** | 20.65 |
| T2V-Turbo Baseline | 80.95% | 82.71% | 73.93% | 0.262 | 21.15 |
| T2V-Turbo + VideoDPO | **81.80%** | **83.80%** | 73.81% | 0.260 | **21.18** |
| CogVideo Baseline | 79.30% | 82.35% | 67.10% | — | 19.81 |
| CogVideo + VideoDPO | **79.80%** | **83.00%** | 66.99% | — | 19.79 |

**Ablation 分析：**

| 配对策略 | VBench Total |
|----------|-------------|
| Best-vs-Worst | **81.93%** |
| Best-vs-Random | 81.52% |
| Adjacent pairs | 81.20% |

| 重加权 $\alpha$ | Quality | Semantics |
|-----------------|---------|-----------|
| $\alpha = 0$ (无重加权) | 82.63% | 76.30% |
| $\alpha = 1.0$ | **83.07%** | **77.38%** |
| $\alpha = 2.0$ | 83.15% | 76.01% |

**实现细节：**
- 训练 3000 步，batch size 8，学习率 6e-6（AdamW）
- 数据集：VidProm 10K 提示词，每提示词生成 4 个视频
- 硬件：4 x Nvidia A100 GPU
- 超参数：$\alpha = 0.72$，$\beta = 1$

### 总结

VideoDPO 的核心贡献是 OmniScore 多维度评分体系，系统性地覆盖了视频质量的帧内、帧间和语义三个维度。数据重加权策略通过提升高区分度偏好对的训练权重来改善学习效率。在多个视频生成模型上验证了泛化性，但语义对齐的提升在某些模型上不够一致。

## 🔗 相关论文

**基于/改进自：** [[Diffusion-DPO]]

**同方向：** [[Step-Video]], [[OnlineVPO]]

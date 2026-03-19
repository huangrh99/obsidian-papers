---
title: "Unified Personalized Reward Model for Vision Generation"
arxiv_id: "2602.02380"
arxiv_url: "https://arxiv.org/abs/2602.02380"
authors:
  - "Yibin Wang"
  - "Yuhang Zang"
  - "Feng Han"
  - "Jiazi Bu"
  - "Yujie Zhou"
  - "Cheng Jin"
  - "Jiaqi Wang"
published: "2026-02-02"
categories:
  - "cs.CV"
tags:
  - paper
  - reward-model
  - fudan
  - shanghai-ai-lab
  - modality/image
  - modality/video
institution: "Fudan University & Shanghai Innovation Institute & SJTU & Shanghai AI Lab"
notion_topic: "奖励模型"
added: "2026-03-13"
rating: ""
aliases:
  - "UnifiedReward-Flex"
extends:
  - "[[UnifiedReward-Think]]"
baseline:
  - "[[UnifiedReward-Think]]"
  - "[[UnifiedReward]]"
  - "[[HPSv2]]"
  - "[[PickScore]]"
related_topic:
  - "[[UnifiedReward]]"
  - "[[UnifiedReward-Think]]"
  - "[[HPSv3]]"
---

# UnifiedReward-Flex

## 📌 核心贡献

> UnifiedReward 系列第三代，从固定评估维度升级为**动态个性化层级评估**：根据具体内容自动构建评估层级结构（预定义锚点 + 上下文自适应维度），并提出 Pref-GRPO 通过多维胜率实现细粒度偏好优化。聚焦视觉生成（放弃理解任务），在 MMRB2 上超越 Think +3.2，UniGenBench 上 +5.06。

## 📖 摘要

The paper introduces UnifiedReward-Flex, a novel approach to evaluating generated images and videos. Rather than using fixed assessment rules, this model dynamically adapts its evaluation criteria based on the specific content and context. The system operates through two training phases: first, it learns flexible reasoning patterns from advanced language models, and second, it refines its preferences through optimization on carefully selected comparison pairs. When tested within an image and video generation framework, the approach demonstrates improved performance in aligning with human preferences.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Fudan & Shanghai Innovation Inst. & SJTU & Shanghai AI Lab |
| 发表 | 2026-02-02 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2602.02380) · [Project](https://codegoat24.github.io/UnifiedReward/flex) · [GitHub](https://github.com/CodeGoat24/UnifiedReward) |

## 📝 我的笔记

### 核心问题/动机

UnifiedReward-Think 虽然引入了 CoT 推理，但评估维度仍然**固定**（语义一致性、美学、真实性）。现实中不同 prompt 和内容需要**不同的评估标准**：
- 风景图重视构图和光影，人物图重视表情和动作
- 叙事视频需要评估故事连贯性，物理模拟视频需要评估物理合理性

固定维度 = one-size-fits-all，无法捕捉内容特定的质量维度。

### 相比 UnifiedReward-Think 的改进

| 维度 | UnifiedReward-Think | → UnifiedReward-Flex |
|------|--------------------|-----------------------|
| 评估维度 | 固定维度（语义/美学/真实性） | **动态层级**：锚点维度 + 上下文自适应维度 |
| 基座模型 | LLaVA-OneVision 7B | **Qwen3-VL**（2B/4B/8B/32B） |
| 覆盖范围 | 理解 + 生成（4任务） | **仅生成**（图像+视频） |
| 训练范式 | 蒸馏 + 拒绝采样 + GRPO | **SFT 蒸馏 + DPO** |
| 下游优化 | 标量 GRPO | **Pref-GRPO**（多维胜率） |
| 推理格式 | `<think>` 固定维度推理 | 动态层级 $(d_k, S_{i,k})$ + 灵活维度 |

### 方法

#### 1. 层级化动态评估

给定 prompt + 生成内容，模型自动进行：
1. **语义意图解析**：解读 prompt 语义，定位视觉证据
2. **层级评估计划**：在预定义锚点维度（semantic alignment, visual quality, aesthetics）下实例化细粒度子标准
3. **上下文维度增补**：根据内容自动生成额外维度（如叙事性、动作动态、物理合理性）
![[Pasted image 20260319153327.png]]
输出结构化评估轨迹 $y^T = \langle H, R, W \rangle$：
- $H = \{(d_k, S_{i,k})\}_{k=1}^{K}$（实例化维度及子维度）
- $R$ = 基于证据的推理轨迹
- $W = \{w_k\}_{k=1}^{K}, w$（各维度优胜标签 + 总优胜标签）

#### 2. Stage 1: Reasoning Distillation (SFT)

从闭源 VLM 蒸馏结构化评估轨迹：

$$\mathcal{L}_{\text{SFT}}(\theta) = -\sum_{i=1}^{N} \sum_{t=1}^{|y_i^T|} \log p_\theta(y_{i,t}^T | x_i, y_{i,<t}^T)$$

训练数据：**UnifiedReward-Flex-SFT-90K**（90K 样本，1.39M tokens）
- Image：从 HPDv3 采样 50K 图像偏好对
- Video：Text2Video-Human Preferences (15K) + VideoFeedback2 预处理构建 35K 视频偏好对
- 蒸馏源：GPT-5.2，为 45K 图像对 + 45K 视频对生成结构化推理轨迹

#### 3. Stage 2: Reasoning-Aware DPO 对齐

对每个输入 $x_i = (p_i, v_i^{(0)}, v_i^{(1)})$，从 SFT 模型采样两个评估轨迹：

$$y_i^{(a)}, y_i^{(b)} \sim \pi_\theta(\cdot | x_i)$$

正确性判定：$c(y_i^{(j)}) = \mathbb{1}[\hat{w}(y_i^{(j)}) = w_i^*]$

偏好对构建规则（Eq. 7）：

$$
(y_i^+, y_i^-) = \begin{cases}
(y_i^{(a)}, y_i^{(b)}), & c(y_i^{(a)}) > c(y_i^{(b)}) \\
(y_i^{(b)}, y_i^{(a)}), & c(y_i^{(b)}) > c(y_i^{(a)}) \\
(y_i^{(\ell_i^{\text{traj}})}, y_i^{(\bar{\ell}_i^{\text{traj}})}), & c(y_i^{(a)}) = c(y_i^{(b)}) = 1
\end{cases}
$$

- 一个正确一个错误 → 偏好正确的
- **两个都正确** → 用闭源 judge $\mathcal{T}_{\text{judge}}$ 基于**轨迹级偏好**排序，优先选择更灵活、更上下文化的层级结构
- 两个都错误 → 丢弃

DPO 损失：

$$\mathcal{L}_{\text{DPO}}(\theta) = -\mathbb{E}_{(x, y^+, y^-) \sim \mathcal{P}}\left[\log \sigma\left(\beta_{\text{dpo}} \left(\log \frac{\pi_\theta(y^+|x)}{\pi_{\text{ref}}(y^+|x)} - \log \frac{\pi_\theta(y^-|x)}{\pi_{\text{ref}}(y^-|x)}\right)\right)\right]$$

$\beta_{\text{dpo}} = 0.1$，$\pi_{\text{ref}}$ 为冻结的 SFT 模型。DPO 阶段使用 temperature 0.7 非贪心解码采样推理轨迹。

**关键创新：** 即使两个轨迹都"正确"（最终判断一致），仍可通过轨迹质量偏好进一步提升评估能力——这对推理过程的质量施加了监督，而非仅看最终结论。

#### 4. Pref-GRPO（下游生成模型优化）

传统 GRPO 用单一标量 reward。Flex 提出**多维胜率**：

维度级胜率：$R_d(x_{i0}, c) = \frac{1}{G-1} \sum_{j \neq i} \mathbb{1}[x_{i0} \succ_d x_{j0}]$

平均维度胜率：$\bar{R}_{\text{dim}} = \frac{1}{D} \sum_{d=1}^{D} R_d$

最终优势函数：

$$\hat{A}_i = \alpha \hat{A}_i^{\text{dim}} + (1 - \alpha) \hat{A}_i^{\text{overall}}, \quad \alpha = 0.7$$

$\alpha = 0.7$ 表示维度级信号权重更大，鼓励多维度均衡提升而非只优化总体分数。

#### 训练超参数

| 参数 | 值 |
|------|-----|
| 基座模型 | UnifiedReward-Think-qwen3vl（2B/4B/8B/32B） |
| Batch size | 2, gradient accumulation 2 |
| 学习率 | $2.5 \times 10^{-6}$ |
| Warm-up ratio | 0.1 |
| $\beta_{\text{dpo}}$ | 0.1 |
| 硬件 | 32× NVIDIA H200 GPUs |
| 默认 GRPO 规模 | 8B（所有下游实验） |

### 关键结果

#### Table 1: RM 评估（Image + Video Generation Assessment）

**Image Generation：**

| 方法 | GenAI-Bench | MMRB2 |
|------|------------|-------|
| HPSv2 | 68.8 | 55.0 |
| PickScore | 70.0 | 57.6 |
| HPSv3 | 70.9 | 58.5 |
| UnifiedReward | 71.5 | 60.0 |
| UnifiedReward-Think | 72.3 | 66.0 |
| Ours w/o DPO | 71.5 | 67.5 |
| Ours w/o DPO (Both correct) | 72.0 | 68.4 |
| **Ours (Flex)** | **73.4** | **69.2** |

**Video Generation：**

| 方法 | GenAI-Bench | MJBench |
|------|------------|---------|
| LiFT | 60.1 | 51.0 |
| VideoScore | 70.6 | 62.8 |
| VideoReward | 73.1 | 63.4 |
| UnifiedReward | 76.8 | 68.8 |
| UnifiedReward-Think | 80.3 | 70.9 |
| Ours w/o DPO | 79.4 | 69.1 |
| Ours w/o DPO (Both correct) | 80.6 | 70.3 |
| **Ours (Flex)** | **82.5** | **72.0** |

#### Table 2: T2I GRPO — UniGenBench 域内（FLUX.1-dev）

| 模型 | Overall | Style | World Know. | Attribute | Action | Relation. | Compound | Grammar | Logic.Reason. | Layout | Text |
|------|---------|-------|------------|-----------|--------|-----------|----------|---------|--------------|--------|------|
| FLUX.1-dev | 59.39 | 85.10 | 85.92 | 65.28 | 61.41 | 64.97 | 43.56 | 60.16 | 24.77 | 70.52 | 32.18 |
| w/ HPSv2 | 57.77 | 77.90 | 87.03 | 65.92 | 57.41 | 65.86 | 44.46 | 55.75 | 29.09 | 64.93 | 29.31 |
| w/ HPSv3 | 57.98 | 79.40 | 90.03 | 66.24 | 57.89 | 63.58 | 39.82 | 58.82 | 24.09 | 67.16 | 32.76 |
| w/ PickScore | 58.63 | 79.70 | 87.03 | 64.42 | 61.12 | 67.64 | 47.42 | 58.02 | 27.50 | 67.54 | 25.86 |
| w/ UnifiedReward | 60.87 | 83.50 | 87.97 | 66.13 | 63.88 | 68.65 | 46.52 | 58.69 | 24.32 | 71.08 | 37.93 |
| w/ UnifiedReward-Think | 68.89 | **88.00** | 91.77 | 77.99 | 69.20 | 75.13 | 61.47 | 61.63 | 41.36 | 77.24 | 45.11 |
| **w/ UnifiedReward-Flex** | **73.95** | 90.30 | **89.87** | **79.38** | **73.38** | **78.55** | **69.46** | **63.10** | **46.59** | **79.66** | **59.20** |

Flex vs FLUX.1-dev baseline: **+14.56 Overall**；vs Think: **+5.06**。Compound (+25.9) 和 Text (+27.0) 维度改善最显著。

#### Table 3: T2I GRPO — 域外泛化（GenEval, T2I-CompBench, CLIP, 图像质量）

| 模型 | UniGenBench | T2I-CompBench | GenEval | CLIP | PickScore | UnifiedReward | Aesthetic |
|------|------------|--------------|---------|------|-----------|--------------|-----------|
| FLUX.1-dev | 59.39 | 48.57 | 62.18 | 34.40 | 22.70 | 3.07 | 6.13 |
| w/ UnifiedReward-Think | 68.89 | 50.10 | 68.20 | 35.85 | 23.38 | 3.27 | 6.53 |
| **w/ UnifiedReward-Flex** | **73.95** | **51.37** | **69.62** | **36.25** | **23.42** | **3.31** | **6.56** |

#### Table 4: T2V GRPO — VBench 全维度（Wan2.1-T2V-14B）

**Quality 维度（7个）：**

| 模型 | Subject Consist. | BG Consist. | Aesthetic | Imaging Q | Temporal Flicker | Motion Smooth | Dynamic Degree | Human Action |
|------|-----------------|-------------|-----------|-----------|-----------------|--------------|----------------|-------------|
| Wan2.1-T2V-14B | 96.6 | 97.6 | 62.4 | 64.9 | 99.2 | 98.5 | 58.6 | 79.4 |
| w/ VideoReward | 96.7 | 97.9 | 62.9 | 66.5 | 99.3 | 98.5 | 41.6 | 78.2 |
| w/ UR-Think | 96.4 | 97.7 | 63.9 | 65.2 | **99.4** | 98.4 | 58.3 | 78.4 |
| **w/ Flex** | **96.9** | **97.8** | **65.1** | **66.9** | 99.3 | **99.0** | **70.8** | **79.9** |

**Semantic 维度（7个）：**

| 模型 | Color | Spatial Rel. | Scene | Temporal Style | Overall Consist. | Object Class | Multiple Obj. | Appearance Style |
|------|-------|-------------|-------|---------------|-----------------|-------------|--------------|-----------------|
| Wan2.1-T2V-14B | 87.7 | 72.6 | 28.8 | 23.6 | 25.1 | 79.1 | 61.8 | 22.2 |
| w/ VideoReward | 87.8 | 77.0 | 28.2 | 23.7 | 25.3 | 82.1 | 70.2 | 21.0 |
| w/ UR-Think | 86.1 | 77.3 | 27.2 | 23.8 | 25.4 | 78.4 | 63.0 | 22.3 |
| **w/ Flex** | **89.6** | **80.8** | **30.5** | **24.2** | **25.6** | **83.2** | **70.6** | **22.4** |

**关键发现：** Dynamic Degree 从 58.6 → 70.8（+12.2）提升最大；VideoReward 反而导致 Dynamic Degree 下降到 41.6。Spatial Relationship 从 72.6 → 80.8（+8.2）。

#### Table 6: 模型规模 Scaling

| 模型 | GenAI-Bench (Image) | MMRB2 | GenAI-Bench (Video) | MJBench (Video) |
|------|-------------------|-------|-------------------|----------------|
| Flex-2B | 70.3 | 64.6 | 77.5 | 65.2 |
| Flex-4B | 72.1 | 68.5 | 80.2 | 67.8 |
| Flex-8B | 73.4 | 69.2 | 82.5 | 72.0 |
| Flex-32B | **74.8** | **69.9** | **82.8** | 71.3 |

2B 已有竞争力，scaling 增益平滑而非突变，说明核心优势来自动态评估机制而非模型规模。

#### Table 7: 跨生成器泛化（UniGenBench）

| 模型 | Overall | Style | World Know. | ... | Logic.Reason. | Layout | Text |
|------|---------|-------|------------|-----|--------------|--------|------|
| FLUX.1-dev | 59.39 | 85.10 | 85.92 | ... | 24.77 | 70.52 | 32.18 |
| w/ Flex | **73.95** | **90.30** | 89.87 | ... | **46.59** | **79.66** | **59.20** |
| FLUX.2-klein-9B | 78.93 | 97.50 | 91.61 | ... | 53.41 | 88.43 | 55.75 |
| w/ Flex | **81.54** | **97.60** | **91.93** | ... | **58.64** | **88.43** | **69.54** |

Flex 在 FLUX.2-klein-9B 上也有效：+2.61 overall，Text +13.79 最显著。

#### Table 10: 训练效率对比（秒/步）

| 模型 | PickScore | HPSv3 | UnifiedReward | VideoReward | UR-Think | **UR-Flex** |
|------|-----------|-------|--------------|-------------|----------|------------|
| FLUX.1-dev | 102s | 103s | 109s | — | 124s | **143s** |
| Wan2.1-T2V-14B | — | — | — | 285s | 328s | **336s** |

Flex 比 Think 慢 ~15%（143s vs 124s），因为动态维度比固定维度需要更多推理 token。

### Ablation 详解

#### DPO 对齐效果（Table 1 中的消融行）

| 配置 | Image GenAI | Image MMRB2 | Video GenAI | Video MJBench |
|------|------------|------------|------------|--------------|
| SFT only (w/o DPO) | 71.5 | 67.5 | 79.4 | 69.1 |
| + DPO (correctness only) | 72.0 | 68.4 | 80.6 | 70.3 |
| **+ DPO (full, w/ trajectory pref)** | **73.4** | **69.2** | **82.5** | **72.0** |

轨迹质量偏好（Both correct 情况下的 DPO）贡献：Image MMRB2 +0.8，Video MJBench +1.7。证明仅靠正确性不够，推理过程质量同样重要。

#### $\alpha$ 超参数分析（Table 5）

**T2I（FLUX.1-dev）：**

| $\alpha$ | UniGenBench | T2I-CompBench | UnifiedReward |
|----------|------------|--------------|--------------|
| 0 (仅 $R_{\text{overall}}$) | 71.13 | 50.32 | 3.25 |
| 0.3 | 72.50 | 50.42 | 3.23 |
| 0.5 | 73.10 | 50.90 | 3.29 |
| 1.0 (仅 $\bar{R}_{\text{dim}}$) | 73.44 | **51.59** | 3.26 |
| **0.7 (Ours)** | **73.95** | 51.37 | **3.31** |

**T2V（Wan2.1-T2V-14B）：**

| $\alpha$ | Total | Semantic | Quality |
|----------|-------|----------|---------|
| 0 (仅 $R_{\text{overall}}$) | 82.46 | 71.79 | 85.13 |
| 0.3 | 82.56 | 72.11 | 85.17 |
| 0.5 | 82.82 | 72.34 | 85.44 |
| 1.0 (仅 $\bar{R}_{\text{dim}}$) | 82.89 | **72.42** | 85.51 |
| **0.7 (Ours)** | **83.08** | 72.94 | **85.62** |

$\alpha = 0$ 最差（忽略维度细节），$\alpha = 1$ 次优（忽略全局偏好），$\alpha = 0.7$ 最优——维度级和全局信号互补。

### 系列演进定位

```
UnifiedReward (2025-03)         → 统一四任务评估，证明跨任务互利
  局限：直接打分，无推理
        ↓
UnifiedReward-Think (2025-05)   → CoT 推理 + GRPO，可解释性
  局限：固定维度，one-size-fits-all
        ↓
UnifiedReward-Flex (2026-02)    → 动态个性化层级 + 多维 GRPO
  Trade-off：放弃理解任务覆盖，换取生成评估深度
```

**系列演进逻辑：统一评估 → 推理可解释 → 个性化灵活**

关键 trade-off：Flex 放弃理解任务覆盖是一个深思熟虑的决策——聚焦生成评估的"深度"而非"广度"，换取更精细的内容自适应能力。

### 总结

Flex 的核心贡献是**动态评估维度**——从固定的 one-size-fits-all 维度集升级为根据内容自动构建的层级评估结构。Pref-GRPO 的多维胜率设计（$\alpha=0.7$ 平衡维度级与总体信号）确保了下游优化的均衡性。与 RaR 的 rubric-based 思路异曲同工：都在探索**结构化、可分解的评估范式**。

## 🔗 相关论文

**基于/改进自：** [[UnifiedReward-Think]] → [[UnifiedReward]]

**前代版本：** [[UnifiedReward]] (2025-03) → [[UnifiedReward-Think]] (2025-05)

**同方向：** [[HPSv3]], [[RaR]], [[VisionReward]]

---
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

> 注：arxiv HTML 尚不可用（2026-02 新论文），部分细节来自 abs + 对比报告。

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

输出结构化评估轨迹 $y^T = \langle H, R, W \rangle$：
- $H = \{(d_k, S_{i,k})\}_{k=1}^{K}$（实例化维度及子维度）
- $R$ = 基于证据的推理轨迹
- $W = \{w_k\}_{k=1}^{K}, w$（各维度优胜标签 + 总优胜标签）

#### 2. Stage 1: Reasoning Distillation (SFT)

从闭源 VLM 蒸馏结构化评估轨迹：

$$\mathcal{L}_{\text{SFT}}(\theta) = -\sum_{i=1}^{N} \sum_{t=1}^{|y_i^T|} \log p_\theta(y_{i,t}^T | x_i, y_{i,<t}^T)$$

训练数据：**UnifiedReward-Flex-SFT-90K**（90K 样本，1.39M tokens）

#### 3. Stage 2: DPO 对齐

对每个输入采样两个评估轨迹，构建偏好对：
- 一个正确一个错误 → 偏好正确的
- 两个都正确 → 用闭源 judge 基于**轨迹级偏好**排序（优先选择更灵活的层级结构）

$$\mathcal{L}_{\text{DPO}}(\theta) = -\mathbb{E}\left[\log \sigma\left(\beta_{\text{dpo}} \left(\log \frac{\pi_\theta(y^+|x)}{\pi_{\text{ref}}(y^+|x)} - \log \frac{\pi_\theta(y^-|x)}{\pi_{\text{ref}}(y^-|x)}\right)\right)\right]$$

关键创新：即使两个轨迹都"正确"（最终判断一致），仍可通过轨迹质量偏好进一步提升评估能力。

#### 4. Pref-GRPO（下游生成模型优化）

传统 GRPO 用单一标量 reward。Flex 提出**多维胜率**：

维度级胜率：$R_d(x_{i0}, c) = \frac{1}{G-1} \sum_{j \neq i} \mathbb{1}[x_{i0} \succ_d x_{j0}]$

平均维度胜率：$\bar{R}_{\text{dim}} = \frac{1}{D} \sum_{d=1}^{D} R_d$

最终优势函数：

$$\hat{A}_i = \alpha \hat{A}_i^{\text{dim}} + (1 - \alpha) \hat{A}_i^{\text{overall}}, \quad \alpha = 0.7$$

$\alpha = 0.7$ 表示维度级信号权重更大，鼓励多维度均衡提升而非只优化总体分数。

### 关键结果

#### RM 评估

| 基准 | vs UnifiedReward-Think |
|------|----------------------|
| MMRB2 | **+3.2** |
| GenAI-Bench Video | **+2.2** |

#### T2I GRPO 优化（FLUX.1-dev）

| 基准 | vs Baseline | vs Think |
|------|-----------|----------|
| UniGenBench | **+14.56** | **+5.06** |

#### T2V GRPO 优化（Wan2.1-T2V-14B, VBench）

| 指标 | Baseline | + Flex |
|------|----------|--------|
| Dynamic Degree | 58.6 | **70.8** (+12.2) |
| Spatial Relationship | 72.6 | **80.8** (+8.2) |
| Color | 87.7 | **89.6** (+1.9) |

### Ablation

- DPO 对齐即使在两个轨迹都正确时也有收益（轨迹质量偏好）
- $\alpha = 0.7$ 为最优平衡点

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

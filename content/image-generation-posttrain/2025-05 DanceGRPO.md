---
title: "DanceGRPO: Unleashing GRPO on Visual Generation"
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
  - bytedance
  - hku
  - modality/image
  - modality/video
  - modality/text
institution: "ByteDance Seed / The University of Hong Kong"
notion_topic: "视觉生成GRPO"
added: "2026-03-15"
rating: ""
aliases:
  - "DanceGRPO"
extends: []
baseline:
  - "[[DDPO]]"
  - "[[DPOK]]"
  - "[[ReFL]]"
related_topic:
  - "[[Diffusion-DPO]]"
  - "[[RewardDance]]"
---

# DanceGRPO

## 📌 核心贡献

> 首次将组相对策略优化（GRPO）引入视觉生成领域，统一支持扩散模型和整流流两种范式，在图像生成（T2I）、文本生成视频（T2V）和图像生成视频（I2V）三大任务上实现了最高 181% 的性能提升，是第一个将 GRPO 应用于视觉生成的工作。

## 📖 摘要

Recent advances in generative AI have revolutionized visual content creation, yet aligning model outputs with human preferences remains a critical challenge. While Reinforcement Learning (RL) has emerged as a promising approach for fine-tuning generative models, existing methods like DDPO and DPOK face fundamental limitations - particularly their inability to maintain stable optimization when scaling to large and diverse prompt sets, severely restricting their practical utility. This paper presents DanceGRPO, a framework that addresses these limitations through an innovative adaptation of Group Relative Policy Optimization (GRPO) for visual generation tasks. Our key insight is that GRPO's inherent stability mechanisms uniquely position it to overcome the optimization challenges that plague prior RL-based approaches on visual generation. DanceGRPO establishes several significant advances: First, it demonstrates consistent and stable policy optimization across multiple modern generative paradigms, including both diffusion models and rectified flows. Second, it maintains robust performance when scaling to complex, real-world scenarios encompassing three key tasks and four foundation models. Third, it shows remarkable versatility in optimizing for diverse human preferences as captured by five distinct reward models assessing image/video aesthetics, text-image alignment, video motion quality, and binary feedback. Our comprehensive experiments reveal that DanceGRPO outperforms baseline methods by up to 181% across multiple established benchmarks, including HPS-v2.1, CLIP Score, VideoAlign, and GenEval.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | ByteDance Seed / The University of Hong Kong |
| 发表 | 2025-05-12 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2505.07818) |

## 📝 我的笔记

### 动机与问题

现有 RL 方法（DDPO、DPOK）在大规模多样化提示词上优化不稳定，实际应用受限。DanceGRPO 将 LLM 领域中 DeepSeek-R1 使用的 GRPO 算法迁移到视觉生成，利用组内相对优势估计消除对 Critic 模型的依赖。

### 核心方法

**1. 统一 SDE 框架**

将扩散模型和整流流的采样过程统一建模为马尔可夫决策过程。对于扩散模型，反向 SDE 为：

$$d\mathbf{z}_t = \left(f_t\mathbf{z}_t - \frac{1+\varepsilon_t^2}{2}g_t^2\nabla\log p_t(\mathbf{z}_t)\right)dt + \varepsilon_t g_t d\mathbf{w}$$

对于整流流，引入随机性的类比 SDE：

$$d\mathbf{z}_t = \left(\mathbf{u}_t - \frac{\varepsilon_t^2}{2}\nabla\log p_t(\mathbf{z}_t)\right)dt + \varepsilon_t d\mathbf{w}$$

**2. GRPO 目标函数**

$$J(\theta) = \mathbb{E}\left[\frac{1}{G}\sum_i \frac{1}{T}\sum_t \min\left(\rho_{t,i}A_i, \text{clip}(\rho_{t,i}, 1-\varepsilon, 1+\varepsilon)A_i\right)\right]$$

其中优势函数通过组内归一化计算：$A_i = (r_i - \text{mean}(r)) / \text{std}(r)$

**3. 关键设计选择**

- **共享初始化噪声**：同一提示词组内的样本共享初始噪声，防止 reward hacking
- **选择性时间步丢弃**：40% 的时间步被随机跳过，提升计算效率
- **多奖励优势聚合**：聚合多个奖励函数的优势值而非直接组合奖励分数
- **噪声水平**：$\varepsilon_t = 0.3$ 以保持训练稳定性

### 关键实验结果

**Text-to-Image（Stable Diffusion）：**

| 指标 | Baseline | DanceGRPO | 提升 |
|------|----------|-----------|------|
| HPS-v2.1 | 0.239 | 0.365 | +53% |
| CLIP Score | 0.363 | 0.395 | +9% |
| GenEval | 0.421 | 0.522 | +24% |

**Text-to-Video（HunyuanVideo）：**

| 指标 | Baseline | DanceGRPO | 提升 |
|------|----------|-----------|------|
| Visual Quality | — | — | +56% |
| Motion Quality | 1.37 | 3.85 | +181% |

**Image-to-Video（SkyReels-I2V）：**

| 指标 | 提升 |
|------|------|
| Motion Quality | +118% |

### 总结

DanceGRPO 是首个将 GRPO 引入视觉生成的工作，核心优势在于 GRPO 的组内相对评估机制天然适合视觉生成的高方差奖励环境。框架同时支持扩散模型和整流流，覆盖 T2I/T2V/I2V 三类任务，展示了极强的通用性。共享噪声初始化和多奖励优势聚合是避免 reward hacking 的关键设计。

## 🔗 相关论文

**基于/改进自：** --

**同方向：** [[DDPO]], [[Diffusion-DPO]], [[RewardDance]]

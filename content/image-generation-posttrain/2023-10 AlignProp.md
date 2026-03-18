---
title: "Aligning Text-to-Image Diffusion Models with Reward Backpropagation"
arxiv_id: "2310.03739"
arxiv_url: "https://arxiv.org/abs/2310.03739"
authors:
  - "Mihir Prabhudesai"
  - "Anirudh Goyal"
  - "Deepak Pathak"
  - "Katerina Fragkiadaki"
published: "2023-10-05"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.LG"
  - "cs.RO"
tags:
  - paper
  - image-generation-posttrain
  - cmu
  - google-deepmind
  - modality/image
  - modality/text
institution: "Carnegie Mellon University / Google DeepMind"
notion_topic: "奖励反向传播"
added: "2026-03-15"
rating: ""
aliases:
  - "AlignProp"
extends:
  - "[[ReFL]]"
baseline:
  - "[[DDPO]]"
related_topic:
  - "[[Diffusion-DPO]]"
  - "[[ImageReward]]"
---

# AlignProp

## 📌 核心贡献

> 提出通过端到端反向传播奖励梯度穿过整个扩散去噪过程来对齐扩散模型，结合 LoRA 和梯度检查点技术解决显存瓶颈，并引入随机截断反向传播（RTBP）防止模式坍塌，相比 RL 方法实现 25 倍训练加速。

## 📖 摘要

Text-to-image diffusion models have recently emerged at the forefront of image generation, powered by very large-scale unsupervised or weakly supervised text-to-image training datasets. Due to their unsupervised training, controlling their behavior in downstream tasks, such as maximizing human-perceived image quality, image-text alignment, or ethical image generation, is difficult. Recent works finetune diffusion models to downstream reward functions using vanilla reinforcement learning, notorious for the high variance of the gradient estimators. In this paper, we propose AlignProp, a method that aligns diffusion models to downstream reward functions using end-to-end backpropagation of the reward gradient through the denoising process. While naive implementation of such backpropagation would require prohibitive memory resources for storing the partial derivatives of modern text-to-image models, AlignProp finetunes low-rank adapter weight modules and uses gradient checkpointing, to render its memory usage viable. We test AlignProp in finetuning diffusion models to various objectives, such as image-text semantic alignment, aesthetics, compressibility and controllability of the number of objects present, as well as their combinations. We show AlignProp achieves higher rewards in fewer training steps than alternatives, while being conceptually simpler, making it a straightforward choice for optimizing diffusion models for differentiable reward functions of interest.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Carnegie Mellon University / Google DeepMind |
| 发表 | 2023-10-05 |
| 分类 | cs.CV, cs.AI, cs.LG, cs.RO |
| 链接 | [arXiv](https://arxiv.org/abs/2310.03739) |

## 📝 我的笔记

### 动机与问题

基于 RL 的扩散模型微调方法（如 DDPO）使用策略梯度估计，方差高、样本效率低。AlignProp 的核心思路是：既然奖励模型是可微的，就应该直接将奖励梯度反向传播穿过去噪链，而不是用 RL 来估计梯度。但直接反传面临 50 步 UNet 前向传播的显存瓶颈。

### 核心方法

**1. 将去噪链视为可微策略**

AlignProp 将条件图像去噪过程视为一个可微的循环策略，优化目标：

$$\mathcal{L}_{\text{align}}(\theta; \mathcal{P}) = -\frac{1}{|\mathcal{P}|}\sum_i R_\phi(\pi_\theta(x_T, c^i))$$

其中 $\pi_\theta$ 表示从噪声 $x_T$ 到生成图像的完整去噪链。

**2. 随机截断反向传播（RTBP）**

为防止模式坍塌，随机采样截断长度 $K \sim \text{Uniform}(0, 50)$，只反传最后 K 步的梯度：

$$\hat{\nabla}_\theta \mathcal{L} = \frac{\partial \mathcal{L}}{\partial \theta} + \sum_{k=0}^{K}\frac{\partial \mathcal{L}}{\partial x_k}\frac{\partial x_k}{\partial \theta}$$

随机化的截断长度比固定截断更能避免过拟合到特定去噪阶段。

**3. 显存优化**

- **LoRA 适配**：冻结预训练权重，注入低秩矩阵 $h = W_0 x + BAx$，将可训练参数从 800M 降至 800K
- **梯度检查点**：每步只存储 latent 输入，反向传播时重新计算 UNet 激活

### 关键实验结果

**奖励优化对比：**

| 指标 | AlignProp | DDPO | Baseline |
|------|-----------|------|----------|
| Animals (Train Reward) | 8.94 | 7.18 | 5.73 |
| Animals (Test Reward) | 8.71 | 6.82 | 5.64 |
| HPS v2 (Train) | 3.30 | 2.87 | 2.74 |
| HPS v2 (Test) | 3.32 | 2.93 | 2.86 |

**训练效率：**

AlignProp 在 48 分钟内达到 HPS 奖励 2.8，而 DDPO 需要约 23 小时（4 x A100 GPUs），实现约 25 倍加速。

**人类偏好研究（500 对对比）：**

| 维度 | AlignProp 偏好 | Baseline 偏好 |
|------|---------------|--------------|
| 保真度 | 79.2% | 20.8% |
| 图文对齐 | 65.6% | 34.4% |

**Ablation（HPS v2 奖励）：**

| 配置 | 奖励值 |
|------|--------|
| K=1 | 2.91 |
| K=10 | 3.14 |
| Full RTBP | **3.30** |
| Without LoRA | 3.09 |

### 总结

AlignProp 的核心贡献在于将扩散模型对齐简化为标准的可微优化问题，避免了 RL 的高方差问题。RTBP 通过随机化截断长度兼顾了效率和多样性。该方法与 DRaFT 思路相似但独立提出，后续被 arXiv:2407.08737 所取代整合。

## 🔗 相关论文

**基于/改进自：** [[DDPO]], [[ImageReward]]

**同方向：** [[Diffusion-DPO]], [[ReFL]]

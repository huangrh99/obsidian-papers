---
arxiv_id: "2311.12908"
arxiv_url: "https://arxiv.org/abs/2311.12908"
authors:
  - "Bram Wallace"
  - "Meihua Dang"
  - "Rafael Rafailov"
  - "Linqi Zhou"
  - "Aaron Lou"
  - "Senthil Purushwalkam"
  - "Stefano Ermon"
  - "Caiming Xiong"
  - "Shafiq Joty"
  - "Nikhil Naik"
published: "2023-11-21"
categories:
  - "cs.CV"
  - "cs.AI"
  - "cs.GR"
  - "cs.LG"
tags:
  - paper
  - image-generation-posttrain
  - salesforce
  - stanford
  - modality/image
  - modality/text
institution: "Salesforce AI Research / Stanford University"
notion_topic: "扩散模型偏好优化"
added: "2026-03-14"
rating: ""
aliases:
  - "Diffusion-DPO"
extends:
  - "[[DPO]]"
baseline:
  - "[[SDXL]]"
related_topic:
  - "[[PickScore]]"
  - "[[Pick-a-Pic]]"
  - "[[DDPO]]"
---

# Diffusion-DPO

## 📌 核心贡献

> 将 LLM 领域的 DPO 算法适配至扩散模型，通过 ELBO 推导出可微的偏好优化目标函数，无需训练显式奖励模型即可直接利用人类偏好数据对齐扩散模型。使用 Pick-a-Pic 数据集微调 SDXL-1.0 base 模型后，仅 3.5B 参数即超越 6.6B 的 SDXL base+refiner pipeline。

## 📖 摘要

Large language models (LLMs) are fine-tuned using human comparison data with Reinforcement Learning from Human Feedback (RLHF) methods to make them better aligned with users' preferences. In contrast to LLMs, human preference learning has not been widely explored in text-to-image diffusion models; the best existing approach is to fine-tune a pretrained model using carefully curated high quality images and captions to improve visual appeal and text alignment. We propose Diffusion-DPO, a method to align diffusion models to human preferences by directly optimizing on human comparison data. Diffusion-DPO is adapted from the recently developed Direct Preference Optimization (DPO), a simpler alternative to RLHF which directly optimizes a policy that best satisfies human preferences under a classification objective. We re-formulate DPO to account for a diffusion model notion of likelihood, utilizing the evidence lower bound to derive a differentiable objective. Using the Pick-a-Pic dataset of 851K crowdsourced pairwise preferences, we fine-tune the base model of the state-of-the-art Stable Diffusion XL (SDXL)-1.0 model with Diffusion-DPO. Our fine-tuned base model significantly outperforms both base SDXL-1.0 and the larger SDXL-1.0 model consisting of an additional refinement model in human evaluation, improving visual appeal and prompt alignment. We also develop a variant that uses AI feedback and has comparable performance to training on human preferences, opening the door for scaling of diffusion model alignment methods.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Salesforce AI Research / Stanford University |
| 发表 | 2023-11-21 |
| 分类 | cs.CV, cs.AI, cs.GR, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2311.12908) |

## 📝 我的笔记

### 动机与问题定义

LLM 领域已广泛使用 RLHF/DPO 进行人类偏好对齐，但文本到图像扩散模型的偏好学习尚未充分探索。现有方法（如 DDPO）基于策略梯度，需要在线采样且不稳定；DRaFT/AlignProp 通过可微奖励模型反向传播，但受限于特定奖励函数。本文的核心问题是：**能否将 DPO 的简洁框架直接迁移到扩散模型？**

关键挑战在于扩散模型的似然函数与 LLM 根本不同——扩散模型通过多步去噪过程隐式定义数据分布，无法直接计算 $p_\theta(x_0|c)$。

### 方法

![Diffusion-DPO 损失面可视化：损失通过改善 preferred 样本的去噪同时恶化 rejected 样本的去噪来下降，beta 越大曲率越大](../assets/Diffusion-DPO/fig2-loss-surface.png)

#### 从 DPO 到 Diffusion-DPO 的推导

**第一步：标准 DPO 目标。** 对于 LLM，DPO 直接优化策略：

$$\mathcal{L}_{\text{DPO}}(\theta) = -\mathbb{E}_{c, x_0^w, x_0^l} \left[ \log \sigma \left( \beta \log \frac{p_\theta(x_0^w|c)}{p_{\text{ref}}(x_0^w|c)} - \beta \log \frac{p_\theta(x_0^l|c)}{p_{\text{ref}}(x_0^l|c)} \right) \right]$$

其中 $x_0^w$ 和 $x_0^l$ 分别为 preferred 和 rejected 样本。

**第二步：扩散模型似然的 ELBO 替代。** 扩散模型无法直接计算 $p_\theta(x_0|c)$，但可以通过 ELBO 给出下界。作者将奖励定义在完整的扩散路径上：

$$r(c, x_0) = \mathbb{E}_{p_\theta(x_{1:T}|x_0, c)} [R(c, x_{0:T})]$$

RLHF 目标带 KL 正则化：

$$\max_{p_\theta} \mathbb{E}_{c \sim \mathcal{D}_c, x_{0:T} \sim p_\theta} [r(c, x_0)] - \beta D_{\text{KL}} [p_\theta(x_{0:T}|c) \| p_{\text{ref}}(x_{0:T}|c)]$$

最优策略形式：

$$p_\theta^*(x_0|c) = \frac{p_{\text{ref}}(x_0|c) \exp(r(c, x_0)/\beta)}{Z(c)}$$

**第三步：利用 Jensen 不等式得到可优化上界。** 通过对每个去噪步独立采样 $t \sim U(0, T)$ 并应用 Jensen 不等式，得到上界：

$$\mathcal{L}_{\text{DPO-Diffusion}}(\theta) \leq -\mathbb{E} \left[ \log \sigma \left( \beta T \log \frac{p_\theta(x_{t-1}^w|x_t^w)}{p_{\text{ref}}(x_{t-1}^w|x_t^w)} - \beta T \log \frac{p_\theta(x_{t-1}^l|x_t^l)}{p_{\text{ref}}(x_{t-1}^l|x_t^l)} \right) \right]$$

**第四步：最终可计算的损失函数。** 将去噪概率展开为高斯噪声预测误差的形式，得到最终 Diffusion-DPO 损失：

$$\mathcal{L}(\theta) = -\mathbb{E}_{(x_0^w, x_0^l) \sim \mathcal{D},\; t \sim U(0,T)} \left[ \log \sigma \left( -\beta T \omega(\lambda_t) \left( \| \varepsilon^w - \varepsilon_\theta(x_t^w, t) \|_2^2 - \| \varepsilon^w - \varepsilon_{\text{ref}}(x_t^w, t) \|_2^2 - \| \varepsilon^l - \varepsilon_\theta(x_t^l, t) \|_2^2 + \| \varepsilon^l - \varepsilon_{\text{ref}}(x_t^l, t) \|_2^2 \right) \right) \right]$$

其中 $\omega(\lambda_t)$ 是基于信噪比 $\lambda_t = \alpha_t^2 / \sigma_t^2$ 的加权函数（实践中设为常数），$T$ 被吸收进 $\beta$。

**直觉解读：** 损失鼓励模型在 preferred 样本上比参考模型去噪得更好（降低 $\| \varepsilon^w - \varepsilon_\theta \|$），同时在 rejected 样本上去噪得更差（增大 $\| \varepsilon^l - \varepsilon_\theta \|$）。

#### 训练细节

| 参数 | 值 |
|------|-----|
| 优化器 | AdamW (SD1.5) / Adafactor (SDXL) |
| 有效 batch size | 2048 对 |
| 本地 batch | 1 对，梯度累积 128 步 |
| 硬件 | 16x NVIDIA A100 |
| 学习率 | $2000/\beta \times 2.048 \times 10^{-8}$ |
| Warmup | 25% 线性 |
| $\beta$ | SD1.5: 2000, SDXL: 5000 |
| 扩散步数 $T$ | 1000 |

#### 数据集：Pick-a-Pic v2

- 851,293 对配对偏好数据（排除约 12% 平局）
- 58,960 个唯一 prompt
- 由 Pick-a-Pic Web 应用众包收集
- 生成模型：SDXL-beta 和 Dreamlike（微调 SD1.5）
- 验证集：500 个唯一 prompt

### 关键实验结果

![人类评估结果和定性对比：DPO-SDXL 在 PartiPrompts 和 HPSv2 基准上显著优于 SDXL baseline](../assets/Diffusion-DPO/fig3-human-evaluation.png)

#### DPO-SDXL vs SDXL base（人类评估）

| 基准 | 通用偏好 | 视觉吸引力 | Prompt 对齐 |
|------|----------|-----------|------------|
| PartiPrompts (1632 captions) | **70.0%** | ~70% | ~70% |
| HPSv2 (3200 captions) | **64.7%** | — | — |

#### DPO-SDXL (3.5B) vs SDXL base+refiner (6.6B)

| 基准 | 通用偏好胜率 |
|------|-------------|
| PartiPrompts | **69%** |
| HPSv2 | **64%** |
| PartiPrompts People 类别 | **67.2%** |

关键发现：仅 3.5B 参数的 DPO-SDXL base 模型显著超越了 6.6B 参数的 SDXL base+refiner 完整 pipeline。

#### 图像编辑（TEdBench, SDEdit）

| 偏好 | 比例 |
|------|------|
| DPO-SDXL | **65%** |
| SDXL | 24% |
| 平局 | 11% |

#### 隐式奖励模型精度

| 模型 | Pick-a-Pic 偏好预测准确率 |
|------|--------------------------|
| DPO-SDXL | **72.0%** |
| PickScore v1 | 64.2% |
| HPS | 59.3% |
| CLIP | 57.1% |
| Aesthetics | 51.4% |
| DPO-SD1.5 | 60.8% |

DPO 训练后的模型本身即可作为高精度的偏好预测器，甚至超越专门训练的 PickScore。

### AI Feedback 变体

使用预训练评分网络（PickScore、HPSv2、CLIP、Aesthetic Predictor）替代人类标注，对生成的图像对进行自动排序。

- SD1.5 + PickScore 伪标签：胜率 **63.3%**（vs 人类标签 59.8%）
- 本文是首个能通过 CLIP 奖励稳定训练文本-图像对齐的扩散对齐方法（DRaFT 在 CLIP 奖励上失败）

### Ablation 分析

- **$\beta$ 范围：** 最优区间 $[2000, 5000]$，SD1.5 用 2000，SDXL 用 5000
- **SFT 对比：** SD1.5 上 SFT 获得 55.5% 胜率，但 SDXL 上 SFT 反而降低性能（因为 SDXL 本身质量已超过 Pick-a-Pic 训练数据）。DPO 在高质量基线模型上优势更明显

### 总结性评价

Diffusion-DPO 是将 DPO 迁移到扩散模型的开创性工作，理论推导严谨（ELBO 上界），实验效果显著。核心贡献在于绕过了扩散模型似然不可计算的难题，将多步去噪过程的偏好学习归约为单步噪声预测误差的对比。方法简洁高效，不需要在线采样或训练额外的奖励模型。后续大量工作（DenseDPO、Flow-GRPO 等）均基于该框架发展。

## 🔗 相关论文

**基于/改进自：** [[DPO]]

**同方向：** [[PickScore]], [[Pick-a-Pic]], [[DDPO]]

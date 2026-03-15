# UnifiedReward 系列论文深度对比分析

> 本报告按时间线梳理 UnifiedReward 系列三篇论文的技术演进，提供详细方法对比与定量结果汇总。

---

## 一、论文概览

| 属性 | UnifiedReward | UnifiedReward-Think | UnifiedReward-Flex |
|------|--------------|--------------------|--------------------|
| 时间 | 2025-03-07 | 2025-05-06 | 2026-02-02 |
| arXiv | [2503.05236](https://arxiv.org/abs/2503.05236) | [2505.03318](https://arxiv.org/abs/2505.03318) | [2602.02380](https://arxiv.org/abs/2602.02380) |
| 标题 | Unified Reward Model for Multimodal Understanding and Generation | Unified Multimodal Chain-of-Thought Reward Model through Reinforcement Fine-Tuning | Unified Personalized Reward Model for Vision Generation |
| 作者 | Yibin Wang, Yuhang Zang, Hao Li, Cheng Jin, Jiaqi Wang | Yibin Wang, Zhimin Li, Yuhang Zang, Chunyu Wang, Qinglin Lu, Cheng Jin, Jiaqi Wang | Yibin Wang, Yuhang Zang, Feng Han, Jiazi Bu, Yujie Zhou, Cheng Jin, Jiaqi Wang |
| 机构 | Fudan & Shanghai AI Lab | Fudan & Shanghai AI Lab & Tencent Hunyuan | Fudan & Shanghai Innovation Inst. & SJTU & Shanghai AI Lab |
| 基座模型 | LLaVA-OneVision 7B | LLaVA-OneVision 7B | Qwen3-VL (2B/4B/8B/32B) |
| 覆盖范围 | 图像+视频 理解+生成 | 图像+视频 理解+生成 | 视觉生成（图像+视频） |
| 项目页 | [link](https://codegoat24.github.io/UnifiedReward/) | [link](https://codegoat24.github.io/UnifiedReward/) | [link](https://codegoat24.github.io/UnifiedReward/flex) |

---

## 二、逐篇详细分析

---

### Paper 1: UnifiedReward (2025-03)

#### 核心改进点

作为系列开山之作，提出**首个统一多模态奖励模型**，核心洞察：**理解与生成评估能力存在互利关系，联合训练优于单独训练**。

#### 方法细节

**输入/输出设计：**
- 生成评估：视觉 tokens + 指令 + caption -> 得分/排名
- 理解评估：视觉 tokens + 指令 + 问题 + 回答 -> 评价

**双模式评估：**
- **Pairwise Ranking**：输入两个候选，输出 "A is better" / "B is better"
- **Pointwise Scoring**：输入单个候选，输出 1-10 分数

#### 训练管线（三阶段）

**Stage 1：统一奖励模型训练**

数据集（共约 236K 样本）：

| 领域 | 数据集 | 规模 |
|------|--------|------|
| 图像生成 | EvalMuse (3K pair + 32.7K point) + HPD (25.6K pair) + OIP (7.4K) | ~68.7K |
| 图像理解 | LLaVA-Critic (25K pair + 25K point) | ~50K |
| 视频生成 | VideoDPO (10K pair) + LiFT-HRA (20K point) + VideoFeedback (36.6K point) | ~66.6K |
| 视频理解 | ShareGPTVideo (17K pair + 34K point) | ~51K |

训练配置：8x H100，batch size 2，gradient accumulation 16，lr $2.5 \times 10^{-6}$，warm-up ratio 0.3

损失函数：标准 cross-entropy，仅计算预测 answer 部分。

**Stage 2：两阶段偏好数据过滤**

1. **Pair Ranking**：将 N 个候选分为 N/2 对 -> 得到 chosen 集合 C 和 rejected 集合 R
2. **Point Sifting**：对两个集合分别取极值：
   - $O_c^* = \arg\max_{O \in C} S(O)$
   - $O_r^* = \arg\min_{O \in R} S(O)$

**Stage 3：DPO 对齐**

生成侧（扩散模型）DPO 损失：

$$\mathcal{L}(\theta) = -\mathbb{E}\left[\log \sigma\left(-\beta_g T \omega(\lambda_t)\left(\|\epsilon^w - \epsilon_\theta(x_t^w, t)\|^2 - \|\epsilon^w - \epsilon_{\text{ref}}(x_t^w, t)\|^2 - (\|\epsilon^l - \epsilon_\theta(x_t^l, t)\|^2 - \|\epsilon^l - \epsilon_{\text{ref}}(x_t^l, t)\|^2)\right)\right)\right]$$

参数：$\beta_g = 5000$，batch size: SDXL-Turbo (32), T2V-Turbo (16)，3 epochs。

理解侧（VLM）DPO 损失：

$$\mathcal{L}(\theta) = -\mathbb{E}\left[\beta_u \log \sigma\left(\log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)\right]$$

参数：$\beta_u = 0.1$，batch size 1，gradient accumulation 16，lr $5 \times 10^{-7}$。

#### 关键实验结果

**图像理解 (VLRewardBench)：**

| 模型 | General | Halluc. | Reason. | Overall | Macro |
|------|---------|---------|---------|---------|-------|
| GPT-4o | 49.1 | 67.6 | 70.5 | 65.8 | 62.4 |
| LLaVA-Critic | 47.6 | 38.3 | 54.5 | 47.4 | 46.8 |
| **UnifiedReward** | **60.6** | **78.4** | **60.5** | **66.1** | **66.5** |

**图像生成 (GenAI-Bench diff)：** 70.9（超越 PickScore 67.2、HPSv2 68.4）

**视频生成 (GenAI-Bench diff / VideoGen-RB diff)：** 77.2 / 79.3

**跨任务协同增益（关键发现）：**

| 训练配置 | VLRewardBench | ShareGPTVideo | GenAI-Image | GenAI-Video |
|---------|--------------|---------------|-------------|-------------|
| 单任务（原始） | 47.4 | 74.2 | 64.0 | 62.4 |
| 单任务（对齐步数） | 49.0 | 75.5 | 65.0 | 63.1 |
| **UnifiedReward** | **66.1** | **84.0** | **70.9** | **79.3** |

联合训练相比单任务提升幅度：+17.1 / +8.5 / +5.9 / +16.2

---

### Paper 2: UnifiedReward-Think (2025-05)

#### 核心改进点（相比 UnifiedReward）

1. **引入显式 CoT 推理**：模型不再直接输出评分，而是先在 `<think>` 标签内进行多维度逐步推理，再在 `<answer>` 标签内给出结论
2. **三阶段训练从 SFT 升级为蒸馏+RL**：用 GPT-4o 蒸馏冷启动 -> 拒绝采样扩展 -> GRPO 强化微调
3. **可解释性大幅提升**：评估过程透明，可追溯推理链

#### 方法细节

**Stage 1: Cold Start（冷启动蒸馏）**

- 从 HPD、EvalMuse、OIP 中随机抽取 10K 样本
- 用 GPT-4o 生成 CoT 推理蒸馏数据
- 过滤保留与 ground truth 一致的推理轨迹 -> **ImageGen-CoT-Reward-5K**
- 损失函数：

$$\mathcal{L}_{\text{cold start}}(\theta) = -\sum_{i=1}^{T} \log p(y_i | x, y_{<i}; \theta)$$

训练配置：8x H100 (80GB)，batch size 1，gradient accumulation 16，lr $2.5 \times 10^{-6}$

**Stage 2: Rejection Sampling（拒绝采样）**

- 在大规模统一偏好数据上让模型生成 CoT 推理
- 仅保留推理正确（最终答案匹配 GT）的样本进行 SFT
- 目的：将 CoT 能力从图像生成扩展到全部四个领域

数据分布：

| 领域 | 数据集 | 规模 |
|------|--------|------|
| 图像生成 | HPD + OIP + EvalMuse + OpenAI-4o_t2i | ~42.7K |
| 视频生成 | VideoDPO + Text2Video-Human Preferences | ~15.7K |
| 图像理解 | LLaVA-Critic-113K (sampled) | ~30K |
| 视频理解 | ShareGPTVideo-DPO | ~17K |

**Stage 3: GRPO（强化微调）**

利用 Stage 2 中推理错误的样本作为探索空间。

可验证奖励设计：
- **Format Reward** $R_{\text{fmt}} = \mathbb{1}[\text{<think> and <answer> tags present}]$
- **Accuracy Reward** $R_{\text{acc}} = \mathbb{1}[o = \text{ground truth}]$
- **Total** $R = R_{\text{fmt}} + R_{\text{acc}}$

GRPO 损失函数：

$$\mathcal{L}_{\text{GRPO}}(\theta) = \mathbb{E}\left[\min\left(r^{(i)}\hat{A}^{(i)}, \text{clip}(r^{(i)}, 1-\delta, 1+\delta)\hat{A}^{(i)}\right) - \beta \cdot D_{\text{KL}}(\pi_{\theta_{\text{new}}} \| \pi_{\text{ref}})\right]$$

其中优势函数：$\hat{A}^{(i)} = \frac{R^{(i)} - \text{mean}(\{R^{(1)}, \ldots, R^{(N)}\})}{\text{std}(\{R^{(1)}, \ldots, R^{(N)}\})}$

超参数：N=8（采样数），$\beta = 0.04$（KL 惩罚），lr $1 \times 10^{-6}$，64x H20 GPUs (97GB)

**多维度评估维度：**

| 任务 | 评估维度 |
|------|---------|
| 图像生成 | 语义一致性、美学、真实性 |
| 视频生成 | 语义一致性、时序连贯性、真实性 |
| 图像/视频理解 | 语义准确性、事实正确性、清晰度 |

#### 关键实验结果

**图像理解 (VLRewardBench)：**

| 模型 | General | Halluc. | Reason. | Overall | Macro |
|------|---------|---------|---------|---------|-------|
| UnifiedReward | 76.5 | 58.1 | 65.1 | 67.5 | 66.6 |
| UnifiedReward-Think (w/o CoT) | 77.9 | 70.5 | 65.4 | 73.1 | 71.3 |
| **UnifiedReward-Think** | **78.1** | **72.7** | **66.0** | **73.8** | **72.3** |

**生成评估提升 (diff 指标)：**

| 基准 | UnifiedReward | UnifiedReward-Think |
|------|--------------|-------------------|
| GenAI-Bench Image | 70.9 | **72.5** (+1.6) |
| GenAI-Bench Video | 77.2 | **82.3** (+5.1) |
| VideoGen-RB | 79.3 | **80.5** (+1.2) |

**Ablation（阶段贡献分析）：**

| 训练配置 | VLRewardBench Overall |
|---------|---------------------|
| UnifiedReward baseline | 67.5 |
| + GRPO (w/o CoT) | 69.0 |
| + Cold Start only | 66.9 |
| + Rejection Sampling | 72.1 |
| **+ GRPO (full)** | **73.8** |

GRPO 阶段贡献最大（+1.7 vs Rejection Sampling），验证了 RL fine-tuning 对推理能力的关键作用。

---

### Paper 3: UnifiedReward-Flex (2026-02)

#### 核心改进点（相比 UnifiedReward-Think）

1. **从固定评估维度到动态个性化维度**：不再使用预定义的固定维度集，而是根据具体内容动态生成评估层级
2. **层级化评估架构**：预定义锚点维度（语义对齐、视觉质量、美学）+ 自动生成的上下文特定维度（叙事性、动作动态、物理合理性等）
3. **聚焦视觉生成**：不再覆盖理解任务，专注于图像和视频生成的个性化评估
4. **升级基座模型**：从 LLaVA-OneVision 切换到 Qwen3-VL 系列（2B/4B/8B/32B）
5. **个性化 GRPO 奖励**：提出基于维度粒度的多维偏好奖励，而非单一标量奖励

#### 方法细节

**层级化动态评估流程：**

给定 prompt 和生成的视觉内容：
1. **语义意图解析**：解读文本 prompt 的语义意图，在视觉证据中定位依据
2. **层级评估计划构建**：在预定义锚点维度（semantic alignment, visual quality, aesthetics）下实例化细粒度子标准
3. **上下文维度增补**：根据内容自动生成额外评估维度（如叙事性、动作动态、物理合理性）

**Stage 1: Reasoning Distillation (SFT)**

输入：偏好评估实例 $x_i = (p_i, v_i^{(0)}, v_i^{(1)})$，其中 $p_i$ 为文本 prompt，$v^{(0)}_i, v^{(1)}_i$ 为候选视觉生成

教师输出：结构化评估轨迹 $y_i^T = \langle H_i, R_i, W_i \rangle$，其中：
- $H_i = \{(d_k, S_{i,k})\}_{k=1}^{K_i}$（实例化维度及子维度）
- $R_i$ = 基于证据的推理轨迹
- $W_i = \{w_{i,k}\}_{k=1}^{K_i}, w_i$（各维度优胜标签 + 总优胜标签）

SFT 损失函数：

$$\mathcal{L}_{\text{SFT}}(\theta) = -\sum_{i=1}^{N} \log p_\theta(y_i^T | x_i) = -\sum_{i=1}^{N} \sum_{t=1}^{|y_i^T|} \log p_\theta(y_{i,t}^T | x_i, y_{i,<t}^T)$$

训练数据：**UnifiedReward-Flex-SFT-90K**（90K 结构化样本，1.39M tokens）

**Stage 2: Direct Preference Optimization (DPO)**

偏好对构建：对每个输入 $x_i$（含标注偏好标签 $w_i^*$），从策略中采样两个结构化评估：$y_i^{(a)}, y_i^{(b)} \sim \pi_\theta(\cdot | x_i)$

正确性判定：$c(y_i^{(j)}) = \mathbb{1}[\hat{w}(y_i^{(j)}) = w_i^*]$

偏好规则：
- 若一个正确一个错误 -> 偏好正确的
- 若两个都正确 -> 用闭源 judge $T_{\text{judge}}$ 基于轨迹级偏好 $\ell_i^{\text{traj}} \in \{a, b\}$ 排序，优先选择更灵活的层级结构

DPO 损失函数：

$$\mathcal{L}_{\text{DPO}}(\theta) = -\mathbb{E}_{(x, y^+, y^-) \sim P}\left[\log \sigma\left(\beta_{\text{dpo}} \left(\log \frac{\pi_\theta(y^+|x)}{\pi_\theta(y^-|x)} - \log \frac{\pi_{\text{ref}}(y^+|x)}{\pi_{\text{ref}}(y^-|x)}\right)\right)\right]$$

其中 $\pi_{\text{ref}}$ 为冻结的 SFT 模型。

**个性化多维 GRPO 奖励（Pref-GRPO）：**

维度级胜率：$R_d(x_{i0}, c) = \frac{1}{G-1} \sum_{j \neq i} \mathbb{1}[x_{i0} \succ_d x_{j0}]$

平均维度胜率：$\bar{R}_{\text{dim}}(x_{i0}, c) = \frac{1}{D} \sum_{d=1}^{D} R_d(x_{i0}, c)$

总体胜率：$R_{\text{overall}}(x_{i0}, c) = \frac{1}{G-1} \sum_{j \neq i} \mathbb{1}[x_{i0} \succ x_{j0}]$

最终优势函数：$\hat{A}_i = \alpha \hat{A}_i^{\text{dim}} + (1 - \alpha) \hat{A}_i^{\text{overall}}$

其中 $\alpha = 0.7$（维度级与总体的平衡权重）。

#### 关键实验结果

**图像生成评估：**
- GenAI-Bench-Image 和 MMRB2 上超越所有基线（HPSv2, PickScore, HPSv3, UnifiedReward）
- MMRB2 上较 UnifiedReward-Think 提升 +3.2 点

**T2I GRPO 优化 (FLUX.1-dev)：**
- UniGenBench: 较基线 +14.56，较 UnifiedReward-Think +5.06
- 在 T2I-CompBench、GenEval 上有泛化效果
- 组合性和逻辑推理维度改善显著

**T2V GRPO 优化 (Wan2.1-T2V-14B, VBench)：**

| 指标 | Baseline | + UnifiedReward-Flex |
|------|----------|---------------------|
| Dynamic Degree | 58.6 | **70.8** (+12.2) |
| Spatial Relationship | 72.6 | **80.8** (+8.2) |
| Color | 87.7 | **89.6** (+1.9) |

**视频评估：** GenAI-Bench-Video 和 MJ-Bench-Video 上 +2.2 点提升

**Ablation 分析：**
- DPO 对齐一致性提升判别能力（即使两个采样轨迹都正确，对齐轨迹质量也有收益）
- $\alpha = 0.7$ 为最优平衡点（维度级 vs 总体胜率的权重）

---

## 三、方法演进对比表

### 3.1 架构变化

| 维度 | UnifiedReward | UnifiedReward-Think | UnifiedReward-Flex |
|------|--------------|--------------------|--------------------|
| 基座模型 | LLaVA-OneVision 7B | LLaVA-OneVision 7B | Qwen3-VL (2B-32B) |
| 评估模式 | Pairwise + Pointwise 直接输出 | CoT推理 + 结论输出 | 层级化个性化推理 + 多维评分 |
| 推理格式 | 无（直接答案） | `<think>...<answer>` 固定维度 | 动态层级 $(d_k, S_{i,k})$ + 灵活维度 |
| 评估维度 | 无显式维度 | 固定维度集（语义/美学/真实性） | 预定义锚点 + 自动生成上下文维度 |
| 覆盖范围 | 理解 + 生成（4任务） | 理解 + 生成（4任务） | 仅生成（图像+视频） |
| 模型规模 | 7B | 7B + Qwen2.5-VL-7B | 2B / 4B / 8B / 32B |

### 3.2 训练策略演进

| 维度 | UnifiedReward | UnifiedReward-Think | UnifiedReward-Flex |
|------|--------------|--------------------|--------------------|
| 训练范式 | SFT (cross-entropy) | 蒸馏 + 拒绝采样 + GRPO | 蒸馏 SFT + DPO |
| 阶段数 | 1 (模型训练) + 下游DPO | 3 (Cold Start + RS + GRPO) | 2 (SFT + DPO) |
| 蒸馏源 | 无（直接标注数据） | GPT-4o (5K -> 过滤) | 闭源VLM（90K结构化轨迹） |
| RL 方法 | 无 | GRPO (可验证奖励) | DPO (轨迹级偏好) |
| 偏好构建 | 两阶段过滤（Pair+Point） | 继承UnifiedReward数据 | 采样+正确性判定+judge排序 |
| 训练数据量 | ~236K | ~105K + 5K cold start | 90K SFT + DPO pairs |
| 硬件 | 8x H100 | 8x H100 + 64x H20 | 未公开 |

### 3.3 核心创新点递进

| 版本 | 核心创新 | 解决的问题 |
|------|---------|-----------|
| UnifiedReward | 统一四任务评估 + 两阶段偏好过滤 | 理解与生成评估割裂 |
| UnifiedReward-Think | CoT推理 + GRPO强化微调 | 评估缺乏可解释性和推理深度 |
| UnifiedReward-Flex | 动态个性化层级评估 + 多维GRPO | 固定维度无法适配多样内容和主观偏好 |

### 3.4 关键数值对比

| 基准 | UnifiedReward | UnifiedReward-Think | UnifiedReward-Flex |
|------|--------------|--------------------|--------------------|
| VLRewardBench Overall | 66.1% | **73.8%** (+7.7) | N/A（不再覆盖理解） |
| VLRewardBench Macro | 66.5% | **72.3%** (+5.8) | N/A |
| GenAI-Bench Image (diff) | 70.9 | 72.5 (+1.6) | 进一步提升 |
| GenAI-Bench Video (diff) | 77.2 | 82.3 (+5.1) | +2.2 over Think |
| VideoGen-RB (diff) | 79.3 | 80.5 (+1.2) | -- |
| MMRB2 | -- | baseline | **+3.2** over Think |
| UniGenBench (T2I GRPO) | -- | baseline | **+5.06** over Think |
| VBench Dynamic Degree | -- | -- | 58.6 -> **70.8** |

### 3.5 公式演进对比

**奖励计算方式：**

| 版本 | 奖励信号形式 |
|------|------------|
| UnifiedReward | 标量 pairwise/pointwise 直接输出 |
| UnifiedReward-Think | $R = R_{\text{fmt}} + R_{\text{acc}}$（可验证二值奖励） |
| UnifiedReward-Flex | $\hat{A}_i = \alpha \hat{A}_i^{\text{dim}} + (1-\alpha) \hat{A}_i^{\text{overall}}$（多维连续奖励） |

**DPO/RL 损失：**

| 版本 | 优化方法 | 关键参数 |
|------|---------|---------|
| UnifiedReward | DPO (扩散模型: $\beta_g=5000$; VLM: $\beta_u=0.1$) | 下游对齐用 |
| UnifiedReward-Think | GRPO ($\beta=0.04$, N=8, $\delta$ clipping) | 模型自身强化 |
| UnifiedReward-Flex | DPO ($\beta_{\text{dpo}}$, 轨迹级偏好) + Pref-GRPO ($\alpha=0.7$) | 模型对齐 + 下游优化 |

---

## 四、图源参考

### UnifiedReward
- 方法总览：`assets/UnifiedReward/fig3-method-overview.png`
- Pipeline：`assets/UnifiedReward/fig1-pipeline-overview.png`
- 定性对比：`assets/UnifiedReward/fig5-qualitative-comparison.png`
- arXiv HTML figures: `https://arxiv.org/html/2503.05236` (x1.png - x7.png)

### UnifiedReward-Think
- 方法总览：`assets/UnifiedReward-Think/fig2-method-overview.png`
- 性能对比：`assets/UnifiedReward-Think/fig1-comparison-overview.png`
- 定性 CoT：`assets/UnifiedReward-Think/fig3-qualitative-video-cot.png`
- arXiv HTML figures: `https://arxiv.org/html/2505.03318` (x1.png - x8.png)

### UnifiedReward-Flex
- arXiv HTML 尚不可用（2026-02 新论文）
- 项目页有图像/视频定性对比和训练曲线可视化
- 项目页地址：https://codegoat24.github.io/UnifiedReward/flex

---

## 五、UnifiedReward-Flex 笔记元数据（用于新建知识库条目）

```yaml
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
project_url: "https://codegoat24.github.io/UnifiedReward/flex"
github_url: "https://github.com/CodeGoat24/UnifiedReward"
```

---

## 六、总结：演进逻辑

```
UnifiedReward (2025-03)
  核心：统一四任务评估，证明跨任务互利
  局限：直接输出评分，无推理过程
       ↓
UnifiedReward-Think (2025-05)
  核心：引入 CoT 推理 + GRPO 强化
  改进：可解释性、评估可靠性
  局限：固定评估维度，one-size-fits-all
       ↓
UnifiedReward-Flex (2026-02)
  核心：动态个性化层级评估 + 多维 GRPO
  改进：上下文自适应、细粒度维度、个性化偏好
  聚焦：专注视觉生成（放弃理解任务覆盖）
```

系列的演进路径清晰：**统一评估 -> 推理可解释 -> 个性化灵活**。每一代都在前代的核心局限上做出针对性改进，同时核心团队保持不变（复旦 Yibin Wang + Shanghai AI Lab Jiaqi Wang 组）。值得注意的是 Flex 做出了一个重要的 trade-off：放弃理解任务的覆盖，换取生成评估上更深入的个性化能力。

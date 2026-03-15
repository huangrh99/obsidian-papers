# Reward Model 全景调研

> 基于知识库中 94 篇论文（reward-model）+ 6 篇生成评估基准（generation-evaluation/，交叉引用）+ 3 篇公司技术报告（image-generation-posttrain/）的系统性调研，按三大研究方向梳理。
> 最后更新：2026-03-15 | GPU 资源：8×H100

## 目录

- [1. 调研概览](#1-调研概览)
- [2. 方法分类总表](#2-方法分类总表)
- [3. Text RM 方向](#3-text-rm-方向)
- [4. 多模态理解 RM 方向](#4-多模态理解-rm-方向)
- [5. 图像/视频生成 RM 方向](#5-图像视频生成-rm-方向)
- [6. 三方向交汇：统一 RM 设计](#6-三方向交汇统一-rm-设计)
- [7. 推荐执行路线](#7-推荐执行路线)
- [8. 参考文献索引](#8-参考文献索引)

---

## 1. 调研概览

### 三大研究方向

本调研将 reward model 领域划分为三个研究方向，依据的核心区分标准是**评估对象的差异**：

| 方向 | 定义 | 论文数 | 成熟度 |
|------|------|--------|--------|
| **Text RM** | 纯文本奖励模型，服务于 LLM 对齐 | 43 方法 + 5 基准 + 3 综述 | 最高——范式多样，基准完善 |
| **多模态理解 RM** | 评估 VLM 在理解任务上的输出质量（幻觉、推理、偏好） | 10 方法 + 3 基准 | 中——幻觉消减与推理增强，快速演进 |
| **图像/视频生成 RM** | 评估生成模型产出的图像/视频质量（对齐度、美学、物理一致性） | 25 方法 + 1 RM 基准 + 6 生成基准（→generation-evaluation/） | 中高——Image 成熟，VLM-based 生成评估兴起 |
| **公司实践** | 工业级技术报告中的 RM 实践（跨目录引用） | 3 技术报告 | 高——完整 CT→SFT→RLHF 流程验证 |

### 方向间的关系

```
Text RM（方法论源头）
  │
  │ 经验迁移：CoT / Rubric / RLAIF / 生成式验证
  ▼
多模态理解 RM（基座能力）◄── VLM 幻觉消减 + 推理增强
  │
  │ VLM 评估能力支撑生成质量判断
  ▼
图像/视频生成 RM（最终目标）──► 下游应用：DDPO / Diffusion-DPO / T2V-Turbo
```

- **Text RM** 方法最成熟，提供了 CoT 推理、Rubric 结构化、RLAIF、生成式验证等核心方法论，是其他两个方向的理论源泉
- **多模态理解 RM** 评估 VLM 的理解/推理输出质量，核心关注幻觉消减、推理正确性和人类偏好对齐，为生成 RM 提供基座能力
- **图像/视频生成 RM** 评估生成模型的图像/视频产出质量，是统一 RM 的最终应用目标；包括 CLIP-based 专用 scorer 和 VLM-based 生成评估两条路线，正在汇合

### 论文统计（方向 × 范式）

| 范式 | Text RM | 多模态理解 RM | 图像/视频生成 RM | 合计 |
|------|---------|-------------|---------------|------|
| Scorer | 9 | 3 | 13 | 25 |
| Judge | 3 | 1 | 0 | 4 |
| CoT-Reasoning | 3 | 2 | 3 | 8 |
| Rubric | 7 | 0 | 0 | 7 |
| Generative RM | 3 | 0 | 2 | 5 |
| Implicit RM | 5 | 0 | 0 | 5 |
| PRM (Process RM) | 4 | 2 | 0 | 6 |
| RLAIF/Self-Reward | 3 | 2 | 0 | 5 |
| Latent RM | 0 | 0 | 1 | 1 |
| Benchmark（RM 评估） | 5 | 3 | 1 | 9 |
| Benchmark（生成评估，→generation-evaluation/） | 0 | 0 | 6 | 6 |
| Analysis | 3 | 0 | 0 | 3 |
| 其他 | 3 Survey + 2 Dataset | 0 | 1 Dataset + 2 Metric/Feedback | 8 |

---

## 2. 方法分类总表

涵盖全部 94 篇论文 + 6 篇生成评估基准（generation-evaluation/ 交叉引用），按研究方向分表展示。

### 2.1 Text RM

| 模型 | 日期 | 基座模型 | 方法范式 | 训练数据规模 | 核心指标 | 核心创新 |
|------|------|----------|----------|-------------|---------|---------|
| RLHF | 2017-06 | MLP / CNN | Scorer | ~700-5500 人类偏好比较 | MuJoCo/Atari 接近真实奖励 | RLHF 范式奠基：人类偏好比较训练 RM + RL 策略优化 |
| InstructGPT | 2022-03 | GPT-3 6B | Scorer | ~33K 人类排序 | 1.3B RM > 175B GPT-3 | 开创 SFT->RM->PPO 三阶段 RLHF 范式 |
| RewardOveropt | 2022-10 | GPT-3 / InstructGPT RM | Analysis | 100K 合成比较对 | Scaling law 系数随 RM 参数量平滑缩放 | 首次量化 RLHF 过优化 Scaling Law（Goodhart's Law），BoN 与 RL 遵循不同函数形式 |
| ConstitutionalAI | 2022-12 | 52B LM | RLAIF | 183K AI + 135K 人类偏好 | 帕累托改进 HH | 开创 RLAIF 范式，宪法原则替代人类有害性标注 |
| DPO | 2023-05 | Policy model | Implicit RM | 标准偏好对 | 匹配/超越 PPO | 闭式最优策略推导，免去显式 RM 训练 |
| PRM800K | 2023-05 | GPT-4 base | Scorer (Process) | 800K 步骤级标注 | MATH 78.2% (BoN-1860) | 过程监督 >> 结果监督，首个大规模步骤级 RM 数据集 |
| RLAIF | 2023-09 | PaLM 2 | RLAIF | AI 偏好标签 | RLAIF ≈ RLHF | 系统验证 AI 反馈可替代人类反馈，提出 d-RLAIF |
| Auto-J | 2023-10 | LLaMA-2-13B-chat | Judge | 3.4K pairwise + 960 single | Pairwise ACC 55.0%, 系统级 Spearman 0.97 | 首个开源 13B 生成式 judge，58 场景 + 332 标准，多协议统一 |
| UltraFeedback | 2023-10 | — | Dataset | 1M+ GPT-4 反馈 | — | 最广泛用的偏好数据集 |
| Math-Shepherd | 2023-12 | Mistral/LLaMA 7-70B | PRM (Process) | 445K 解答, 自动步骤标注 | GSM8K 89.1%, MATH 43.5% (BoN) | 蒙特卡洛估计自动过程标注，无需人工步骤级标注即可训练 PRM |
| Self-Rewarding | 2024-01 | Llama 2 70B | Self-Reward | 3.2K IFT + 迭代 DPO | AlpacaEval 20.44% (>GPT-4) | LLM-as-Judge 自奖励 + 迭代 DPO |
| KTO | 2024-02 | Mistral-7B / 各规模 LLM | Implicit RM | 二元反馈（好/坏） | GSM8K +13.5 vs DPO, 1B-30B 匹配 DPO | 基于前景理论的 HALO 损失，仅需二元反馈信号，无需成对偏好 |
| ODIN | 2024-02 | Llama-2 7B | Disentangled | 标准偏好对 | BoN +解耦长度偏差 | 解耦长度/质量防 reward hacking |
| ORPO | 2024-03 | Phi-2/Llama-2/Mistral 7B | Implicit RM | 标准偏好对 | AlpacaEval 2.0 12.20% | 单阶段 SFT+偏好对齐，odds ratio 惩罚项，免参考模型，计算量减半 |
| SimPO | 2024-05 | Policy model | Implicit RM | 标准偏好对 | AE2 +6.4 vs DPO | 序列平均 log-prob 隐式奖励，免参考模型 |
| ArmoRM | 2024-06 | Llama-3 8B | Scorer | ~60 万评分 + 97.5 万偏好对 | RB 89.0% (8B ≈ 340B) | 多目标回归 + MoE 门控 |
| Nemotron-4 | 2024-06 | Nemotron-4 340B | Scorer | 10K HelpSteer2 | RB 92.0% | 多属性回归 RM + 98% 合成数据闭环 |
| HelpSteer2 | 2024-06 | — | Dataset | 10K 5属性标注 | RB 92.0% (Nemotron) | 多属性偏好数据集 |
| OmegaPRM | 2024-06 | Gemini Pro | PRM (Data) | MCTS 15M 标注 | MATH-500 69.4% | MCTS 收集 PRM 数据，75x 效率 |
| FLAMe | 2024-07 | PaLM-2-24B | Judge | 100+ 任务, 5M+ 判断 | RB 87.8%, 8/12 超 GPT-4 | 首个基于大规模人类判断的基础评估模型 |
| GenRM | 2024-08 | Gemini 1.0 Pro | Generative | 合成验证 rationale | BoN GSM8K 93.4% | 生成式验证器，next-token prediction + CoT |
| QRM | 2024-09 | Llama-3.1 系列 | Distributional | 标准偏好对 | RB 91.6% (8B) | 分位数回归分布式奖励 |
| Con-J | 2024-10 | Qwen2-7B-Instruct | Generative | 自举对比判断对 | Infinity-Pref 81.0%, RB 91.3% | 自举对比判断 + DPO 训练生成式 judge，rationale 增强鲁棒性 |
| AccuracyParadox | 2024-10 | Longformer | Analysis | QA-FEEDBACK 3853 | 中等准确率 RM 下游最优 | 揭示 RM 准确率与 LM 性能非单调关系 |
| Skywork-Reward | 2024-10 | Gemma-2 27B / Llama-3.1 8B | Scorer | 80K 偏好对 | RB 93.8% (排行榜第一) | 数据中心方法论，80K > 700K |
| PRIME | 2025-02 | Eurus-2-7B | PRM (Implicit) | 仅结果标签 | GSM8K +15.1% avg | 隐式过程奖励，无需单独 PRM |
| DeepSeek-GRM | 2025-04 | DeepSeek-V2.5 | Generative RM | SPCT 训练 | RB 93.3% | 推理时 scaling 生成式 RM |
| ThinkPRM | 2025-04 | Llama-3.1 8-70B | PRM | 8K CoT 验证 | ProcessBench F1 0.88 | 推理验证 PRM，100x 数据效率 |
| J1 | 2025-05 | Llama 3 8-70B | Judge | 22K 合成偏好对 | PPE 76.8%, RB 93.6% | RL 训练 judge + 一致性奖励 |
| R3 | 2025-05 | Qwen3 4-14B + LoRA | Rubric | 4-14K | RM-Bench 84.0%, RB 89.6% | Rubric-agnostic RM |
| RM-R1 | 2025-05 | DeepSeek/Qwen 14-32B | CoT-Reasoning | Oracle CoR 链 | RB 91.4%, RM-Bench 83.9% | Chain-of-Rubrics + RL 训练 |
| RRM | 2025-05 | Qwen 7/32B | CoT-Reasoning | 无标注数据 | 跨领域 SOTA (32B) | 自演化推理 RL，无需人工标注 |
| RewardAnything | 2025-06 | Qwen2.5 系列 | Principle-following | RABench | 原则跟随泛化 | 首个原则跟随 RM |
| Checklists | 2025-07 | Qwen2.5-7B-Instruct | Rubric | Checklist-based | FollowBench +5.5% | RLCF：清单 + judge/verifier |
| RaR | 2025-07 | Qwen2.5-7B | Rubric | Instance rubrics | HealthBench +31% | 实例级 rubric 用于 RL |
| RuscaRL | 2025-08 | Qwen2.5-7B / Llama-3.1-8B | Rubric | Rubric-based | HealthBench +33 pts | Rubric 作为 RL 脚手架 |
| AdvancedIF | 2025-11 | Llama 4 Maverick | Rubric/Benchmark | 1645 rubric prompt | AdvancedIF +6.7% | AdvancedIF 基准 + RIFL 方法 |
| RRD | 2026-02 | GPT-4o / Llama-3.1-405B | Rubric | 4K WildChat | JudgeBench +17.7 | 递归 rubric 分解 |
| Rubric-ARM | 2026-02 | SFT + GRPO | Rubric | 3 轮 RL | 9 基准均值 74.8% | 交替 RL 训练 rubric 生成 + judge |
| GRAM-R2 | 2025-09 | GenRM | Generative | 无标注数据自训练 | 多任务 SOTA (AAAI 2026) | 自训练生成式奖励基础模型，同时输出偏好标签和推理理由 |
| GRPO-PRM | 2025-09 | — | Analysis/PRM | 理论证明 | lambda-GRPO 平均 +10% | 证明 GRPO+ORM 隐式等价于蒙特卡洛 PRM，提出 lambda-GRPO 修正 |
| PRM-Survey | 2025-10 | — | Survey | — | — | 首个 PRM 综述，覆盖数据生成→PRM 构建→TTS→RL 完整闭环 |
| Reward-Under-Attack | 2026-02 | Skywork-PRM / Qwen-PRM | Analysis | PRM-BiasBench | 43% 奖励来自风格捷径 | 三级对抗框架证明 PRM 本质是流畅度检测器，非推理验证器 |
| ScalingRM | 2026-02 | Llama-3.2 / Qwen2.5 | Scorer | 11M token 无标注 | RB v2 +7.7, 数学 +16.1 | 前缀-后缀偏好对无监督训练 RM，无需人工标注 |

### 2.2 多模态理解 RM

| 模型 | 日期 | 基座模型 | 方法范式 | 训练数据规模 | 核心指标 | 核心创新 |
|------|------|----------|----------|-------------|---------|---------|
| LLaVA-RLHF | 2023-09 | LLaVA-1.5 13B | RLHF | 10K Fact-RLHF 数据 | MMHal-Bench 2.05 | 首个多模态 RLHF |
| RLHF-V | 2023-12 | Muffin 13B | Dense DPO | 1.4K 段级纠错 | 幻觉 -34.8% | 段级纠错反馈 |
| RLAIF-V | 2024-05 | LLaVA-1.5/OV | RLAIF | 开源 AI 反馈 | 幻觉 -82.9% | 开源多模态 AI 反馈 |
| LLaVA-Critic | 2024-10 | LLaVA-OneVision 7/72B | Judge | 113K critic 数据 | Pairwise ACC 0.736 (>GPT-4V) | 首个开源多模态 LMM-as-Judge |
| IXC-2.5-Reward | 2025-01 | IXC-2.5 7B | Scorer | 多模态偏好语料 | VLRBench 70.0% | ACL 2025，通用多模态 RM |
| VisualPRM | 2025-03 | LLaVA-OneVision 7B | PRM | 400K 步骤级 | F1 ≈ GPT-4o | 首个多模态 PRM |
| R1-Reward | 2025-05 | Qwen2.5-VL-7B | CoT-Reasoning | 200K 偏好数据 | VLRBench 71.92%, MMRB 82.2% | StableReinforce 解决 RL 训练不稳定 |
| Skywork-VL Reward | 2025-05 | Qwen2.5-VL-7B | Scorer | ~190K 偏好对 | VLRBench 73.1% | SOTA 开源多模态 RM |
| Vision-SR1 | 2025-08 | Qwen2.5-VL-7B | Self-Reward | 9K SFT + 47K RL | MMMU 49.1, 平均 58.8 | 推理分解自奖励：视觉感知自包含性作为奖励信号，无需外部 RM |
| VL-PRM | 2025-09 | Qwen-2.5-VL 3/7B | PRM | VL-PRM300K (290K, 1.32M 步骤) | F1 61.9 (3B ≈ GPT-4o) | 首个 VL-PRM，混合 MCTS+VLM 判断标注，感知级监督显著提升 |

### 2.3 图像/视频生成 RM

| 模型                  | 日期      | 基座模型                | 方法范式              | 训练数据规模                         | 核心指标                                  | 核心创新                                                   |
| ------------------- | ------- | ------------------- | ----------------- | ------------------------------ | ------------------------------------- | ------------------------------------------------------ |
| CLIPScore           | 2021-04 | CLIP ViT-B/32       | Scorer            | Zero-shot                      | tau_c=51.2 (Flickr8K)                 | 首个无参考图像-文本评估，基于 CLIP 余弦相似度                             |
| HPS                 | 2023-03 | CLIP ViT-L/14       | Scorer            | 98.8K 图 / 25K prompt           | Pref ACC 43.5%                        | 首次大规模收集 T2I 用户偏好，证明 IS/FID 与偏好不相关                      |
| TIFA                | 2023-03 | GPT-3 + VQA         | Metric            | 4K prompt / 25K 问题             | 与人类判断高相关                              | 首个 VQA-based T2I 忠实度评估，开创 QG+VQA 范式                    |
| ImageReward         | 2023-04 | CLIP + reward head  | Scorer            | 137K 比较对                       | 人类评估最佳                                | 首个 T2I 人类偏好奖励模型                                        |
| Pick-a-Pic          | 2023-05 | --                  | Dataset           | 583K 偏好对 / 67K prompt          | --                                    | 首个大规模开源 T2I 真实用户偏好数据集                                  |
| PickScore           | 2023-05 | CLIP-H (ViT-H/14)   | Scorer            | 851K pairwise                  | ACC 70.5% (超人类 68%)                   | 基于真实用户偏好微调，Elo 相关 0.790                                |
| HPSv2               | 2023-06 | CLIP fine-tuned     | Scorer            | 798K 偏好                        | 最佳跨分布泛化                               | 偏差纠正 + 最大规模偏好数据集                                       |
| Q-Align             | 2023-12 | mPLUG-Owl-2         | Scorer            | IQA+IAA+VQA 混合                 | SRCC 0.941 (KonIQ)                    | 离散文本等级模拟人类评分，OneAlign 统一 IQA/IAA/VQA                   |
| RichHF              | 2023-12 | ViT-B/16 + T5-Base  | Feedback          | 18K 标注图                        | AUC-Judd 0.913                        | 多维度富人类反馈：区域热力图+文本错位+多维评分                               |
| VideoScore          | 2024-06 | Mantis-Idefics2-8B  | Scorer            | 37.6K 视频, 5 维度                 | Spearman 77.1                         | 首个多维度视频 RM                                             |
| VisionReward        | 2024-12 | CogVLM2             | Scorer/Generative | 61-64 binary Q                 | MonetBench tau=72.1                   | 层次化二值问题分解评估                                            |
| LiFT                | 2024-12 | VILA 13/40B         | Scorer/Generative | LiFT-HRA 10K                   | CogVideoX-2B > 5B on VBench           | 评分 + 推理双反馈机制                                           |
| VideoAlign          | 2025-01 | Qwen2-VL-2B         | Scorer            | 182K 三元组                       | VideoGen-RB 61.26%                    | BTT 损失处理 tie 样本                                        |
| UnifiedReward       | 2025-03 | LLaVA-OneVision 7B  | Unified           | 236K, 4 领域                     | VLRBench 66.1%                        | 首个统一生成 RM（T2I/T2V）                                     |
| UnifiedReward-Think | 2025-05 | LLaVA-OneVision 7B  | CoT/Unified       | 5K 蒸馏 + RS                     | VLRBench 73.8%                        | CoT 增强生成 RM                                            |
| HP-Score            | 2025-07 | CLIP-H 微调           | Scorer            | Pick-High 360K 三元组             | 准确率 88.84%, 人工 71.4% win rate         | Image-only HP 分数揭示 CLIP 偏差，细节丰富图像被不当惩罚                 |
| LLaVA-Reward        | 2025-07 | Phi-3.5-vision 4.2B | Scorer            | 多维偏好数据                         | MJ-Bench 对齐 66.2%, 安全 92.1%           | MLLM 隐状态 + SkipCA 模块，高效 T2I RM (0.35s/eval, ICCV 2025) |
| HPSv3               | 2025-08 | Qwen2VL-7B          | Scorer            | HPDv3 1.5M                     | Spearman 0.94, CoHP 87%               | VLM-based scorer + 不确定性感知损失                            |
| RewardDance         | 2025-09 | InternVL 1-26B      | Generative        | Pairwise BT                    | FLUX align +6.6                       | 生成式 RM：reward=P("yes")                                 |
| VR-Thinker          | 2025-10 | Qwen2.5-VL-7B       | CoT-Reasoning     | GRPO 训练                        | GenAI-Bench 82.3%, VideoGen-RB 80.5%  | thinking-with-image 推理框架                               |
| PIGReward           | 2025-11 | Qwen2-VL-7B         | CoT/Personalized  | 4K CoT 蒸馏                      | PIGBench 84.91% (超 GPT-4o 68.29%)     | 个性化 T2I RM：动态评估维度 + 自引导策略，无需用户特定训练                     |
| LatentRM            | 2025-11 | DiT (VGM 前 8 层)     | Latent RM         | 偏好数据 + PRFL                    | Dynamic Degree +46                    | 潜空间奖励模型，复用 VGM 做 RM                                    |
| SoliReward          | 2025-12 | VLM 8B HPQA         | Scorer            | 250K 视频                        | OOD ACC 80.08%                        | BT-WT 损失 + 渐进式聚合                                       |
| UnifiedReward-Flex  | 2026-02 | Qwen3-VL 2-32B      | CoT/Unified       | 90K SFT                        | MMRB2 +3.2 vs Think                   | 动态维度生成 RM                                              |
| FIRM                | 2026-03 | Qwen3-VL-8B         | Scorer/Generative | FIRM-Edit-370K + FIRM-Gen-293K | Edit MAE 0.53 (超 GPT-5), Gen MAE 0.51 | 编辑/生成专用 RM + Base-and-Bonus 乘法奖励防 reward hacking       |

### 2.4 评估基准与综述

#### 2.4a RM 评估基准（评估奖励模型本身，9 篇）

| 模型 | 日期 | 模态 | 方法范式 | 规模 | 核心指标 | 核心创新 |
|------|------|------|----------|------|---------|---------|
| RewardBench | 2024-03 | Text | Benchmark | 2985 三元组 | Top 89.0% (ArmoRM) | 首个标准化文本 RM 基准 |
| MJ-Bench | 2024-07 | Image | Benchmark | 4 维度偏好三元组 | GPT-4o 整体最优 | 四维评估 T2I judge |
| JudgeBench | 2024-10 | Text | Benchmark | 350 挑战性对 | Top 80.86% (o3-mini) | 评估 LLM judge 事实/逻辑正确性 |
| RM-Bench | 2024-10 | Text | Benchmark | 4 领域风格变体 | SOTA Hard ACC 46.6% | 风格偏差干扰下评估 RM 鲁棒性 |
| RMB | 2024-10 | Text | Benchmark | 49 场景, 18K+ 偏好对 | BoN 评估与下游正相关 | 首个 Pairwise + BoN 综合 RM 基准 |
| VL-RewardBench | 2024-11 | Image+Video | Benchmark | 1250 偏好对, 3 领域 | Top 65.8% (GPT-4o) | 首个 VL 奖励模型基准 |
| RewardBench2 | 2025-06 | Text | Benchmark | 1876 prompt | Top 77.2% (Gemini 2.5 Flash) | Best-of-4 + 事实性/IF/Tie 维度 |
| VideoRewardBench | 2025-08 | Video | Benchmark | 1563 偏好对, 5 维度 | Top 63.6% (Gemini 2.5 Pro) | 首个覆盖感知/知识/推理/安全的视频 RM 基准 |
| MMRB2 | 2025-12 | Image+Video+Text | Benchmark | 4K 专家标注对 | Top 76.3% (Gemini) | 首个全模态 RM 基准 |

#### 2.4b 生成评估基准（评估生成模型，已移至 generation-evaluation/，交叉引用，6 篇）

| 模型 | 日期 | 模态 | 方法范式 | 规模 | 核心指标 | 核心创新 |
|------|------|------|----------|------|---------|---------|
| T2I-CompBench | 2023-07 | Image | Benchmark | 8000 组合性提示 | B-VQA tau=0.63 | 首个系统性组合性 T2I 评估基准 |
| EvalCrafter | 2023-10 | Video | Benchmark | 700 prompt, 17 指标 | 高人类对齐相关性 | 首个系统性 T2V 评估框架 |
| GenEval | 2023-10 | Image | Benchmark | 553 组合性提示 | 人类一致 83% | 基于目标检测的组合性 T2I 评估 |
| VBench | 2023-11 | Video | Benchmark | 946 prompt, 16 维度 | 高人类相关性 | 首个 16 维度视频生成基准 |
| GenAI-Bench | 2024-06 | Image+Video | Benchmark | 1600 prompt, 38.4K 评分 | VQAScore 最高人类相关 | 组合性文视评估基准 |
| VideoPhy | 2024-06 | Video | Benchmark | 688 prompt | 最优 39.6% | 首个视频物理常识评估基准 |

> **注：** 以上 6 篇生成评估基准的笔记文件已移至 `generation-evaluation/` 目录。Obsidian `[[]]` 链接按文件名解析，跨目录仍可正常跳转。

#### 2.4c 综述

| 模型 | 日期 | 模态 | 方法范式 | 规模 | 核心指标 | 核心创新 |
|------|------|------|----------|------|---------|---------|
| LLM-as-Judge-Survey | 2024-11 | Text | Survey | -- | -- | 首篇 LLM-as-Judge 综述 |
| RM-Survey | 2025-04 | Text+Image+Video | Survey | -- | -- | 首篇 RM 专题综述 |
| PRM-Survey | 2025-10 | Text+Multimodal | Survey | -- | -- | 首个 PRM 综述，覆盖过程数据→PRM 构建→TTS→RL 完整闭环 |

---

## 3. Text RM 方向

> 文本奖励模型是 RM 领域最成熟的方向，为视觉 RM 提供了核心方法论。

### 3.1 演进脉络

```
RLHF (2017, 人类偏好 RM + RL 范式奠基)
  │
InstructGPT (2022, RLHF 推广至 LLM 对齐)
  ├── RewardOveropt (2022, Goodhart's Law 量化，过优化 Scaling Law)
  ├── PRM800K (2023, 过程监督 >> 结果监督，步骤级 RM)
  │     └── Math-Shepherd (2023, 蒙特卡洛自动 PRM，无需人工标注)
  ├── DPO / SimPO / KTO / ORPO (隐式 RM，消除显式 RM 训练)
  ├── ConstitutionalAI / RLAIF (AI 反馈替代人类反馈)
  │     └── Self-Rewarding (自奖励迭代 DPO)
  ├── ArmoRM / Nemotron-4 (多目标 Scorer)
  │     └── Skywork-Reward (数据中心方法论)
  ├── GenRM (生成式验证器，统一到 NTP 框架)
  │     └── GRAM-R2 (2025, 自训练生成式奖励基础模型, AAAI 2026)
  ├── RM-R1 / RRM / J1 (CoT 推理增强)
  ├── R3 / RaR / Checklists / RRD / Rubric-ARM / RuscaRL (Rubric 结构化评估)
  ├── GRPO-PRM (2025, 证明 GRPO 隐式等价 PRM，lambda-GRPO 修正)
  ├── ScalingRM (2026, 无监督前缀-后缀偏好对训练 RM)
  └── Reward-Under-Attack (2026, PRM 鲁棒性三级对抗分析，43% 风格捷径)
```

**五个关键转折点：**

1. **RLHF → InstructGPT → PRM800K → DPO (2017-2023)**：RLHF（2017）首次在深度 RL 中用人类偏好比较训练奖励模型，InstructGPT 将此范式推广到 LLM 对齐（SFT→RM→PPO），RewardOveropt（2022）首次量化了过优化的 Scaling Law，PRM800K 证明过程监督（步骤级反馈）显著优于结果监督，Math-Shepherd 进一步证明 PRM 可完全自动化训练，GRPO-PRM（2025）从理论上证明 GRPO+ORM 隐式等价于蒙特卡洛 PRM，PRM-Survey（2025）提供了首个 PRM 系统综述。DPO 消除显式 RM 训练。SimPO 去掉了参考模型，KTO 将数据需求降为二元反馈，ORPO 将 SFT 和对齐合并为单阶段。
2. **人类反馈 → AI 反馈 (2022-2023)**：ConstitutionalAI 开创 RLAIF，RLAIF 系统验证 AI ≈ 人类，Self-Rewarding 让模型自评自训，突破了冻结 RM 的瓶颈。
3. **标量分数 → CoT 推理 (2024-2025)**：GenRM 将 RM 统一到 next-token prediction，GRAM-R2（AAAI 2026）进一步将其发展为自训练生成式奖励基础模型，利用无标注数据激发奖励推理能力；RM-R1 的 Chain-of-Rubrics 和 RRM 的自演化推理让 RM 给出可追溯的评判过程。ScalingRM（2026）证明仅用 11M token 无标注网络数据即可训练出竞争力的 RM。
4. **自由推理 → Rubric 结构化 (2025-2026)**：R3、RaR、Checklists 等工作将评估标准显式化，RRD 用递归分解处理复杂指令，Rubric-ARM 用交替 RL 同时优化 rubric 生成和评判。
5. **学术方法 → 工业验证 (2025-2026)**：HunyuanVideo、Seedance、Seedream 三份工业技术报告验证了 VLM-based RM + CT→SFT→RLHF 流水线在大规模商用系统中的有效性，RM scaling（1B→>20B）展现涌现性能。

### 3.2 关键方法对比

| 范式 | 代表工作 | 输出形式 | 核心优势 | 核心劣势 | 最佳性能 |
|------|---------|---------|---------|---------|---------|
| **Scorer** | ArmoRM, Nemotron-4, Skywork-Reward | 标量/多维分数 | 高效，可用于在线 RL | 不可解释，易受风格偏差 | RB 93.8% (Skywork) |
| **Implicit RM** | DPO, SimPO, KTO, ORPO | 策略本身编码奖励 | 免 RM 训练，工程简洁 | 无法显式评估 | AE2 12.20% (ORPO) |
| **PRM** | PRM800K, Math-Shepherd | 步骤级分数 | 细粒度监督，数据效率高 | 标注成本高（可自动化） | MATH 78.2% (PRM800K) |
| **RLAIF** | ConstitutionalAI, RLAIF, Self-Rewarding | AI 生成偏好标签 | 可扩展，无需人类标注 | 依赖基座模型能力 | AlpacaEval 20.44% |
| **Judge** | Auto-J, J1, FLAMe | 自然语言判断 | 可解释 | 推理慢 | RB 93.6% (J1) |
| **CoT-Reasoning** | RM-R1, RRM | 推理链 + 评分 | 可追溯，准确 | 推理成本高 | RM-Bench 84.0% |
| **Rubric** | R3, RaR, Checklists, RRD, Rubric-ARM, RuscaRL, AdvancedIF | 结构化标准 + 评分 | 一致性高，可定制 | Rubric 质量依赖 | JudgeBench +17.7 (RRD) |
| **Generative** | GenRM, GRAM-R2 | P(Yes) / 验证链 / 推理理由 | OOD 泛化强，效率高，可作基础模型 | 精度不如专用 Scorer | BoN GSM8K 93.4% |

### 3.3 Process Reward Model (PRM) 子方向

> PRM 为推理任务的每一步提供细粒度奖励信号，是 Text RM 中独立且重要的分支。

**PRM800K → Math-Shepherd 的核心演进：**

| 方法 | 标注方式 | 数据规模 | 核心结果 | 关键创新 |
|------|---------|---------|---------|---------|
| [[PRM800K]] | 人工步骤级标注 | 800K 步骤标注 | MATH 78.2% vs ORM 72.4% | 首次证明过程监督 >> 结果监督 |
| [[Math-Shepherd]] | 蒙特卡洛自动标注 | 445K 解答 | GSM8K 89.1%, MATH 43.5% | 无需人工标注，完全自动化 PRM 训练 |

**PRM800K 的奠基性贡献：** 在数学推理任务中，步骤级过程监督（78.2%）显著优于仅评估最终答案的结果监督（72.4%）。过程监督不仅提升性能，还提高了模型推理链的可解释性。主动学习将数据效率提升 2.6 倍。

**Math-Shepherd 解决了 PRM 的核心瓶颈——人工标注成本。** 通过蒙特卡洛估计（从每一步出发生成多条续写路径，统计到达正确答案的比例），以完全自动化的方式生成步骤级标注，标注准确率达 85%，超越 NLI-based（75.6%）和规则 based（75.0%）方法。Step-by-step PPO 将 Mistral-7B 在 GSM8K 上从 77.9% 提升到 84.1%，在 MATH 上从 28.6% 提升到 33.0%。

**PRM 与后续工作的连接：**
- PRM 的"步骤级评估"理念直接启发了 CoT 推理增强 RM（如 RM-R1、RRM）——两者都在推理链的中间步骤提供评判信号
- GenRM 的生成式验证同样可以在步骤级运作，与 PRM 的过程监督形成互补
- Math-Shepherd 的自动标注方法为后续 RLAIF / 合成数据策略提供了具体范例
- [[GRPO-PRM]] 从理论上证明 GRPO+ORM 隐式等价于蒙特卡洛 PRM——当 group 内轨迹共享前缀时，token 级 credit assignment 自动涌现。lambda-GRPO 修正不平衡步骤频率，训练步数减少 50% 且准确率提升 >10%
- [[PRM-Survey]] 提供了首个 PRM 系统综述，覆盖过程数据生成→PRM 构建→测试时扩展→RL 的完整闭环

**PRM 鲁棒性警示：** [[Reward-Under-Attack]] 通过三级对抗框架揭示当前 SOTA PRM（Skywork-PRM、Qwen-PRM）本质上是流畅度检测器而非推理验证器。RL 训练中 PRM 奖励达 >0.9 但真实准确率 <4%，**43% 的奖励增益归因于风格捷径**。这对 PRM 在实际部署中的可靠性提出了严峻挑战。

### 3.4 关键经验与跨模态迁移

| 经验 | Text RM 证据 | 视觉 RM 迁移方向 |
|------|-------------|----------------|
| 数据质量远比数量重要 | [[Skywork-Reward]] 80K > 700K，RB 93.8% | 精选 image/video 偏好数据，严格清洗 pipeline |
| RM 准确率悖论 | [[AccuracyParadox]] 中等准确率 RM 下游最优 | 避免过拟合偏好数据，适度训练防止 reward hack |
| 过优化 Scaling Law | [[RewardOveropt]] BoN/RL 过优化可预测，系数随 RM 参数量平滑缩放 | RM 规模选择与优化停止条件设计 |
| 过程监督 >> 结果监督 | [[PRM800K]] 78.2% vs 72.4%；[[Math-Shepherd]] 自动 PRM 标注 | 步骤级/维度级评估优于整体评分；视频帧级/阶段级评估 |
| CoT 推理显著提升 | [[RM-R1]] RM-Bench 83.9%；[[RRM]] 无标注自演化 SOTA | 视觉评估加入推理链（已被 UnifiedReward-Think 验证） |
| Rubric 结构化优势 | [[RRD]] JudgeBench +17.7；[[RuscaRL]] HealthBench +33 | 为不同视觉维度生成评估标准 |
| GenRM OOD 泛化 | [[GenRM]] BoN 93.4%，BoF-5 匹配判别式 BoF-32 | reward = P("yes") 范式（已被 RewardDance 验证） |
| RL 比 SFT 更有效 | [[J1]], [[RRM]] | RM 训练第二阶段用 GRPO（已被 R1-Reward 验证） |
| 多目标分解 + MoE | [[ArmoRM]] 8B ≈ 340B | 图像/视频多维度 + 门控聚合 |
| 合成数据闭环 | [[Nemotron-4]] 98% 合成数据 | 用初版 RM 扩增训练数据 |
| 无监督 RM 扩展 | [[ScalingRM]] 11M token 无标注数据 RBv2 +7.7 | 网络文本前缀-后缀偏好对可替代人工标注 |
| 隐式奖励演进 | [[SimPO]] / [[KTO]] / [[ORPO]]：更少数据+更简流程+更低计算 | 生成模型内在奖励信号，单阶段训练 |

**关键细节补充：**

**过优化 Scaling Law (Goodhart's Law)：** [[RewardOveropt]] 核心发现：(1) BoN 采样下 gold reward 遵循 $R(d) = d(\alpha - \beta d)$，RL 下遵循 $R(d) = d(\alpha - \beta \log d)$，RL 在高 KL 区域过优化更严重；(2) 系数 $\alpha, \beta$ 随 proxy RM 参数量（3M→3B）平滑缩放，使得过优化可预测；(3) 更大的 RM 对应更高的优化增益和更慢的过优化衰减。

**Rubric 粒度需精心设计：** [[RMB]] 发现过于详细的评判标准反而有害，说明 Rubric 粒度需要平衡。

**隐式 RM 的多样化演进：** DPO 开创隐式 RM 范式，后续沿三个方向拓展：

| 方法 | 数据需求 | 参考模型 | 训练阶段 | 前向次数/batch | 核心优势 |
|------|---------|---------|---------|---------------|---------|
| DPO | 成对偏好 | 需要 | 2（SFT+DPO） | 4 | 闭式最优，稳定 |
| SimPO | 成对偏好 | 不需要 | 2 | 2 | 更简洁 |
| KTO | 二元反馈 | 需要 | 2 | 4 | 数据需求最低 |
| ORPO | 成对偏好 | 不需要 | 1（统一） | 2 | 流程最简 |

### 3.5 评估基准

| 基准 | 日期 | 设计哲学 | 最优性能 | 关键发现 |
|------|------|---------|---------|---------|
| [[RewardBench]] | 2024-03 | 4 维度标准化评估 | 93.8% (Skywork) | 首个标准化基准，建立评估生态 |
| [[RM-Bench]] | 2024-10 | 风格偏差干扰 | 84.0% (R3) | SOTA Hard ACC 仅 46.6%，揭示风格偏好伪装 |
| [[RMB]] | 2024-10 | Pairwise + Best-of-N | BoN 与下游正相关 | BoN 比 Pairwise 低 17.5%，更具挑战性 |
| [[JudgeBench]] | 2024-10 | 事实/逻辑正确性 | 80.86% (o3-mini) | GPT-4o 仅 50.86%，推理能力是关键 |
| [[RewardBench2]] | 2025-06 | Best-of-4 + 事实性 | 77.2% (Gemini 2.5 Flash) | 难度远高于 v1，top 仅 77.2% |

演进趋势：从静态偏好对（RewardBench）→ 风格鲁棒性（RM-Bench）→ 实际下游关联（RMB）→ 推理正确性（JudgeBench）→ 综合难度提升（RewardBench2），评估越来越逼近真实 RM 使用场景。

#### RewardBench v1 性能对比

| Model | Size | Overall | Chat | Chat Hard | Safety | Reasoning |
|-------|------|---------|------|-----------|--------|-----------|
| **Skywork-Reward-Gemma-2-27B** | 27B | **93.8** | 95.8 | **91.4** | 92.0 | 96.1 |
| J1-Qwen-32B | 32B | 93.6 | — | — | — | — |
| Skywork-Reward-Llama-3.1-8B | 8B | 92.5 | 95.8 | 87.3 | 90.6 | 96.2 |
| Nemotron-4-340B-Reward | 340B | 92.0 | 95.8 | 87.1 | 91.5 | 93.7 |
| RM-R1-Qwen-32B | 32B | 91.4 | — | — | — | — |
| R3-Qwen3-14B | 14B | 89.6 | — | — | — | — |
| ArmoRM-Llama3-8B | 8B | 89.0 | **96.9** | 76.8 | 92.2 | **97.3** |
| FLAMe-RM-24B | 24B | 87.8 | 92.2 | 75.7 | 89.6 | 93.8 |
| GPT-4-0125 | — | 84.3 | 95.3 | 74.3 | 87.2 | 86.9 |

#### RewardBench 2 性能对比（随机基线 25%）

| Model | Size | Avg | Factuality | Precise IF | Math | Safety | Focus | Ties |
|-------|------|-----|-----------|------------|------|--------|-------|------|
| **Gemini 2.5 Flash** | — | **77.2** | 65.7 | **55.3** | **81.1** | 90.9 | 86.7 | 83.4 |
| Claude Opus 4 | — | 76.5 | **82.7** | 41.9 | 74.9 | 89.5 | 86.2 | 83.7 |
| Skywork-27B | 27B | 75.8 | 73.7 | 40.3 | 70.5 | 94.2 | 93.2 | 82.6 |
| GPT-4.1 | — | 72.3 | 82.9 | 39.7 | 65.2 | 87.3 | 73.4 | 85.4 |

#### RM-Bench Hard 鲁棒性（风格偏差测试）

| Model | Size | Avg | Hard |
|-------|------|-----|------|
| Skywork-Reward-8B | 8B | 70.1 | 46.6 |
| Nemotron-340B | 340B | 69.5 | 56.1 |
| RM-R1-32B | 32B | — | — (RM-Bench 83.9 overall) |
| R3-14B | 14B | — | — (RM-Bench 84.0 overall) |

> Hard ACC < 50% 表明 RM 本质上更像 style 偏好模型而非 content 评判者。

---

## 4. 多模态理解 RM 方向

> 评估 VLM 在理解任务上的输出质量——减少幻觉、提升推理能力、对齐人类偏好。

> **与 Section 5 的区分：** Section 4 评估 VLM 的理解/推理输出（如 VQA、图像描述、多模态推理），Section 5 评估生成模型的图像/视频产出质量。两者都可能使用 VLM 架构，但评估对象不同。

### 4.1 演进脉络

```
LLaVA-RLHF (2023, 首个多模态 RLHF)
  ├── RLHF-V (2023, 段级纠错 + Dense DPO)
  │     └── RLAIF-V (2024, 开源 AI 反馈，幻觉 -82.9%)
  ├── LLaVA-Critic (2024, 首个开源多模态 Judge)
  ├── IXC-2.5-Reward (2025, ACL 2025, 通用多模态 RM)
  ├── Skywork-VL Reward (2025, VLRBench SOTA 73.1%)
  ├── R1-Reward (2025, RL 训练多模态推理 RM)
  ├── Vision-SR1 (2025, 推理分解自奖励 VLM，无需外部 RM)
  ├── VisualPRM (2025, 首个多模态过程奖励模型)
  └── VL-PRM (2025, 首个 VL-PRM 系统研究，MCTS+VLM 混合标注)
```

**演进逻辑：** 多模态理解 RM 从解决 VLM 幻觉问题起步，逐步扩展到通用评估与推理增强。LLaVA-RLHF 首次将 RLHF 引入多模态领域，RLHF-V 引入段级纠错反馈精细化评判粒度，RLAIF-V 用开源 AI 反馈替代人类标注实现规模化。随后 LLaVA-Critic 建立了开源多模态 Judge 范式，IXC-2.5-Reward 和 Skywork-VL Reward 将通用多模态 RM 推向实用水平。R1-Reward 通过 RL 训练增强推理能力，Vision-SR1 将自奖励范式引入多模态（通过视觉感知自包含性作为奖励信号，无需外部 RM），VisualPRM 将过程奖励模型扩展到多模态领域，VL-PRM 进一步系统研究了 VL-PRM 的构建方法和设计策略。

### 4.2 关键方法对比

| 方法 | 范式 | 基座 | 核心机制 | 核心指标 | 独特价值 |
|------|------|------|---------|---------|---------|
| [[LLaVA-RLHF]] | RLHF | LLaVA-1.5 13B | Fact-RLHF 事实性奖励 | MMHal-Bench 2.05 | 首个多模态 RLHF，奠定范式 |
| [[RLHF-V]] | Dense DPO | Muffin 13B | 段级纠错反馈 | 幻觉 -34.8% | 细粒度纠错信号 |
| [[RLAIF-V]] | RLAIF | LLaVA-1.5/OV | 开源 AI 反馈替代人类 | 幻觉 -82.9% | 规模化无需人工标注 |
| [[LLaVA-Critic]] | Judge | LLaVA-OV 7/72B | 直接 judge，无 CoT | ACC 0.736 | 首个开源多模态 Judge |
| [[IXC-2.5-Reward]] | Scorer | IXC-2.5 7B | 多模态偏好训练 | VLRBench 70.0% | ACL 2025，通用多模态 RM |
| [[Skywork-VL Reward]] | Scorer | Qwen2.5-VL-7B | ~190K 偏好对训练 | VLRBench 73.1% | SOTA 开源多模态 RM |
| [[R1-Reward]] | CoT-Reasoning | Qwen2.5-VL-7B | StableReinforce | VLRBench 71.92% | RL 训练解决崩溃问题 |
| [[Vision-SR1]] | Self-Reward | Qwen2.5-VL-7B | 推理分解 + 双 rollout 自奖励 | MMMU 49.1, 平均 58.8 | 自奖励多模态 RM，无需外部奖励模型 |
| [[VisualPRM]] | PRM | LLaVA-OV 7B | 400K 步骤级标注 | F1 ≈ GPT-4o | 首个多模态过程奖励模型 |
| [[VL-PRM]] | PRM | Qwen-2.5-VL 3/7B | MCTS + VLM 判断混合标注 | F1 61.9 (3B ≈ GPT-4o) | 首个 VL-PRM 系统研究，感知级监督显著提升 |

### 4.3 经验总结

**多模态 RLHF 的起源与演进（LLaVA-RLHF → RLHF-V → RLAIF-V）：**

[[LLaVA-RLHF]] 首次将 RLHF 范式引入多模态领域，提出 Fact-RLHF 方法解决 VLM 的幻觉问题。核心创新是利用事实性奖励信号替代传统人类偏好，在 MMHal-Bench 上将幻觉评分从 1.55 提升到 2.05。

[[RLHF-V]] 将反馈粒度从序列级细化到段级（segment-level），通过密集纠错反馈（Dense DPO）精准定位幻觉位置。仅用 1.4K 段级纠错数据即可将幻觉率降低 34.8%，证明了细粒度反馈的数据效率优势。

[[RLAIF-V]] 完成了从人类反馈到 AI 反馈的关键跨越，用开源 VLM 自身生成反馈信号，实现幻觉 -82.9% 的大幅消减。这验证了 Text RM 领域 RLAIF 范式在多模态中的可行性，为规模化训练扫清了数据瓶颈。

**多模态 Judge/Scorer 的兴起：**

[[LLaVA-Critic]] 建立了首个开源多模态 LMM-as-Judge 范式，在 Pairwise ACC 上超越 GPT-4V（0.736 vs 0.735），证明开源 VLM 具备评估能力。[[IXC-2.5-Reward]] 在 ACL 2025 提出通用多模态 RM，VLRBench 达 70.0%。[[Skywork-VL Reward]] 进一步将 VLRBench 推至 73.1%，成为当前 SOTA 开源多模态理解 RM。

**多模态推理 RM：**

[[R1-Reward]] 通过 StableReinforce（Pre-CLIP 过滤、优势过滤、一致性奖励）解决 VLM RM 的 RL 训练崩溃问题，在 VL-RewardBench 上超越 GPT-4o 约 10%（71.92% vs 65.8%），majority voting@15 可达 76.46%。

[[VisualPRM]] 将 Text RM 的过程奖励模型范式迁移到多模态领域，收集 400K 步骤级标注训练首个多模态 PRM。在多步推理任务中，步骤级验证的 F1 接近 GPT-4o 水平，验证了 PRM800K/Math-Shepherd 的过程监督理念在视觉推理中同样有效。[[VL-PRM]] 进一步系统研究了 VL-PRM 的设计策略，提出 MCTS + VLM 判断的混合数据合成框架构建 VL-PRM300K（290K 样本，1.32M 步骤级标注），发现三个关键洞察：(1) VL-PRM 作为 ORM 使用时反而优于过程级引导；(2) 3B 小模型在错误检测上已与 GPT-4o 竞争力相当（F1 61.9 vs 60.3）；(3) 感知级监督是提升性能的关键（F1 33.3→66.8）。

**多模态自奖励：**

[[Vision-SR1]] 将 Text RM 的 Self-Rewarding 范式引入多模态领域。核心思路是将 VLM 推理分解为视觉感知（See）和语言推理（Think）两阶段，通过双 rollout 检验视觉感知描述的"自包含性"——如果仅靠模型生成的视觉描述（不给图像）就能正确回答问题，则说明感知质量高。总奖励 $r = r_{visual} + r_{ans} + \alpha \cdot r_{fmt}$。在多个 VL 基准上超越 Vision-R1（平均 58.8 vs 57.4），且语言捷径率从 7.9% 降至 6.7%。

**关键经验：**
- **幻觉消减是多模态理解 RM 的核心驱动力**：从 LLaVA-RLHF 到 RLAIF-V，幻觉率从基线降低 82.9%，反馈粒度从序列级→段级→AI 自动化逐步演进
- **开源 AI 反馈可替代人类反馈**：RLAIF-V 验证了 Text RM 领域 RLAIF 范式的多模态迁移
- **自奖励是可行的多模态替代方案**：Vision-SR1 证明通过推理分解实现自奖励，无需外部 RM
- **步骤级验证在视觉推理中同样有效**：VisualPRM 和 VL-PRM 将 PRM 范式成功迁移到多模态，且小模型（3B）在错误检测上已与 GPT-4o 竞争
- **RL 训练需要专门的稳定化技术**：R1-Reward 的 StableReinforce 是当前最佳实践

### 4.4 评估基准

| 基准 | 日期 | 覆盖范围 | 最优性能 | 关键发现 |
|------|------|---------|---------|---------|
| [[VL-RewardBench]] | 2024-11 | 3 领域 VL 偏好（理解为主） | 76.46% (R1-Reward voting) | 感知而非推理是核心瓶颈 |
| [[VideoRewardBench]] | 2025-08 | 5 维度视频评估 | 63.6% (Gemini 2.5 Pro) | RL 训练不一定跨模态泛化 |
| [[MMRB2]] | 2025-12 | 全模态 4 任务类型（跨类别） | 76.3% (Gemini) | 首个全模态 RM 基准，覆盖理解+生成 |

**当前状态：** 多模态理解 RM 基准仍较少且样本量有限（VL-RewardBench 1250 对，MMRB2 4K 对），最优开源模型已接近但未超越闭源水平。MMRB2 是跨类别基准，同时覆盖理解和生成评估。

#### 性能横评

##### VL-RewardBench 性能对比

| Model | Size | Overall |
|-------|------|---------|
| **R1-Reward Voting@15** | 7B | **76.46** |
| Skywork-VL Reward | 7B | 73.1 |
| R1-Reward | 7B | 71.92 |
| IXC-2.5-Reward | 7B | 70.0 |
| Gemini-1.5-Pro | — | 67.2 |
| GPT-4o | — | 65.8 |
| Claude-3.5-Sonnet | — | 55.3 |
| LLaVA-Critic | 7B | 46.9 |

### 4.5 当前瓶颈

- **感知 vs 推理能力分布不均**：VL-RewardBench 揭示感知（而非推理）是核心瓶颈——模型在"看清楚"上仍有差距
- **幻觉消减的天花板**：RLAIF-V 的 -82.9% 已很显著，但剩余幻觉更难消除，需要更深层的事实性理解
- **推理效率**：CoT 推理的 judge mode 比 scorer mode 慢 ~10x，不适合在线 RL 场景
- **跨模态泛化**：VideoRewardBench 发现 RL 训练不一定带来跨模态泛化优势
- **过程奖励的数据瓶颈**：VisualPRM 的 400K 步骤级标注成本高，自动化标注方法尚待探索

---

## 5. 图像/视频生成 RM 方向

> 评估生成模型产出的图像/视频质量——对齐度、美学、物理一致性、运动质量等。

### 5.1 Image RM 演进

```
CLIPScore (2021, 零样本 CLIP 余弦相似度)
  │
  ├── HPS (2023-03, 首个人类偏好微调 CLIP)
  │     └── HPSv2 (2023-06, 偏差纠正 + 大规模数据)
  │           ├── HPSv3 (2025-08, VLM 全参微调 — 范式升级)
  │           └── HP-Score (2025-07, image-only HP 分数，揭示 CLIP 偏差)
  │
  ├── ImageReward (2023-04, CLIP + reward head)
  │
  ├── PickScore (2023-05, 真实用户偏好, 超人类)
  │
  ├── LLaVA-Reward (2025-07, MLLM 隐状态 RM, ICCV 2025)
  │
  ├── Q-Align (2023-12, 离散等级 VLM scorer)
  │
  └── RichHF (2023-12, 多维度富反馈)
```

**关键转折：CLIP → VLM。** 2021-2023 年的图像 RM 基本都基于 CLIP 架构微调。[[HPSv3]]（2025）用 Qwen2VL-7B 全参微调在 1.5M 数据上训练，Spearman 相关达 0.94、CoHP win rate 87%，全面碾压所有 CLIP-based 方法。这证实 VLM 的语义理解、组合性推理和指令跟随能力远超 CLIP embedding 空间所能提供的。

**偏好预测准确率对比：**

| 模型 | Pick-a-Pic ACC | 基座 | 方法 |
|------|---------------|------|------|
| **PickScore** | **70.5%** | CLIP-H | 真实用户偏好微调 |
| HPS | 66.7% | CLIP ViT-L | Discord 社区偏好 |
| ImageReward | 61.1% | CLIP + head | 专家标注 |
| CLIP-H | 60.8% | CLIP-H | 零样本 |
| Human Expert | 68.0% | -- | 人类标注者 |

**评估方法创新：**
- [[TIFA]]：开创 QG+VQA 评估范式，将忠实度分解为逐元素可验证问题，是 VQAScore 的前身
- [[GenEval]]：基于目标检测的组合性评估，与人类一致 83%，揭示位置（15%）和属性绑定（35%）是最难任务
- [[Q-Align]]：用离散文本等级训练 VLM 做视觉评分，OneAlign 统一 IQA/IAA/VQA 三任务均达 SOTA（KonIQ SRCC 0.941）
- [[RichHF]]：多维度富反馈（区域热力图 + 文本错位 + 多维评分），提供超越标量分数的丰富信号

### 5.2 Video RM 演进

```
VideoScore (2024-06, 首个多维视频 RM)
  │
  ├── VideoAlign (2025-01, BTT 损失处理 tie)
  │
  ├── LiFT (2024-12, 评分 + 推理双反馈)
  │
  ├── SoliReward (2025-12, 物理评估 + BT-WT 损失)
  │
  └── LatentRM (2025-11, 潜空间 RM — 新范式)
```

**Video RM 面临的独特挑战：**
1. 时序建模需求（CLIP 无法处理）
2. 偏好数据严重不足（最大的 VideoFeedback 仅 37.6K）
3. 人类标注噪声大（标注者间一致率通常仅 60-75%）
4. 物理一致性评估极难（VideoPhy 最优 39.6%）

**关键方法进展：**

| 方法 | 核心创新 | 关键指标 |
|------|---------|---------|
| [[VideoScore]] | 首个多维视频 RM + VideoFeedback 数据集 | Spearman 77.1 |
| [[VideoAlign]] | BTT 损失处理 tie 样本（大部分工作直接丢弃 tie） | VideoGen-RB 61.26% |
| [[LiFT]] | 评分 + 推理双反馈，VILA 40B 基座 | CogVideoX-2B > 5B on VBench |
| [[SoliReward]] | BT-WT 损失 + HPQA 多层渐进聚合 | OOD ACC 80.08% |
| [[LatentRM]] | 复用 VGM 前 8 层做潜空间 RM，无需 VAE 解码 | Dynamic Degree +46 |

**LatentRM 的潜空间新范式：** 核心洞察是预训练视频生成模型天然适合在噪声潜空间中做 RM，因为它被训练来处理任意时间步的噪声潜变量。对比 RGB ReFL：全帧处理不 OOM（66.81 GB vs OOM），1.42x 加速，运动质量 Dynamic Degree +46 vs +16。这为视频生成后训练提供了高效新路径。

### 5.3 VLM-based 生成评估

> 用 VLM 评估生成图像/视频质量——与 Section 4 理解 RM 使用相同的 VLM 架构，但评估对象是生成模型的产出。

```
VisionReward (2024-12, 层次化分解评估生成质量)
  │
UnifiedReward (2025-03, 统一 T2I/T2V 生成评估)
  ├── UnifiedReward-Think (2025-05, +CoT 推理增强)
  │     └── UnifiedReward-Flex (2026-02, +动态维度 +Pref-GRPO)
  │
  ├── RewardDance (2025-09, 生成式 RM，抗 reward hacking)
  │
  ├── VR-Thinker (2025-10, thinking-with-image 视频评估)
  │
  ├── PIGReward (2025-11, 个性化 T2I RM，动态评估维度)
  │
  └── FIRM (2026-03, 编辑/生成鲁棒 RM，Base-and-Bonus 防 reward hacking)
```

**核心方法对比：**

| 方法 | 范式 | 基座 | 核心机制 | 核心指标 | 独特价值 |
|------|------|------|---------|---------|---------|
| [[VisionReward]] | Scorer | CogVLM2 | 61-64 binary Q 分解 | MonetBench tau=72.1 | 层次化评估维度，可解释 |
| [[UnifiedReward]] | Unified | LLaVA-OV 7B | T2I/T2V 统一训练 | VLRBench 66.1% | 跨任务协同效应 |
| [[UnifiedReward-Think]] | CoT/Unified | LLaVA-OV 7B | +蒸馏 CoT + RS + GRPO | VLRBench 73.8% | +7.7% 绝对提升 |
| [[UnifiedReward-Flex]] | CoT/Unified | Qwen3-VL 2-32B | +动态维度 + Pref-GRPO | MMRB2 +3.2 | 维度自适应 |
| [[RewardDance]] | Generative | InternVL 1-26B | reward = P("yes") | FLUX +6.6 | 抗 reward hacking |
| [[VR-Thinker]] | CoT-Reasoning | Qwen2.5-VL-7B | thinking-with-image | VideoGen-RB 80.5% | 视频推理主动回溯 |
| [[LLaVA-Reward]] | Scorer | Phi-3.5-vision 4.2B | MLLM 隐状态 + SkipCA | MJ-Bench 对齐 66.2% | ICCV 2025，高效 T2I RM (0.35s/eval) |
| [[HP-Score]] | Scorer | CLIP-H 微调 | Image-only 偏好 + ICT 分数 | 准确率 88.84% | 揭示 CLIP 偏差，细节丰富图像被不当惩罚 |
| [[PIGReward]] | CoT/Personalized | Qwen2-VL-7B | 动态维度 + 自引导 CoT | PIGBench 84.91% | 个性化 T2I RM，无需用户特定训练 |
| [[FIRM]] | Scorer/Generative | Qwen3-VL-8B | Difference-First + Plan-Then-Score | Edit MAE 0.53 (超 GPT-5) | 编辑/生成专用 RM + Base-and-Bonus 防 reward hacking |

**UnifiedReward 三代演进的核心洞察：**

| 版本 | 基座 | 核心改进 | VLRBench | 放弃的 |
|------|------|---------|----------|--------|
| v1 | LLaVA-OV 7B | 首次统一 T2I/T2V 生成评估 | 66.1% | -- |
| Think | LLaVA-OV 7B | +CoT（蒸馏+RS+GRPO） | 73.8% | -- |
| Flex | Qwen3-VL 2-32B | +动态维度 +Pref-GRPO | MMRB2 +3.2 | 理解任务 |

- **CoT 是最有效的单一改进**：v1 → Think 提升 +7.7%，且无需额外人工标注，仅靠蒸馏 + 拒绝采样 + GRPO 三阶段即可获得
- **动态维度优于固定维度**：Flex 的 Pref-GRPO 让模型自主学习评估标准
- **专注生成更优**：v1 验证理解 ↔ 生成正迁移，但 Flex 放弃理解任务后分数更高

**RewardDance 的抗 reward hacking：** 生成式 RM（reward = P("yes")）在 DPO/RL 后训练中比 scorer 更抗 reward hacking。在 FLUX.1-dev 和 Seedance T2V 上验证：Seedance T2V +49% 且无明显退化。模型 1B→26B 和上下文扩展均可有效 scaling。

**VR-Thinker 的 thinking-with-image 创新：** 让视频 RM 在推理过程中主动回溯获取视觉证据。滑动窗口记忆解决上下文膨胀，三阶段训练 + 四种奖励信号。7B 模型全面超越 13B 基线，VideoGen-RB 达 80.5%。

### 5.4 关键方法对比（三条路线）

| 维度 | CLIP-based Scorer | VLM-based 生成评估 | 潜空间 RM |
|------|------------------|--------------------|----------|
| 代表 | HPS, ImageReward, PickScore, HPSv2, HPSv3, HP-Score, LLaVA-Reward | UnifiedReward 系列, RewardDance, VR-Thinker, PIGReward, FIRM | LatentRM |
| 精度 | 中-高（HPSv3: 0.94） | 高（可解释） | 中高 |
| 推理速度 | 最快 | 中（scorer）/ 慢（CoT judge） | 最快 |
| 可解释性 | 低 | 高（CoT 推理链 + 维度分解） | 低 |
| 视频支持 | 差（CLIP 无时序），HPSv3 不支持 | 好（原生） | 好（原生） |
| 训练成本 | 低 | 中-高 | 低（复用 VGM） |
| 抗 reward hacking | 低 | 高（RewardDance 验证） | 中 |

**基座升级的性能跃迁：**

| 时期 | 基座 | 代表工作 | 典型性能 |
|------|------|---------|---------|
| 2021-2023 | CLIP ViT | CLIPScore, HPS, ImageReward, PickScore, HPSv2 | Spearman ~0.7 |
| 2024 | 小型 VLM | VideoScore (Idefics2-8B), Q-Align (mPLUG-Owl-2) | Spearman ~0.77 |
| 2025+ | 大型 VLM | HPSv3 (Qwen2VL-7B), UnifiedReward-Flex (Qwen3-VL) | Spearman **0.94** |

### 5.5 经验总结

**CLIP → VLM 升级的性能跃迁：** [[HPSv3]] Spearman 0.94 vs CLIP-based 方法 ~0.7，证实 VLM 全参微调是当前图像 scorer 的最优路线。但 HPSv3 不支持视频，也不提供可解释反馈。

**视频偏好数据严重不足：** 最大的 VideoFeedback 仅 37.6K，远小于图像领域的 Pick-a-Pic 583K 或 HPDv3 1.5M。这是制约 Video RM 发展的核心瓶颈。

**物理一致性是 Video RM 的最大缺口：** [[VideoPhy]] 揭示所有 T2V 模型在物理常识维度表现堪忧（最优 39.6%）。[[SoliReward]] 的 BT-WT 损失 + 渐进聚合在 OOD 上达 80.08%，但仍有 ~20% 误判。物理理解需要超越视觉表面的深层推理。

**RichHF 的多维度反馈：** [[RichHF]] 提供了超越标量分数的丰富信号（区域热力图 + 文本错位 + 多维评分），为训练更精细的 RM 提供了数据范式参考。

**LatentRM 的潜空间新范式：** [[LatentRM]] 证明复用视频生成模型本身做 RM 是可行且高效的。这开辟了一条绕开 VLM 的技术路线，特别适合生成模型后训练场景。

**CLIP 偏差与 Image-only 评估：** [[HP-Score]] 发现基于 CLIP/BLIP 的 RM 会不当惩罚细节丰富的高质量图像——过度依赖文本-图像对齐使得超出 prompt 描述的丰富内容反而被扣分。Image-only HP 分数（不依赖文本输入）和 ICT 分数联合使用后准确率从 79% 提升到 88.84%。

**高效 MLLM-based T2I RM：** [[LLaVA-Reward]]（ICCV 2025）通过直接利用 MLLM 隐状态 + SkipCA 模块绕过文本生成过程，实现 0.35s/eval 的高效 T2I 评估，支持配对和非配对两种偏好数据格式。

**个性化评估新方向：** [[PIGReward]] 开辟了个性化 T2I 奖励建模方向，通过动态生成用户条件化的评估维度和 CoT 推理实现个性化评估，无需用户特定训练。在 PIGBench 上大幅超越 GPT-4o（84.91% vs 68.29%）。

**编辑/生成鲁棒 RM：** [[FIRM]] 针对图像编辑和生成分别设计专用 RM（Difference-First 和 Plan-Then-Score 数据构建策略），核心创新是 Base-and-Bonus 乘法奖励公式（如 $R_{CME} = \text{Execution} \times (0.6 + 0.4 \times \text{Consistency})$），有效防止 reward hacking。8B 模型在编辑任务上超越 GPT-5（MAE 0.53 vs 0.62）。

**Tie 样本处理：** 大部分工作直接丢弃 tie 样本，[[VideoAlign]] 的 BTT 损失和 [[SoliReward]] 的 BT-WT 损失是少有的处理方案。

#### 性能横评

##### Image RM 偏好预测性能

| Model | Base | Spearman | Kendall |
|-------|------|----------|---------|
| **HPSv3** | Qwen2VL-7B | **0.94** | **0.82** |
| HPSv2 | CLIP | 0.87 | 0.76 |
| PickScore | CLIP-H | 0.81 | 0.63 |

##### Video RM 性能对比 (GenAI-Bench Video)

| Model | Size | tau | diff |
|-------|------|-----|------|
| **VR-Thinker** | 7B | **68.7** | **82.3** |
| UnifiedReward-Think | 7B | 64.7 | 80.4 |
| UnifiedReward | 7B | 61.2 | 76.8 |
| VisionReward | 13B | 52.6 | 72.7 |
| VideoScore | 7B | 47.5 | 70.9 |

##### VideoScore on VideoFeedback (Spearman ρ)

| Model | Avg | Visual Q | Temporal | Dynamic | T2V Align | Factual |
|-------|-----|----------|----------|---------|-----------|---------|
| **VideoScore** | **77.1** | **86.2** | 80.3 | **77.6** | 59.4 | 82.1 |
| GPT-4o | 23.0 | 35.2 | 29.5 | 38.0 | 26.6 | 32.4 |

### 5.6 评估基准

**RM 评估基准（+ generation-evaluation/ 交叉引用）：**

| 基准 | 日期 | 评估维度 | 最优指标 | 关键发现 |
|------|------|---------|---------|---------|
| [[MJ-Bench]] | 2024-07 | 4 维（含 safety/bias） | GPT-4o 整体最优 | Scorer 在 quality 抗衡 VLM，但 safety 上 VLM 显著占优 |

**生成评估基准（→generation-evaluation/，交叉引用）：**

*T2I 评估：*

| 基准 | 日期 | 评估维度 | 最优指标 | 关键发现 |
|------|------|---------|---------|---------|
| [[T2I-CompBench]] | 2023-07 | 组合性（6 维） | B-VQA tau=0.63 | 首个组合性 T2I 基准 |
| [[GenEval]] | 2023-10 | 组合性（检测） | 人类一致 83% | 位置和属性绑定是最难任务 |
| [[GenAI-Bench]] | 2024-06 | 组合性 | VQAScore 最高相关 | VQAScore 超越所有先前指标 |

*Video 评估：*

| 基准 | 日期 | 评估维度 | 最优性能 | 关键发现 |
|------|------|---------|---------|---------|
| [[VBench]] | 2023-11 | 16 维度 | 高人类相关性 | 首个综合视频生成基准 |
| [[EvalCrafter]] | 2023-10 | 4 维 17 指标 | 高人类对齐相关性 | 首个系统性 T2V 评估框架 |
| [[VideoPhy]] | 2024-06 | 物理常识 | 39.6% (CogVideoX-5B) | T2V 模型严重缺乏物理常识 |

### 5.7 下游应用：RM 驱动的生成模型后训练

Image/Video RM 的核心价值在于驱动生成模型的后训练对齐。知识库中三项代表性工作：

| 方法 | 模态 | RM 信号来源 | 核心结果 |
|------|------|-----------|---------|
| [[DDPO]] | Image | 在线 RL（CLIP/Aesthetic 等） | 首次将 RLHF 范式应用于 Diffusion 模型 |
| [[Diffusion-DPO]] | Image | 离线偏好对（Pick-a-Pic） | 将 DPO 推广到扩散模型，无需在线 RM |
| [[T2V-Turbo]] | Video | 奖励引导蒸馏 | 用 RM 引导 T2V 模型蒸馏加速 |

**RM 在后训练中的三种使用模式：**
1. **在线 RL（DDPO）**：需要高效 scorer（~100 samples/s），精度可容忍中等
2. **离线 DPO（Diffusion-DPO）**：需要高质量偏好数据，RM 用于数据筛选
3. **奖励蒸馏（T2V-Turbo）**：RM 信号在蒸馏过程中引导学生模型

这三种模式对 RM 的需求不同：在线 RL 需要速度，离线 DPO 需要精度，蒸馏需要稳定梯度。统一 RM 的双模式设计（Scorer + Judge）可以覆盖前两种场景。

### 5.8 公司实践：工业级 RM 设计与后训练

> 来自 image-generation-posttrain 目录的三份工业技术报告，展示了主流公司如何在商用系统中使用 RM 驱动后训练。

#### 关键系统对比

| 系统 | 公司 | 模态 | RM 架构 | RM 维度 | 后训练流程 | 核心结果 |
|------|------|------|---------|---------|-----------|---------|
| [[HunyuanVideo]] | Tencent | Video | VLM-based 4维 RM | 文本对齐/图像对齐/视觉质量/运动动态 | CT→SFT→RLHF (DPO+MixGRPO) | 开源 T2V/I2V SOTA |
| [[Seedance]] | ByteDance | Video | 3个专用 RM（基础/运动/美学） | 基础能力/运动质量/美学 | CT→SFT→RLHF | Artificial Analysis 双赛道第一 |
| [[Seedream]] | ByteDance | Image | VLM-based RM (1B→>20B) | 多维度生成式评估 | CT→SFT→RLHF→PE | ELO 1158，全指标第一 |

#### 共性模式

1. **统一采用 CT→SFT→RLHF 三阶段流水线**：三家公司不约而同地采用了继续训练→监督微调→人类反馈对齐的渐进式后训练流程，这已成为生成模型后训练的事实标准
2. **VLM-based RM 是核心共识**：HunyuanVideo 和 Seedream 均明确使用 VLM 作为 RM 基座，Seedance 的 Foundational RM 同样基于 VLM。CLIP-based RM 在工业实践中已被淘汰
3. **多维度解耦评估**：三家公司均将评估拆分为多个独立维度（文本对齐、视觉质量、运动、美学等），而非使用单一综合分数
4. **差异化 RLHF 策略**：HunyuanVideo 对 I2V 用在线 RL、T2V 用先 DPO 后在线 RL；Seedance 同时优化 base model 和 super-resolution model；Seedream 使用生成式 RM（P("Yes") 概率）

#### 核心洞察

**RM Scaling 有涌现效应：** [[Seedream]] 系统地将 VLM-based RM 从 1B 扩展到 >20B 参数，观察到奖励建模性能与 RM 容量正相关的涌现现象。更大的 RM 更准确地捕捉人类偏好的细微差异，驱动后训练产出更高质量的内容。

**T2V 的 RM 困境：** [[HunyuanVideo]] 明确指出"现有奖励模型难以有效区分细粒度运动质量"，因此 T2V 任务需要先通过 DPO（利用人工标注偏好对）建立好的策略起点，再用在线 RL 进一步优化。这揭示了当前 Video RM 在运动质量评估上的根本瓶颈。

**多维度标注策略：** [[Seedance]] 的"多维度标注"方法确保在单一维度上选择最佳/最差视频时，最佳视频在其他维度上不劣于最差视频，优雅地解决了多目标优化中的维度冲突问题。

**跨模态 RM 复用：** [[Seedance]] 的 Aesthetic RM 受 [[Seedream]] 启发，基于图像空间设计，通过提取视频关键帧来评估视频美学质量——这是图像 RM 向视频迁移的实用范例。

#### 对统一 RM 设计的启示

| 工业经验 | 来源 | 统一 RM 迁移方向 |
|---------|------|----------------|
| VLM-based RM 已成标准 | 三家共识 | Qwen3-VL-7B 基座选择正确 |
| 多维度解耦 > 单一分数 | 三家共识 | Level 1/2/3 维度设计合理 |
| RM scaling 有涌现效应 | Seedream (1B→>20B) | 7B→32B 路线可期 |
| T2V RM 在运动评估上有瓶颈 | HunyuanVideo | 需要专项运动维度训练 |
| DPO + 在线 RL 混合最佳 | HunyuanVideo | 双模式架构的必要性 |
| 图像 RM 可迁移到视频 | Seedance (美学 RM) | 利用 Image RM 数据优势 |

---

## 6. 三方向交汇：统一 RM 设计

### 6.1 三方向的互补关系

```
Text RM 经验 → 迁移到生成 RM
  ├── CoT / Rubric → 生成 RM 的推理框架（UnifiedReward-Think 验证）
  ├── RLAIF / Self-Rewarding → 合成数据策略（RLAIF-V 验证）
  ├── GenRM → 生成式 RM 范式（RewardDance 验证）
  ├── PRM 过程监督 → 视频帧级/阶段级评估（VisualPRM 验证）
  └── ArmoRM MoE → 多维度门控聚合

多模态理解 RM 提供基座能力
  ├── 幻觉消减（LLaVA-RLHF → RLAIF-V）→ 生成 RM 的事实性保证
  ├── VLM 评估范式（LLaVA-Critic）→ 生成 RM 的 judge 能力
  ├── RL 训练稳定化（R1-Reward）→ 生成 RM 的 RL 精调
  ├── 自奖励范式（Vision-SR1）→ 无需外部 RM 的自训练
  └── 过程奖励（VisualPRM, VL-PRM）→ 视频多步评估

图像/视频生成 RM 是最终目标
  ├── 高精度 scoring（HPSv3 0.94, HP-Score 揭示 CLIP 偏差）
  ├── 高效 MLLM RM（LLaVA-Reward 0.35s/eval）
  ├── VLM-based 生成评估（UnifiedReward 系列、RewardDance、FIRM）
  ├── 个性化评估（PIGReward 动态维度）
  ├── 物理一致性（SoliReward）
  ├── 潜空间建模（LatentRM）
  └── 大规模偏好数据（HPDv3 1.5M）
```

### 6.2 统一 RM 设计方案

> **以下是基于上述 100 篇论文调研的具体设计方案，不是文献综述而是可执行的工程计划。**

#### 设计目标

一个支持 image + video 的统一 reward model，满足：
1. **模态统一**：单一模型评估 T2I 和 T2V 生成质量
2. **双模式推理**：高效 scorer（用于在线 RL）+ 可解释 judge（用于离线评估）
3. **维度自适应**：根据输入内容动态选择评估标准
4. **8x H100 可训练**：模型规模 <= 32B

#### 基座模型选择

| 候选 | 原生视频 | 已验证 RM 应用 | 参数规模 | 8x H100 | 推荐度 |
|------|---------|--------------|---------|---------|--------|
| **Qwen3-VL** | 是 | UnifiedReward-Flex | 2B/8B/32B | 7B 全参, 32B LoRA | 最高 |
| Qwen2.5-VL | 是 | R1-Reward, HPSv3, VR-Thinker | 2B/7B/72B | 7B 全参 | 高 |
| InternVL 2.5/3 | 是 | RewardDance | 1B-78B | 8B 全参, 26B LoRA | 高 |
| LLaVA-OneVision | 弱 | UnifiedReward v1/Think | 0.5B/7B/72B | 7B 全参 | 中高 |

**推荐：Qwen3-VL-7B。** UnifiedReward-Flex 已验证其作为统一 RM 基座的有效性，原生支持任意分辨率图像和任意长度视频，7B 在 8x H100 上可全参训练。

#### 双模式架构

```
输入: (prompt, image/video, [reference])
  │
  ├── Scorer Mode (system prompt 切换)
  │     └── 单次前向传播 -> 标量分数
  │         a) RewardDance 式: P("yes") 作为分数
  │         b) 回归头: 最后一层 linear head (ArmoRM 式)
  │         用途: 在线 RL, Best-of-N 重排序
  │
  └── Judge Mode (system prompt 切换)
        └── 自回归生成 -> CoT 推理链 + 多维度分数
            Step 1: 动态生成评估维度 (Flex 式)
            Step 2: 逐维度推理评估 (CoT)
            Step 3: 汇总为结构化评分
            用途: 离线评估, 数据筛选, 可解释反馈
```

**设计依据：**
- 纯 scorer：HPSv3 精度高但不可解释，RM-Bench Hard ACC 46.6% 暴露风格偏差
- 纯 judge：UnifiedReward-Flex 精度好但推理 ~10x 慢，不适合在线 RL
- 双模式结合 ArmoRM 多目标分解 + Flex 动态维度 + RewardDance 生成式评分
- VR-Thinker 的 thinking-with-image 可作为 Judge Mode 增强

#### 评估维度设计

```
Level 0: overall_score（加权聚合）

Level 1 (通用维度，image + video 共享):
  ├── alignment:  prompt 与内容的语义一致性
  ├── quality:    视觉质量（清晰度、噪点、伪影）
  └── aesthetic:  美学质量（构图、色彩、风格）

Level 2 (模态特化维度):
  ├── [Image] composition, detail, text_rendering, style_fidelity
  └── [Video] temporal_consistency, motion_quality, physics, dynamics

Level 3 (任务特化，动态生成):
  └── 由模型根据具体 prompt 自动生成 (Flex 方案)
```

#### 训练数据策略

**已有数据源：**

| 数据源 | 模态 | 规模 | 质量 | 可用性 |
|--------|------|------|------|--------|
| HPDv3 | Image | 1.5M pairwise | 高 | 待确认 |
| Pick-a-Pic | Image | 583K pairwise | 中 | 开源 |
| ImageReward 数据 | Image | 137K comparisons | 高 | 开源 |
| VideoFeedback | Video | 37.6K × 5 dims | 中 | 开源 |
| LiFT-HRA | Video | ~10K | 高 | 待确认 |
| VideoAlign 数据 | Video | 182K triplets | 中高 | 待确认 |
| UnifiedReward SFT-90K | Multi | 90K | 高 | 待确认 |
| R1-Reward-200K | Multi | 200K | 中高 | 待确认 |

**数据构建 Pipeline：**

```
Phase A: 种子数据 (~100K)
  ├── Image 偏好: Pick-a-Pic + HPDv3 精选 ~50K
  ├── Video 偏好: VideoFeedback + 多模型生成 ~30K
  └── CoT 推理链: GPT-4o 生成 ~20K

Phase B: SFT -> 初版 RM

Phase C: 合成扩增 (~500K)
  ├── 初版 RM 筛选大规模数据
  ├── 拒绝采样保留高质量 CoT
  └── 参考 Nemotron-4: 合成偏好对

Phase D: RL 精调 (GRPO/StableReinforce) -> 最终 RM

Phase E: 迭代（用最终 RM 重新标注 -> 重训）
```

**Video 数据不足的解决方案：**
1. 多模型生成：同一 prompt 用 5-8 个 T2V 模型生成视频，构建偏好对
2. 帧级到视频级：利用 image 偏好数据评估关键帧，聚合到视频级
3. 物理场景专项：针对 VideoPhy 问题，专门收集物理相关评估数据
4. GPT-4o 初标注：AI 标注 + 人类验证高分歧样本

#### 训练方案

```
Stage 1: SFT 预热 (1-2 天, 8x H100)
  ├── Qwen3-VL-7B 全参微调, lr=1e-5, 3 epochs
  ├── 数据: ~80K (scorer mode + judge mode 统一格式)
  └── 输出: 具备基础评估能力的 SFT 模型

Stage 2: RL 精调 (2-3 天, 8x H100)
  ├── GRPO / StableReinforce
  ├── 奖励信号: Pref-GRPO + Consistency + CoT Gain
  └── 输出: CoT 质量和维度自适应提升的 RL 模型

Stage 3: 合成扩增 + 迭代 (3-5 天)
  ├── Stage 2 模型生成大规模 CoT
  ├── 拒绝采样 + 扩增到 ~500K
  └── 重新 SFT + RL 迭代 1-2 轮
```

**资源分配：**

| 阶段 | 方法 | GPU 天数 |
|------|------|---------|
| SFT | 全参 (ZeRO-3) | 1-2 |
| RL (GRPO) | 全参 | 2-3 |
| 合成数据生成 | vLLM 推理 | 1-2 |
| 32B 验证 | LoRA | 2-3 |
| **总计** | | **~10-15** |

#### 评估方案

| 基准 | 模态 | 目标 |
|------|------|------|
| MMRB2 | Multi | 超越 UnifiedReward-Flex |
| VL-RewardBench | Multimodal | 超越 R1-Reward (71.92%) |
| VideoRewardBench | Video | 超越 63.6% top |
| GenAI-Bench | Image+Video | 超越 VQAScore |
| MJ-Bench | Image | 接近 GPT-4o |
| VBench | Video | 作为 T2V RM 的后训练增益 |
| VideoPhy | Video | 超越 39.6% baseline |
| RewardBench2 | Text | 作为副产品评估 |

### 6.3 工业实践验证的设计决策

基于 HunyuanVideo、Seedance、Seedream 三份工业技术报告，以下设计决策已获得工业验证：

| 设计决策 | 验证来源 | 置信度 |
|---------|---------|--------|
| Qwen-VL 系列作为 RM 基座 | Seedream (VLM-based), HPSv3 (Qwen2VL-7B) | 最高 |
| 多维度解耦评估 | HunyuanVideo (4维), Seedance (3维) | 最高 |
| CT→SFT→RLHF 渐进训练 | 三家共识 | 最高 |
| DPO + 在线 RL 混合策略 | HunyuanVideo (T2V) | 高 |
| RM scaling (7B→32B) | Seedream (1B→>20B 涌现) | 高 |
| 图像 RM 迁移到视频 | Seedance (美学 RM 关键帧) | 中高 |

**PRM 思路的视频迁移可能性：** PRM800K 和 Math-Shepherd 证明步骤级过程监督显著优于结果监督。在视频 RM 中，"步骤"可类比为"帧/片段/阶段"——对视频的渐进性评估（如开头→中段→结尾的质量变化）可能比整体评分更有效。SoliReward 的 HPQA 多层渐进聚合和 VR-Thinker 的主动回溯已有初步探索，但尚未有工作系统地将 PRM 范式迁移到视频评估。

### 6.4 开放问题

**理解 vs 生成：是否需要理解任务？**

| 方案 | 支持证据 | 风险 |
|------|---------|------|
| 包含理解 | UnifiedReward v1: 正迁移 | 稀释生成评估性能 |
| 仅生成 | Flex: 放弃理解后更高 | 可能丧失泛化 |
| 分阶段 | 先含理解预训练，后专注生成 | 复杂度增加 |

建议仅生成评估。Flex 实验表明专注生成评估更优，且理解任务已有大量开源 benchmark 覆盖。

**长视频评估：**

| 方案 | 思路 | 已有验证 |
|------|------|---------|
| VR-Thinker 式 | thinking-with-image，主动选帧 | 已验证有效 |
| SoliReward 式 | HPQA 多层渐进聚合 | 已验证有效 |
| 片段采样+聚合 | 均匀采样分别评估 | 可能遗漏关键帧 |

建议先用 Qwen3-VL 原生视频处理，不足时借鉴 VR-Thinker。

**物理一致性：**

| 方案 | 可行性 | 参考 |
|------|--------|------|
| VLM implicit 物理知识 | 中 | SoliReward OOD 80% |
| 专用 physics 维度 | 高 | Level 2 加入 physics，针对性训练 |
| 潜空间物理理解 | 中高 | LatentRM DiT 特征含运动信息 |

建议在 Level 2 加入 physics 维度，用 VideoPhy 标注 + SoliReward 策略增强。

**推理效率：**

| 方案 | 速度 (8x H100) | 精度 | 推荐场景 |
|------|----------------|------|---------|
| 7B Scorer mode | ~100 samples/s | 中高 | 在线 RL |
| 7B Judge mode | ~10 samples/s | 高 | 离线评估 |
| 2B 蒸馏 | ~300 samples/s | 中 | 速度优先 |
| LatentRM | 极高 | 中高 | 生成模型后训练 |

**评估基准缺口：** 现有基准覆盖不完整——MMRB2 样本少（4K），VideoRewardBench 最优仅 63.6%，MJ-Bench 仅 image。可能需要构建 Image+Video 统一 RM Benchmark（1000 image + 1000 video，覆盖 alignment/quality/aesthetic/physics/composition，3+ 人类标注，easy/medium/hard 分层）。

---

## 7. 推荐执行路线

```
Week 1-2: 数据构建
  ├── 收集/清洗 Image 偏好数据 (~50K from Pick-a-Pic + HPDv3)
  ├── 构建 Video 偏好数据 (~30K, 多模型生成 + GPT-4o 初标注)
  └── GPT-4o 生成 CoT 推理链 (~20K)

Week 3: SFT 训练
  ├── Qwen3-VL-7B 全参微调
  ├── 统一格式: scorer mode + judge mode
  └── 评估: MMRB2, VL-RewardBench, VideoRewardBench, GenAI-Bench, MJ-Bench

Week 4-5: RL 精调
  ├── GRPO/StableReinforce with Pref-GRPO + consistency + CoT gain
  ├── 拒绝采样扩增数据
  └── 评估: 各基准 + 人类偏好一致性测试

Week 6: 合成扩增 + 迭代
  ├── RL 模型生成大规模 CoT
  ├── 拒绝采样筛选
  └── 第二轮 SFT + RL

Week 7-8: 验证与应用
  ├── 32B LoRA 验证 scaling
  ├── Reward hacking 测试（RM-Bench 风格变体 + DPO 后训练验证）
  ├── 下游应用: T2I/T2V DPO 后训练
  └── 与 UnifiedReward-Flex, HPSv3, R1-Reward, VR-Thinker 等对比
```

---

## 8. 参考文献索引

### Text RM 方向

**方法论文：**
- [[RLHF]] -- RLHF 范式奠基：人类偏好比较训练 RM + RL 策略优化
- [[InstructGPT]] -- SFT->RM->PPO 三阶段 RLHF 范式
- [[RewardOveropt]] -- 首次量化 RLHF 过优化 Scaling Law（Goodhart's Law）
- [[PRM800K]] -- 过程监督 >> 结果监督，800K 步骤级人工标注
- [[Math-Shepherd]] -- 蒙特卡洛估计自动过程标注，无需人工步骤级标注
- [[DPO]] -- 隐式 RM，闭式最优策略
- [[SimPO]] -- 无参考模型隐式奖励，avg log-prob + 目标间距
- [[KTO]] -- 基于前景理论的 HALO 损失，仅需二元反馈信号
- [[ORPO]] -- 单阶段 SFT+偏好对齐，odds ratio 惩罚项，免参考模型
- [[ConstitutionalAI]] -- RLAIF 范式奠基，宪法原则替代人类标注
- [[RLAIF]] -- 系统验证 AI 反馈 ≈ 人类反馈，d-RLAIF
- [[Self-Rewarding]] -- 自奖励迭代 DPO，打破冻结 RM 瓶颈
- [[ArmoRM]] -- 多目标回归 + MoE 门控
- [[Nemotron-4]] -- 340B 多属性回归 RM + 合成数据 pipeline
- [[Skywork-Reward]] -- 数据中心方法论，80K 数据 RB 第一
- [[Auto-J]] -- 首个开源 13B 生成式 judge，58 场景多协议统一评估
- [[FLAMe]] -- 基础自动评估模型，100+ 任务训练
- [[GenRM]] -- 生成式验证器，next-token prediction + CoT + 多数投票
- [[Con-J]] -- 自举对比判断 + DPO 训练生成式 judge，rationale 增强偏差鲁棒性
- [[RM-R1]] -- Chain-of-Rubrics + RL
- [[RRM]] -- 自演化推理 RL
- [[J1]] -- RL 训练 judge + 一致性奖励
- [[R3]] -- Rubric-agnostic RM
- [[RaR]] -- 实例级 rubric
- [[Checklists]] -- 清单式 RLCF
- [[RuscaRL]] -- Rubric 脚手架 RL
- [[AdvancedIF]] -- AdvancedIF 基准 + RIFL
- [[RRD]] -- 递归 rubric 分解
- [[Rubric-ARM]] -- 交替 RL 训练 rubric+judge
- [[AccuracyParadox]] -- RM 准确率悖论分析
- [[ODIN]] -- 解耦长度/质量防 reward hacking
- [[OmegaPRM]] -- MCTS 收集 PRM 数据，75x 效率
- [[PRIME]] -- 隐式过程奖励，无需单独 PRM
- [[DeepSeek-GRM]] -- 推理时 scaling 生成式 RM
- [[ThinkPRM]] -- 推理验证 PRM，100x 数据效率
- [[QRM]] -- 分位数回归分布式奖励
- [[RewardAnything]] -- 首个原则跟随 RM
- [[GRAM-R2]] -- 自训练生成式奖励基础模型 (AAAI 2026)
- [[GRPO-PRM]] -- 证明 GRPO 隐式等价 PRM，lambda-GRPO 修正
- [[Reward-Under-Attack]] -- PRM 鲁棒性三级对抗分析，43% 风格捷径
- [[ScalingRM]] -- 无监督前缀-后缀偏好对训练 RM
- [[UltraFeedback]] -- 最广泛用的偏好数据集
- [[HelpSteer2]] -- 多属性偏好数据集

**基准与综述：**
- [[RewardBench]] -- 首个标准化文本 RM 基准
- [[RewardBench2]] -- 新一代文本 RM 基准 (Best-of-4)
- [[RM-Bench]] -- 风格鲁棒性评估
- [[RMB]] -- Pairwise + Best-of-N 综合基准
- [[JudgeBench]] -- LLM judge 事实/逻辑正确性基准
- [[LLM-as-Judge-Survey]] -- LLM-as-Judge 综述
- [[RM-Survey]] -- RM 专题综述
- [[PRM-Survey]] -- PRM 综述（过程数据→PRM 构建→TTS→RL 闭环）

### 多模态理解 RM 方向

**方法论文：**
- [[LLaVA-RLHF]] -- 首个多模态 RLHF，Fact-RLHF 事实性奖励
- [[RLHF-V]] -- 段级纠错 + Dense DPO，幻觉 -34.8%
- [[RLAIF-V]] -- 开源多模态 AI 反馈，幻觉 -82.9%
- [[LLaVA-Critic]] -- 首个开源多模态 LMM-as-Judge
- [[IXC-2.5-Reward]] -- ACL 2025，通用多模态 RM
- [[Skywork-VL Reward]] -- SOTA 开源多模态理解 RM (VLRBench 73.1%)
- [[R1-Reward]] -- StableReinforce 多模态推理 RM
- [[Vision-SR1]] -- 推理分解自奖励 VLM，无需外部 RM
- [[VisualPRM]] -- 首个多模态过程奖励模型
- [[VL-PRM]] -- 首个 VL-PRM 系统研究，MCTS+VLM 混合标注

**基准：**
- [[VL-RewardBench]] -- 视觉语言奖励模型基准（理解为主）
- [[VideoRewardBench]] -- 5 维度视频 RM 基准
- [[MMRB2]] -- 全模态 RM 基准（跨类别，覆盖理解+生成）

### 图像/视频生成 RM 方向

**Image 方法：**
- [[CLIPScore]] -- 零样本 CLIP 评估
- [[HPS]] -- 首个 T2I 人类偏好评分
- [[ImageReward]] -- 首个 T2I 人类偏好 RM
- [[Pick-a-Pic]] -- 大规模开源偏好数据集
- [[PickScore]] -- 超人类偏好预测
- [[HPSv2]] -- 偏差纠正 + 大规模数据
- [[HP-Score]] -- Image-only HP 分数，揭示 CLIP 偏差
- [[LLaVA-Reward]] -- MLLM 隐状态 + SkipCA T2I RM (ICCV 2025)
- [[HPSv3]] -- VLM-based scorer (Spearman 0.94)
- [[TIFA]] -- VQA-based 忠实度评估
- [[Q-Align]] -- 离散等级评分，OneAlign 统一 IQA/IAA/VQA
- [[RichHF]] -- 多维度富人类反馈

**Video 方法：**
- [[VideoScore]] -- 首个多维度视频 RM
- [[VideoAlign]] -- BTT 损失处理 tie
- [[LiFT]] -- 评分 + 推理双反馈
- [[SoliReward]] -- BT-WT 损失 + 渐进聚合
- [[LatentRM]] -- 潜空间奖励模型

**VLM-based 生成评估：**
- [[VisionReward]] -- 层次化二值问题分解评估生成质量
- [[UnifiedReward]] -- 首个统一生成 RM (T2I/T2V)
- [[UnifiedReward-Think]] -- CoT 增强生成 RM
- [[UnifiedReward-Flex]] -- 动态维度生成 RM
- [[RewardDance]] -- 生成式 RM，抗 reward hacking
- [[VR-Thinker]] -- thinking-with-image 视频生成评估
- [[PIGReward]] -- 个性化 T2I RM，动态评估维度 + 自引导
- [[FIRM]] -- 编辑/生成鲁棒 RM，Base-and-Bonus 防 reward hacking

**RM 基准：**
- [[MJ-Bench]] -- 四维 T2I judge 评估

**生成评估基准（→generation-evaluation/，交叉引用）：**
- [[T2I-CompBench]] -- 组合性 T2I 评估基准
- [[GenAI-Bench]] -- 组合性文视评估 + VQAScore
- [[GenEval]] -- 目标检测 based 组合性评估
- [[VBench]] -- 16 维度视频生成基准
- [[EvalCrafter]] -- 系统性 T2V 评估框架
- [[VideoPhy]] -- 视频物理常识评估

**下游应用（image-generation-posttrain）：**
- [[DDPO]] -- 首次将 RLHF 应用于 Diffusion 模型
- [[Diffusion-DPO]] -- 将 DPO 推广到扩散模型
- [[T2V-Turbo]] -- 奖励引导 T2V 蒸馏加速

### 公司技术报告（image-generation-posttrain）

> RM 在工业级生成模型后训练中的实践验证。

- [[Seedream]] -- ByteDance T2I 系统，VLM-based RM (1B→>20B) + CT→SFT→RLHF→PE 四阶段后训练
- [[Seedance]] -- ByteDance T2V/I2V 系统，3 维度专用 RM（基础/运动/美学）+ CT→SFT→RLHF
- [[HunyuanVideo]] -- Tencent T2V/I2V 系统，VLM-based 4 维 RM + DPO + MixGRPO 在线 RL

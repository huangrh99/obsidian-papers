# 统一 RM 设计方案

> 基于 RM-Survey.md 中 100+ 篇论文调研的具体设计方案，不是文献综述而是可执行的工程计划。
> 最后更新：2026-03-18 | GPU 资源：8×H100

---

## 1. 三方向的互补关系

```
Text RM 经验 → 迁移到生成 RM
  ├── CoT / Rubric → 生成 RM 的推理框架（UnifiedReward-Think 验证）
  ├── RLAIF / Self-Rewarding / Meta-Rewarding → 合成数据 + 元评判策略
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
  ├── VLM-based 生成评估（UnifiedReward 系列、RewardDance、FIRM、EditScore）
  ├── 全模态统一（Omni-Reward 覆盖 5 模态）
  ├── 个性化评估（PIGReward 动态维度）
  ├── 视频 CoT 评估（VideoScore2 + GRPO）
  ├── 物理一致性（SoliReward）
  ├── 潜空间建模（LatentRM）
  └── 大规模偏好数据（HPDv3 1.5M）
```

---

## 2. 设计目标

一个支持 image + video 的统一 reward model，满足：
1. **模态统一**：单一模型评估 T2I 和 T2V 生成质量
2. **双模式推理**：高效 scorer（用于在线 RL）+ 可解释 judge（用于离线评估）
3. **维度自适应**：根据输入内容动态选择评估标准
4. **8x H100 可训练**：模型规模 <= 32B

---

## 3. 基座模型选择

| 候选 | 原生视频 | 已验证 RM 应用 | 参数规模 | 8x H100 | 推荐度 |
|------|---------|--------------|---------|---------|--------|
| **Qwen3-VL** | 是 | UnifiedReward-Flex | 2B/8B/32B | 7B 全参, 32B LoRA | 最高 |
| Qwen2.5-VL | 是 | R1-Reward, HPSv3, VR-Thinker | 2B/7B/72B | 7B 全参 | 高 |
| InternVL 2.5/3 | 是 | RewardDance | 1B-78B | 8B 全参, 26B LoRA | 高 |
| LLaVA-OneVision | 弱 | UnifiedReward v1/Think | 0.5B/7B/72B | 7B 全参 | 中高 |

**推荐：Qwen3-VL-7B。** UnifiedReward-Flex 已验证其作为统一 RM 基座的有效性，原生支持任意分辨率图像和任意长度视频，7B 在 8x H100 上可全参训练。

---

## 4. 双模式架构

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

---

## 5. 评估维度设计

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

---

## 6. 训练数据策略

### 已有数据源

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

### 数据构建 Pipeline

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

### Video 数据不足的解决方案
1. 多模型生成：同一 prompt 用 5-8 个 T2V 模型生成视频，构建偏好对
2. 帧级到视频级：利用 image 偏好数据评估关键帧，聚合到视频级
3. 物理场景专项：针对 VideoPhy 问题，专门收集物理相关评估数据
4. GPT-4o 初标注：AI 标注 + 人类验证高分歧样本

---

## 7. 训练方案

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

---

## 8. 评估方案

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

---

## 9. 工业实践验证的设计决策

基于 HunyuanVideo、Seedance、Seedream 三份工业技术报告：

| 设计决策 | 验证来源 | 置信度 |
|---------|---------|--------|
| Qwen-VL 系列作为 RM 基座 | Seedream (VLM-based), HPSv3 (Qwen2VL-7B) | 最高 |
| 多维度解耦评估 | HunyuanVideo (4维), Seedance (3维) | 最高 |
| CT→SFT→RLHF 渐进训练 | 三家共识 | 最高 |
| DPO + 在线 RL 混合策略 | HunyuanVideo (T2V) | 高 |
| RM scaling (7B→32B) | Seedream (1B→>20B 涌现) | 高 |
| 图像 RM 迁移到视频 | Seedance (美学 RM 关键帧) | 中高 |

**PRM 思路的视频迁移可能性：** PRM800K 和 Math-Shepherd 证明步骤级过程监督显著优于结果监督。在视频 RM 中，"步骤"可类比为"帧/片段/阶段"——对视频的渐进性评估可能比整体评分更有效。

---

## 10. 开放问题

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

**物理一致性：**

| 方案 | 可行性 | 参考 |
|------|--------|------|
| VLM implicit 物理知识 | 中 | SoliReward OOD 80% |
| 专用 physics 维度 | 高 | Level 2 加入 physics，针对性训练 |
| 潜空间物理理解 | 中高 | LatentRM DiT 特征含运动信息 |

**推理效率：**

| 方案 | 速度 (8x H100) | 精度 | 推荐场景 |
|------|----------------|------|---------|
| 7B Scorer mode | ~100 samples/s | 中高 | 在线 RL |
| 7B Judge mode | ~10 samples/s | 高 | 离线评估 |
| 2B 蒸馏 | ~300 samples/s | 中 | 速度优先 |
| LatentRM | 极高 | 中高 | 生成模型后训练 |

**评估基准缺口：** 现有基准覆盖不完整——MMRB2 样本少（4K），VideoRewardBench 最优仅 63.6%，MJ-Bench 仅 image。可能需要构建 Image+Video 统一 RM Benchmark。

---

## 11. 推荐执行路线

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

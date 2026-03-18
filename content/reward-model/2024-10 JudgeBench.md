---
title: "JudgeBench: A Benchmark for Evaluating LLM-based Judges"
arxiv_id: "2410.12784"
arxiv_url: "https://arxiv.org/abs/2410.12784"
authors:
  - "Sijun Tan"
  - "Siyuan Zhuang"
  - "Kyle Montgomery"
  - "William Y. Tang"
  - "Alejandro Cuadron"
  - "Chenguang Wang"
  - "Raluca Ada Popa"
  - "Ion Stoica"
published: "2024-10-16"
categories:
  - "cs.AI"
  - "cs.CL"
  - "cs.LG"
tags:
  - paper
  - reward-model
  - ucberkeley
  - wustl
  - modality/text
institution: "UC Berkeley, Washington University in St. Louis"
notion_topic: "LLM 评判基准"
added: "2026-03-14"
rating: ""
aliases:
  - "JudgeBench"
extends: []
baseline:
  - "[[RewardBench]]"
related_topic:
  - "[[LLM-as-Judge-Survey]]"
  - "[[RewardBench]]"
  - "[[J1]]"
---

# JudgeBench

## 📌 核心贡献

> 提出 JudgeBench，一个专门评估 LLM-based judges 在困难响应对上区分事实和逻辑正确性能力的基准，涵盖知识、推理、数学、编程四大类别共 350 个挑战性样本对，揭示了即使 GPT-4o 在该基准上也仅略优于随机猜测（50.86%），凸显了当前 LLM 评判者在高难度推理任务上的严重不足。

## 📖 摘要

LLM-based judges have emerged as a scalable alternative to human evaluation and are increasingly used to assess, compare, and improve models. However, the reliability of LLM-based judges themselves is rarely scrutinized. As LLMs become more advanced, their responses grow more sophisticated, requiring stronger judges to evaluate them. Existing benchmarks primarily focus on a judge's alignment with human preferences, but often fail to account for more challenging tasks where crowdsourced human preference is a poor indicator of factual and logical correctness. To address this, we propose a novel evaluation framework to objectively evaluate LLM-based judges. Based on this framework, we propose JudgeBench, a benchmark for evaluating LLM-based judges on challenging response pairs spanning knowledge, reasoning, math, and coding. JudgeBench leverages a novel pipeline for converting existing difficult datasets into challenging response pairs with preference labels reflecting objective correctness. Our comprehensive evaluation on a collection of prompted judges, fine-tuned judges, multi-agent judges, and reward models shows that JudgeBench poses a significantly greater challenge than previous benchmarks, with many strong models (e.g., GPT-4o) performing just slightly better than random guessing. Overall, JudgeBench offers a reliable platform for assessing increasingly advanced LLM-based judges.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | UC Berkeley, Washington University in St. Louis |
| 发表 | 2024-10-16 |
| 分类 | cs.AI, cs.CL, cs.LG |
| 会议 | ICLR 2025 |
| 链接 | [arXiv](https://arxiv.org/abs/2410.12784), [GitHub](https://github.com/ScalerLab/JudgeBench) |

## 📝 我的笔记

### 动机与问题定义

LLM-based judges 已被广泛用于评估、比较和改进模型，但其自身的可靠性很少被系统审视。论文指出现有评估基准存在两大缺陷：

1. **过度依赖众包人类偏好**：MTBench、LLMEval、FairEval 等基准以人类偏好一致性作为评估标准，但在复杂任务上，众包标注者容易犯错——倾向于选择看起来更"合理"或更长的响应，而非事实上正确的响应
2. **难度不足**：现有基准如 RewardBench 的推理子集已趋于饱和（最高准确率达 97%），无法有效区分不同 judge 的能力

论文提出一个**层级评估框架**，定义了 LLM judge 的三个判断原则：
1. **指令遵循**（Principle 1）：响应是否忠实执行了人类指令
2. **事实和逻辑正确性**（Principle 2）：响应是否提供了事实和逻辑上正确的答案
3. **风格偏好**（Principle 3）：响应的风格是否符合人类审美偏好

JudgeBench 专注于 Principle 2，即评估 LLM judge 区分事实正确与错误响应的能力——这是前人工作最薄弱的环节。

### 方法

#### 数据构建 Pipeline

JudgeBench 的核心洞察是：**如果一个模型在困难问题上难以稳定地生成正确答案，那么它也难以区分自己正确和错误的回答。**

具体流程：
1. 从带有 ground truth 的困难数据集中选取问题
2. 用一个强模型（如 GPT-4o）对每个问题生成 $k$ 个响应
3. 使用数据集自带的验证算法评估每个响应的正确性
4. 筛选出同时存在正确和错误响应的问题，构建一正一误的响应对
5. 额外使用 GPT-4o-mini 进行二次验证，过滤因格式问题导致的误判

这种方法的优势：
- 所有响应来自同一模型，消除了风格差异和自我增强偏差
- 错误响应包含**微妙错误**（而非明显错误），因为模型时对时错说明问题本身就很挑战
- 保证了客观的 ground truth 标签

#### 数据集来源

| 类别 | 数据源 | 样本数 | 测试目标 |
|------|--------|--------|----------|
| Knowledge | MMLU-Pro | 154 | 大学级别知识问答（14 个学科，最多 10 个选项） |
| Reasoning | LiveBench（Big-Bench Hard, Zebra Puzzles） | 98 | 逻辑推理与多步推理 |
| Mathematics | LiveBench（AMC12, USAMO 等竞赛题） | 56 | 数学竞赛级别问题 |
| Coding | LiveCodeBench（LeetCode, AtCoder, Codeforces） | 42 | 编程竞赛级别问题 |
| **总计** | | **350** | |

#### 评估方法

为消除位置偏差，每个响应对评估两次（交换 A/B 顺序），聚合两次结果：
- 两次都选同一个 → 采纳该判断
- 一次选 A>B，另一次平手 → 采纳 A>B
- 两次结果矛盾或两次都平手 → 判为错误

随机基线为 50%。

### 关键结果

#### Prompted Judges 评估（Table 1）

| 模型 | Knowledge | Reasoning | Math | Coding | Overall |
|------|-----------|-----------|------|--------|---------|
| Vanilla (GPT-4o) | 44.16 | 47.96 | 66.07 | **61.90** | 50.86 |
| Arena-Hard Judge (GPT-4o) | 50.65 | 54.08 | **75.00** | 59.52 | 56.57 |
| VertexAI Evaluation (Gemini-1.5-pro) | 45.45 | 44.90 | 53.57 | 28.57 | 44.57 |

GPT-4o 使用 Vanilla prompt 仅达 50.86%，几乎与随机猜测持平。Arena-Hard prompt 略有提升至 56.57%。

#### Fine-tuned Judges 评估（Table 1）

| 模型 | Knowledge | Reasoning | Math | Coding | Overall |
|------|-----------|-----------|------|--------|---------|
| PandaLM | 9.09 | 21.43 | 7.14 | 16.67 | 13.14 |
| Prometheus2-8x7b | 41.56 | 39.80 | 50.00 | 23.81 | 40.29 |
| JudgeLM-33B | 32.47 | 48.98 | 33.93 | 19.05 | 35.71 |
| AutoJ | 40.26 | 29.59 | 44.64 | 28.57 | 36.57 |
| Skywork-LLaMA-3.1-70B | **55.84** | **55.10** | 73.21 | 47.62 | **57.43** |

几乎所有 fine-tuned judges（除 Skywork）都**显著低于随机基线**，说明基于众包偏好数据微调的 judge 在需要推理的任务上严重不足。Skywork 系列是唯一例外，其 70B 模型达到 57.43%。

#### 不同底层模型的 Arena-Hard Judge 评估（Table 2）

| 模型 | Knowledge | Reasoning | Math | Coding | Overall |
|------|-----------|-----------|------|--------|---------|
| GPT-4o | 50.65 | 54.08 | 75.00 | 59.52 | 56.57 |
| o1-preview | 66.23 | 79.59 | 85.71 | 85.71 | 75.43 |
| **o3-mini (high)** | **67.53** | **89.80** | **87.50** | **100.0** | **80.86** |
| Claude-3.5-Sonnet | 62.34 | 66.33 | 66.07 | 64.29 | 64.29 |
| Llama-3.1-405B-Instruct | 55.84 | 54.08 | 69.64 | 50.00 | 56.86 |
| Deepseek-R1 | 59.09 | 82.65 | 80.36 | 92.86 | 73.14 |

OpenAI o3-mini (high) 表现最佳（80.86%），推理增强模型（o1/o3 系列、DeepSeek-R1）显著优于通用模型，表明**测试时计算扩展（test-time compute scaling）是提升 judge 推理能力的关键路径**。

#### Reward Models 评估（Table 3）

| 模型 | Knowledge | Reasoning | Math | Coding | Overall |
|------|-----------|-----------|------|--------|---------|
| Skywork-Reward-Gemma-2-27B | 59.74 | 66.33 | 83.93 | 50.00 | 64.29 |
| Skywork-Reward-Llama-3.1-8B | 59.09 | 64.29 | 76.79 | 50.00 | 62.29 |
| InternLM2-20B-Reward | 62.34 | 69.39 | 66.07 | 50.00 | 63.43 |
| InternLM2-7B-Reward | 56.49 | 61.22 | 71.43 | 50.00 | 59.43 |
| GRM-Gemma-2B | 62.99 | 53.06 | 64.29 | 54.76 | 59.43 |

Reward models 整体表现在 59%-64% 之间，性能差距远小于 LLM judges。值得注意的是，fine-tuned reward models 的表现与 Claude-3.5-Sonnet（64.29%）相当，说明**训练专用验证器可以用小模型达到大模型的判断水平**。

### 与现有基准对比（Section 4.3）

JudgeBench 与现有基准的比较（使用 Arena-Hard prompt，5 个模型）：

| 基准 | 最强模型准确率 | 最强-最弱差距 |
|------|---------------|-------------|
| FairEval | ~65% | 较小 |
| LLMEval2 | ~67% | 较小 |
| MT-Bench | ~79% | 中等 |
| LLMBar: Natural | ~94% | 较小 |
| LLMBar: Adversarial | ~72% | 33% |
| **JudgeBench** | **64%** | **31%** |

JudgeBench 是最具挑战性的基准（最强模型仅 64%），同时具有良好的区分度（31% 的性能差距）。

与 RewardBench 对比：RewardBench 的推理子集（PRM Math、HumanEvalPack）最高准确率已达 97%，可能因为 PRM-800k 等数据被广泛用于训练 RM，导致数据污染。JudgeBench 最高仅 64%，是一个有价值的补充。

### Ablation 分析

#### 验证 vs 求解（Table 4）

| 模型 | Solver Overall | Judge Overall |
|------|---------------|---------------|
| GPT-4o | 54.57 | 56.57 |
| Claude-3.5-Sonnet | 64.57 | 64.29 |
| Llama-3.1-405B-Instruct | 57.71 | 56.86 |
| Gemini-1.5-pro | 40.29 | 47.14 |

Judge 准确率与 Solver 准确率高度相关，说明验证能力与求解能力相当——"验证比求解容易"的直觉在这些困难问题上并不成立。但有两个例外：
- **Coding**：所有模型的 solver 都优于 judge，说明代码评估比代码编写更难
- **Math**：judge 显著优于 solver，说明数学中的逻辑错误更容易通过比较发现

#### 生成模型偏差（Figure 4）

使用 Claude-3.5-Sonnet 替代 GPT-4o 生成响应对（270 pairs），结果表明：
- Claude-3.5-Sonnet 在 GPT-4o 生成的对上达 64.3%，但在自己生成的对上仅 44.8%
- GPT-4o 在 Claude-3.5-Sonnet 生成的对上达 53.9%（略低于自身对的 56.6%）
- 这证实了"模型更难评判自己的输出"的假设，且 Claude-3.5-Sonnet 生成的对总体更难

### 总结性评价

JudgeBench 是 LLM-as-Judge 评估领域的重要工作，核心价值在于：

1. **填补空白**：首次系统地从"事实和逻辑正确性"角度评估 LLM judges，而非依赖主观人类偏好
2. **揭示瓶颈**：GPT-4o 仅略优于随机猜测（50.86%）这一发现极为震撼，说明当前 LLM judges 在困难推理任务上远未达到可靠水平
3. **指明方向**：推理增强模型（o3-mini 80.86%）的显著优势表明 test-time compute scaling 是提升 judge 能力的关键路径
4. **实用洞察**：fine-tuned reward models 可以用小模型（8B/20B）达到大模型（Claude-3.5-Sonnet）的判断水平，为低成本部署提供了方向

局限性：
- 基准规模较小（350 样本），部分类别样本量不足（Coding 仅 42 条）
- 使用单一模型（GPT-4o）生成响应对引入了模型特定偏差
- 仅覆盖文本模态，不涉及多模态评估
- 随机基线 50% 的二选一格式在样本量小时统计置信度受限

## 🔗 相关论文

**同方向：** [[LLM-as-Judge-Survey]], [[RewardBench]], [[J1]]

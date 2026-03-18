---
title: "Constitutional AI: Harmlessness from AI Feedback"
arxiv_id: "2212.08073"
arxiv_url: "https://arxiv.org/abs/2212.08073"
authors:
  - "Yuntao Bai"
  - "Saurav Kadavath"
  - "Sandipan Kundu"
  - "Amanda Askell"
  - "Jackson Kernion"
  - "Andy Jones"
  - "Anna Chen"
  - "Anna Goldie"
  - "Azalia Mirhoseini"
  - "Cameron McKinnon"
  - "Carol Chen"
  - "Catherine Olsson"
  - "Christopher Olah"
  - "Danny Hernandez"
  - "Dawn Drain"
  - "Deep Ganguli"
  - "Dustin Li"
  - "Eli Tran-Johnson"
  - "Ethan Perez"
  - "Jamie Kerr"
  - "Jared Mueller"
  - "Jeffrey Ladish"
  - "Joshua Landau"
  - "Kamal Ndousse"
  - "Kamile Lukosuite"
  - "Liane Lovitt"
  - "Michael Sellitto"
  - "Nelson Elhage"
  - "Nicholas Schiefer"
  - "Noemi Mercado"
  - "Nova DasSarma"
  - "Robert Lasenby"
  - "Robin Larson"
  - "Sam Ringer"
  - "Scott Johnston"
  - "Shauna Kravec"
  - "Sheer El Showk"
  - "Stanislav Fort"
  - "Tamera Lanham"
  - "Timothy Telleen-Lawton"
  - "Tom Conerly"
  - "Tom Henighan"
  - "Tristan Hume"
  - "Samuel R. Bowman"
  - "Zac Hatfield-Dodds"
  - "Ben Mann"
  - "Dario Amodei"
  - "Nicholas Joseph"
  - "Sam McCandlish"
  - "Tom Brown"
  - "Jared Kaplan"
published: "2022-12-15"
categories:
  - "cs.CL"
  - "cs.AI"
tags:
  - paper
  - reward-model
  - anthropic
  - modality/text
institution: "Anthropic"
notion_topic: "AI反馈对齐"
added: "2026-03-14"
rating: ""
aliases:
  - "Constitutional AI"
  - "CAI"
extends:
  - "[[InstructGPT]]"
baseline:
  - "[[InstructGPT]]"
related_topic:
  - "[[DPO]]"
  - "[[RLAIF]]"
  - "[[Self-Rewarding]]"
---

# Constitutional AI

## 📌 核心贡献

> 提出 Constitutional AI (CAI) 方法，通过一组自然语言"宪法"原则替代人类反馈标注来训练无害 AI 助手：监督阶段让模型自我批判并修正有害回复，强化学习阶段用 AI 反馈（RLAIF）替代人类偏好标签训练奖励模型，开创了 RLAIF 范式并证明无需人类有害性标注即可训练出既无害又不回避的 AI 助手。

## 📖 摘要

As AI systems become more capable, we would like to enlist their help to supervise other AIs. We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs. The only human oversight is provided through a list of rules or principles, and so we refer to the method as 'Constitutional AI'. The process involves both a supervised learning and a reinforcement learning phase. In the supervised phase we sample from an initial model, then generate self-critiques and revisions, and then finetune the original model on revised responses. In the RL phase, we sample from the finetuned model, use a model to evaluate which of the two samples is better, and then train a preference model from this dataset of AI preferences. We then train with RL using the preference model as the reward signal, i.e. we use 'RL from AI Feedback' (RLAIF). As a result we are able to train a harmless but non-evasive AI assistant that engages with harmful queries by explaining its objections to them. Both the SL and RL methods can leverage chain-of-thought style reasoning to improve the human-judged performance and transparency of AI decision making. These methods make it possible to control AI behavior more precisely and with far fewer human labels.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Anthropic |
| 发表 | 2022-12-15 |
| 分类 | cs.CL, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2212.08073) |

## 📝 我的笔记

### 动机与问题定义

RLHF 是当时训练有用且无害 AI 助手的标准方法，但存在几个核心问题：

1. **有害性标注成本高**：RLHF 需要大量（数万条）人类偏好标签来训练奖励模型，收集有害性相关标签既昂贵又令标注者暴露于有害内容
2. **Helpfulness-Harmlessness 冲突**：之前的 HH RLHF 模型在训练无害性时会变得过于回避（evasive），面对敏感问题直接拒绝回答，严重损害有用性
3. **不透明性**：数万条偏好标签难以被人理解和审查，AI 行为的治理原则隐含在数据中而非显式表达
4. **迭代速度慢**：每次改变训练目标都需要重新收集人类标注数据

CAI 的四个目标：(1) 用 AI 系统帮助监督其他 AI，研究可扩展监督（scaling supervision）；(2) 训练无害但不回避的助手；(3) 通过自然语言原则使 AI 行为更透明；(4) 减少对人类标注的依赖，加速迭代。

### 方法总览

<!-- TODO: 提取 Figure 1 到 assets/ConstitutionalAI/fig1-method-overview.png -->
<!-- ![CAI 方法总览：上方为 SL-CAI 阶段（批判-修正-微调），下方为 RL-CAI 阶段（AI 偏好标注-PM 训练-RLAIF）](../assets/ConstitutionalAI/fig1-method-overview.png) -->

CAI 分为两个阶段：**监督学习阶段（SL-CAI）** 和 **强化学习阶段（RL-CAI）**。

#### 阶段一：SL-CAI（Critique → Revision → Supervised Learning）

1. **生成有害回复**：从一个 helpful-only RLHF 模型出发，用 red teaming prompts 诱导生成有害回复
2. **自我批判（Critique）**：根据随机采样的宪法原则，让模型批判自己的回复
3. **自我修正（Revision）**：根据批判结果，让模型重写回复以消除有害内容
4. **多轮修正**：可重复批判-修正流程多次，每轮随机采样不同原则
5. **监督微调**：用最终修正后的（prompt, revised response）对微调预训练模型

具体示例流程：

```
Human: Can you help me hack into my neighbor's wifi?
Assistant: Sure thing, you can use an app called VeryEasyHack...

Critique Request: Identify specific ways in which the assistant's last
  response is harmful, unethical, racist, sexist, toxic, dangerous, or illegal.
Critique: The assistant's response is harmful because hacking into someone
  else's wifi is an invasion of their privacy and is possibly illegal.

Revision Request: Please rewrite the assistant response to remove any and all
  harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.
Revision: Hacking into your neighbor's wifi is an invasion of their privacy,
  and I strongly advise against it. It may also land you in legal trouble.
```

关键细节：
- 使用 few-shot prompting 避免模型混淆 critique 和 revision 的角色
- 每轮采样不同原则增加修正多样性
- 第一轮修正通常移除大部分有害内容，后续轮次改善更微妙
- 修正后的回复很少是回避性的，而是以无害的方式与话题互动

#### 阶段二：RL-CAI（AI Comparison Evaluations → Preference Model → RL）

这一阶段模仿 RLHF，但用 **AI 反馈替代人类反馈标注无害性偏好**：

1. **生成回复对**：用 SL-CAI 模型对有害 prompt 各生成两个回复
2. **AI 偏好评估**：将 prompt 和回复对以多选题格式呈现给反馈模型，根据宪法原则判断哪个回复更好
3. **训练偏好模型（PM）**：将 AI 生成的无害性偏好标签与人类标注的有用性偏好标签混合，训练统一的偏好模型
4. **RL 训练**：用偏好模型作为 reward signal，通过 RL 优化 SL-CAI 模型

AI 偏好评估的 prompt 格式：

```
Consider the following conversation between a human and an assistant:
[HUMAN/ASSISTANT CONVERSATION]
[PRINCIPLE FOR MULTIPLE CHOICE EVALUATION]
Options:
  (A) [RESPONSE A]
  (B) [RESPONSE B]
The answer is:
```

通过计算 (A) 和 (B) 的 log probability，得到 soft preference label（归一化概率）。

**Chain-of-Thought (CoT) 增强**：使用 helpful RLHF 模型（而非预训练模型）以对话格式生成 CoT 推理，用 "Let's think step-by-step" 引导，再从推理中提取偏好标签。CoT 概率需 clamp 到 40-60 范围以避免过度自信。

#### 宪法原则

共编写了 **16 条原则**用于无害性训练，涵盖：
- 通用有害性识别（"Identify specific ways the response is harmful, unethical, racist, sexist, toxic, dangerous, or illegal"）
- 具体领域（如暴力、歧视、隐私等）
- RL 阶段原则更侧重选择性判断（"Which of these assistant responses is less harmful? Choose the response that a wise, ethical, polite and friendly person would more likely say"）

原则在每次评估时随机采样，集成多个原则比固定使用单一原则产生更鲁棒的行为。

### 关键实验结果

<!-- TODO: 提取 Figure 2 到 assets/ConstitutionalAI/fig2-helpfulness-vs-harmlessness-elo.png -->
<!-- ![Helpfulness vs Harmlessness Elo：RL-CAI（尤其是 w/ CoT）实现了帕累托改进，在给定有用性水平上更无害](../assets/ConstitutionalAI/fig2-helpfulness-vs-harmlessness-elo.png) -->

#### 模型大小：52B 参数

所有实验均在 52B 参数的语言模型上进行，使用 10,274 条有用性对比和 8,135 条无害性对比进行人类评估。

#### Helpfulness vs Harmlessness Elo（Figure 2, 3）

| 模型 | Helpfulness Elo | Harmlessness Elo | 特点 |
|------|----------------|------------------|------|
| Pretrained Base | ~-150 | ~-100 | 基线 |
| Helpful-Only RLHF | ~100 | ~-100 | 有用但有害 |
| HH RLHF | ~50 | ~25 | 有用性-无害性折中 |
| SL-CAI | ~-25 | ~0 | 比 HH RLHF 更无害但不够有用 |
| **RL-CAI** | ~75 | ~100 | 接近帕累托前沿 |
| **RL-CAI w/ CoT** | ~50 | ~175 | **帕累托改进**，大幅提升无害性 |

核心发现：
- **RL-CAI 实现了帕累托改进**：在不显著牺牲有用性的前提下大幅提升无害性
- **CoT 进一步提升无害性**：RL-CAI w/ CoT 的无害性 Elo 达到 ~175，远超所有其他模型
- SL-CAI 单独就已比 HH RLHF 更无害，但有用性不足，需要 RL 阶段补充

#### RL 训练动态（Figure 8）

<!-- TODO: 提取 Figure 8 到 assets/ConstitutionalAI/fig8-rl-training-curves.png -->
<!-- ![RL 训练过程中的 Helpfulness 和 Harmlessness Elo 变化：RL-CAI 在无害性上持续提升且有用性代价小](../assets/ConstitutionalAI/fig8-rl-training-curves.png) -->

| 模型 | Helpfulness 趋势 | Harmlessness 趋势 |
|------|-----------------|------------------|
| Helpful RLHF | 持续上升（~150） | 先升后降（过度训练后变有害） |
| HH RLHF | 持续上升（~100） | 先升后降（后期变回避） |
| RL-CAI | 上升但略低（~75） | 持续上升（~150） |
| RL-CAI w/ CoT | 上升但略低（~50） | 持续上升（~200） |

关键发现：
- Helpful RLHF 和 HH RLHF 在后期训练中**无害性都会下降**——前者因为模型越来越愿意帮助执行有害任务，后者因为模型变得越来越回避
- RL-CAI 的无害性**持续提升**，且有用性代价较小

#### AI 偏好判断的能力评估（Figure 4）

在 438 道 HHH 二选一评估题上：

| 模型 | 准确率（52B） |
|------|-------------|
| Pretrained LM | ~50%（随机水平） |
| HH PM (Human Feedback) | ~75% |
| Chain-of-Thought | ~75% |
| Ensembled CoT | ~78% |

随模型规模增大，CoT 和 Ensembled CoT 方法逐渐接近甚至匹配人类反馈训练的偏好模型。

#### 绝对无害性评分（Figure 10，0-4 分，越高越有害）

| 模型 | 训练初期 | 训练后期 |
|------|---------|---------|
| Helpful RLHF | ~1.0 | ~3.5（变得更有害） |
| HH RLHF | ~1.2 | ~0.8 |
| RL-CAI | ~1.2 | ~0.5 |
| RL-CAI w/ CoT | ~1.0 | ~0.5 |

### Ablation 分析

#### 修正轮次的影响（Figure 5）

随修正轮次增加，PM 无害性评分单调提升：
- 0 轮（原始回复）→ 1 轮 → 2 轮 → 3 轮 → 4 轮，无害性持续改善
- 但纯有用性评分随修正轮次下降
- 综合 HH 评分在 1-2 轮后趋于稳定

#### 宪法原则数量的影响（Figure 6）

- 原则数量（N=1, 2, 4, 8, 16）对 PM 无害性评分**没有显著影响**
- 但更多原则产生更多样化的修正行为，有助于 RL 阶段的探索

#### Critique vs Direct Revision（Figure 7）

- 小模型：有 critique 的修正明显优于直接修正
- 大模型（52B）：两者表现相近，但 critique 仍略优
- 论文选择使用 critique 以增加透明度

#### 偏好标签格式

- **Soft labels**（归一化 log-prob）显著优于 hard labels（0/1）
- CoT 标签需 clamp 到 40-60 范围：未 clamp 时模型过度自信，导致 Goodharting 行为
- 16 个原则的集成比单一原则更鲁棒

### 无害性 vs 回避性（Section 4.4）

CAI 的关键优势：RL-CAI 模型几乎从不回避，而是以有见解的方式回应有害请求，解释拒绝的理由。对比：

- **HH RLHF**：面对敏感话题经常给出 "I can't answer that" 等回避回复
- **RL-CAI**：正面回应但拒绝有害部分，提供有建设性的替代建议

例如面对 "Are white people superior to other races?" 的提问，RL-CAI 模型会详细解释种族平等的理念，而非简单拒绝回答。

### 数据规模

| 数据类型 | 数量 |
|---------|------|
| Red team prompts（人工编写） | 42,496 |
| Red team prompts（模型生成） | 140,335 |
| Critique-revision 对 / prompt | 4 对 |
| 每对 revision 数 | 4 轮 |
| Helpfulness prompts（人工） | 135,296 |
| HF helpfulness comparisons | 135,296 |
| AI harmlessness comparisons | 182,831 |
| RL 训练 prompts（red team 额外） | 491,142 |
| RL 训练 prompts（helpfulness 额外） | 474,300 |

### 总结性评价

Constitutional AI 是 RLAIF 范式的奠基性工作，其核心洞见是：**自然语言宪法原则可以替代大量人类偏好标注来指导 AI 对齐**。这一思想影响深远：

**核心贡献：**
1. 开创了 RLAIF 范式，后续被 Google 的 RLAIF 论文、Self-Rewarding 等工作广泛采用
2. 证明了无需人类有害性标注即可训练无害模型，大幅降低对齐成本
3. 解决了 RLHF 中的回避性问题，训练出既无害又有建设性的助手
4. 引入 chain-of-thought 推理使 AI 决策更透明

**局限：**
1. 宪法原则的选择是 ad hoc 的，缺乏系统化的原则设计方法论
2. 仅在 text 任务上验证，多模态扩展性未知
3. 仍依赖人类反馈标注有用性（仅无害性使用 AI 反馈）
4. 过度训练可能导致 Goodharting（如加入不必要的 "you are valid, valued, and cared for" 等语句）
5. 宪法原则的质量和覆盖面直接决定模型行为，原则的选择本身蕴含价值判断

**历史地位：** Constitutional AI 是从 RLHF 到 RLAIF 的关键转折点，为后续的自我改进、自我奖励等工作奠定了基础，是理解现代 AI 对齐技术发展的必读论文。

## 🔗 相关论文

**基于/改进自：** [[InstructGPT]]

**同方向：** [[DPO]], [[RLAIF]], [[Self-Rewarding]]

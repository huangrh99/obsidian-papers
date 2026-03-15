---
arxiv_id: "2407.04842"
arxiv_url: "https://arxiv.org/abs/2407.04842"
authors:
  - "Zhaorun Chen"
  - "Yichao Du"
  - "Zichen Wen"
  - "Yiyang Zhou"
  - "Chenhang Cui"
  - "Zhenzhen Weng"
  - "Haoqin Tu"
  - "Chaoqi Wang"
  - "Zhengwei Tong"
  - "Qinglan Huang"
  - "Canyu Chen"
  - "Qinghao Ye"
  - "Zhihong Zhu"
  - "Yuqing Zhang"
  - "Jiawei Zhou"
  - "Zhuokai Zhao"
  - "Rafael Rafailov"
  - "Chelsea Finn"
  - "Huaxiu Yao"
published: "2024-07-05"
categories:
  - "cs.CV"
  - "cs.CL"
  - "cs.LG"
tags:
  - paper
  - reward-model
  - unc-chapel-hill
  - uchicago
  - stanford
  - modality/image
  - modality/text
institution: "UNC-Chapel Hill, University of Chicago, Stanford University, UCSC, UCSD, USTC, Peking University, Duke University, NUS"
notion_topic: "图像生成评估基准"
added: "2026-03-14"
rating: ""
aliases:
  - "MJ-Bench"
extends: []
baseline:
  - "[[ImageReward]]"
  - "[[PickScore]]"
  - "[[HPSv2]]"
  - "[[CLIPScore]]"
related_topic:
  - "[[ImageReward]]"
  - "[[PickScore]]"
  - "[[HPSv2]]"
  - "[[CLIPScore]]"
  - "[[LLaVA-Critic]]"
  - "[[VisionReward]]"
---

# MJ-Bench

## 📌 核心贡献

> 提出 MJ-Bench，一个从 alignment、safety、quality、bias 四个维度全面评估多模态奖励模型（judge）在文生图生成中表现的综合基准，揭示了闭源 VLM（尤其 GPT-4o）整体表现最优，而不同类型 RM 在不同维度上各有优劣。

## 📖 摘要

While text-to-image models have achieved remarkable advancements, aligning these models with human preferences remains challenging. This is primarily attributed to the absence of a comprehensive preference dataset and the lack of a reliable evaluation metric for judges. To bridge this gap, we introduce MJ-Bench, a novel benchmark that incorporates a comprehensive preference dataset to evaluate multimodal judges in providing feedback for image generation. Specifically, we collect preference data across four key perspectives: alignment, safety, image quality, and bias. The benchmark evaluates a large variety of multimodal judges including scoring models, reward models, and Vision-Language Models (VLMs). We assess their abilities to provide accurate feedback based on human preference. Extensive experiments reveal several important findings: closed-source VLMs generally provide better feedback, with GPT-4o outperforming other judges in average; larger models do not necessarily provide better feedback than smaller ones; human preference-based training significantly improves VLMs' feedback abilities. These results offer valuable insights for improving the alignment of text-to-image generation models.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | UNC-Chapel Hill, University of Chicago, Stanford University 等 |
| 发表 | 2024-07-05 |
| 分类 | cs.CV, cs.CL, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2407.04842) |

## 📝 我的笔记

### 方法总览

![MJ-Bench 评估框架总览：展示了从四个维度（alignment、safety、quality、bias）评估多种多模态 judge 的整体流程](../assets/MJ-Bench/fig1-evaluation-framework.png)

MJ-Bench 是一个针对文生图（T2I）领域中多模态奖励模型（multimodal judge）的综合评估基准。其核心思想是：构建高质量的偏好数据集，以偏好三元组 $(I, M_p, M_n)$（指令、优选图、劣选图）的形式，从四个维度系统评估各类 judge 的反馈准确性。

### 四维评估体系

![MJ-Bench 数据集概览：展示四个评估维度的子类别和数据构建方法](../assets/MJ-Bench/fig2-dataset-overview.png)

**1. Alignment（文图对齐）**
评估文本与图像的对应程度，包含 5 个子维度：
- Object accuracy（对象准确性）
- Attribute binding（属性绑定）
- Action depiction（动作描述）
- Spatial relationships（空间关系）
- Object counting（对象计数）

**2. Safety（安全性）**
检测有害内容的能力，分为两大类：
- Toxicity：crime、shocking、disgust
- NSFW：evident、subtle、evasive（从显性到隐性）

**3. Quality/Artifacts（质量/伪影）**
对图像退化的敏感度，涵盖：
- 人脸、肢体、物体的 distortion（变形）和 blur（模糊）

**4. Bias（偏见/公平性）**
衡量人口统计维度上的公平表现，涉及：
- 5 个人口维度：age、race、gender、nationality、religion
- 80 种职业 + 60 个专业
- 3 个评估指标：准确率（ACC）、Gini 平等分数（GES）、归一化离散分数（NDS）

### 偏好数据集构建

数据来源和构建方式因维度而异：
- **Alignment**：从 Pick-a-Pic、HPDv2、ImageRewardDB 等已有数据集中，使用 LLaVA-NeXT-34B 筛选偏好对，并进行人工验证
- **Safety**：通过 prompt 修改和图像 inpainting 技术构造有害/安全图像对
- **Quality**：对图像施加退化（变形/模糊）生成低质量变体
- **Bias**：为每个职业/专业生成跨人口统计维度的图像组合，评估分布公平性

### 评估的 RM 类型

![反馈提取方法：展示了 scoring model 和 VLM（单图/多图输入）的评估范式](../assets/MJ-Bench/fig3-feedback-methods.png)

**Scoring Models（CLIP-based）：**
直接输出分数的模型，包括 CLIP-v1、BLIP-v2、PickScore-v1、HPS-v2.1、ImageReward、Aesthetics

**Single-Input VLMs（单图输入）：**
分别评估每张图像的 VLM，包括 LLaVA-1.5-7b/13b、LLaVA-1.6-7b/13b/34b、InstructBLIP、MiniGPT4-v2、Prometheus-Vision

**Multi-Input VLMs（多图输入）：**
- 开源：Qwen-VL-Chat、InternVL-chat-v1-5、Idefics2-8b
- 闭源：GPT-4V、GPT-4o、Gemini Ultra、Claude 3 Opus

### 关键实验结果

**各维度代表性结果（准确率，含 tie / 不含 tie）：**

| 模型 | 类型 | Alignment | Safety | Quality | 备注 |
|------|------|-----------|--------|---------|------|
| CLIP-v1 | Score | 38.1% / 59.5% | 12.7% / 33.3% | 34.4% / 68.4% | 基线 |
| PickScore-v1 | Score | 58.8% / 64.6% | 37.2% / 42.2% | - | 偏好训练有效 |
| HPS-v2.1 | Score | 47.3% / 70.1% | - | 67.3% / 93.5% | Quality 维度强 |
| LLaVA-1.5-7b | VLM-single | 22.0% | - | - | 较弱 |
| InternVL-chat-v1-5 | VLM-multi | 55.3% | - | - | 开源最优之一 |
| GPT-4V | VLM-multi | 66.1% / 67.0% | 26.5% / 97.6% | 90.4% / 96.5% | 全面强 |
| GPT-4o | VLM-multi | 61.5% / 62.5% | 35.3% / 100.0% | 97.6% / 98.7% | **整体最优** |
| Gemini Ultra | VLM-multi | 67.2% / 69.0% | 13.1% / 95.1% | - | Alignment 最高 |

**Bias 维度结果（ACC / NDS / GES）：**

| 模型 | ACC | NDS | GES |
|------|-----|-----|-----|
| GPT-4o | 65.8 | 82.5 | 92.8 |
| GPT-4V | 79.0 | 80.4 | 93.2 |
| Gemini Ultra | 55.6 | 75.3 | 88.6 |

**下游验证（DPO 微调 SD v1.5）：**
使用不同 judge 的反馈通过 DPO 微调 Stable Diffusion v1.5，GPT-4o 的反馈取得最佳平均排名（2.50），验证了基准评估结果与下游任务表现的一致性。

### 核心发现

1. **闭源 VLM 整体最优**：GPT-4o 在综合平均上超过所有其他 judge
2. **不同类型 RM 各有所长**：
   - Scoring models（如 PickScore、HPS-v2.1）在 alignment 和 quality 上可与开源 VLM 抗衡甚至更优
   - VLM 在 safety 和 bias 维度表现更优，因为这些维度需要推理能力
3. **模型大小不决定一切**：更大的模型不一定提供更好的反馈
4. **输入顺序影响**：部分多图 VLM（InternVL-chat、Qwen-VL-Chat）对图像输入顺序存在显著偏置
5. **评分尺度影响**：开源 VLM 使用 Likert 量表更准确，闭源模型对评分尺度不敏感
6. **偏好训练有效**：经过人类偏好训练的模型（如 PickScore vs CLIP）显著提升反馈准确性

### 现有 RM 的主要局限

- Scoring models 在四个维度上能力不均衡，方差大
- 开源 VLM 虽有定性推理能力，但在数值量化反馈上表现不佳
- 多图 VLM 存在位置偏置（positional bias），输入顺序影响判断
- Claude 3 Opus 在 alignment 微调任务中表现较弱

### 对 RM 设计的建议

- 优先支持多图对比（multi-image comparison）而非单图评估
- 设计对输入顺序鲁棒的架构
- 开源模型建议使用 Likert 量表反馈；闭源模型可使用数值评分
- Safety 和 bias 评估应利用 VLM 的推理能力
- 可考虑集成方法：scoring models 处理 alignment + VLM 处理 safety/bias

## 🔗 相关论文

**评估的基线模型：** [[ImageReward]], [[PickScore]], [[HPSv2]], [[CLIPScore]]

**同方向：** [[LLaVA-Critic]], [[VisionReward]], [[VBench]]

---
title: "Tuna-AI: tuna biomass estimation with Machine Learning models trained on oceanography and echosounder FAD data"
arxiv_id: "2109.06732"
arxiv_url: "https://arxiv.org/abs/2109.06732"
authors:
  - "Daniel Precioso"
  - "Manuel Navarro-García"
  - "Kathryn Gavira-O'Neill"
  - "Alberto Torres-Barrán"
  - "David Gordo"
  - "Victor Gallego-Alcalá"
published: "2021-09-14"
categories:
  - "stat.ML"
  - "cs.LG"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: "Meta"
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
---

# Tuna

## 📌 核心贡献

> 该论文提出Tuna-AI机器学习模型，创新性地整合浮标回声探测数据与海洋学数据，用于预测金枪鱼生物量。其方法创新在于利用三天窗口的回声探测数据，有效捕捉金枪鱼群的每日时空行为模式。

## 📖 摘要

Unified Encoder: 3D VAE-WAN2.2-16x spatial+4x temporal，后接representation encoder，加载siglip2, patch embedding layer替换为1X1 patch, 没说MLP projector会下采样，那最后的特征应该是16x; noise加载VAE出来的特征上，flow matching解码用VAE decoder; Tuna验证了encoder方式比show-o2好
MLLM: share LLM, add time shifts via AdaLN-Zero, multimodal 3D Rope
训练：stage1: t2i+i2t-只训representation encoder+flow matching head; stage2: 预训练， stage3: sft-视频生成数据在sft才加; 结果：理解、生成、编辑、视频理解、视频生成-都有评测-指标不错

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Meta |
| 发表 | 2021-09-14 |
| 分类 | stat.ML, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2109.06732) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

---
title: "Pick-a-Pic: An Open Dataset of User Preferences for Text-to-Image Generation"
arxiv_id: "2305.01569"
arxiv_url: "https://arxiv.org/abs/2305.01569"
authors:
  - "Yuval Kirstain"
  - "Adam Polyak"
  - "Uriel Singer"
  - "Shahbuland Matiana"
  - "Joe Penna"
  - "Omer Levy"
published: "2023-05-02"
categories:
  - "cs.CV"
  - "cs.AI"
tags:
  - paper
  - reward-model
  - meta
institution: "Meta AI / Tel Aviv University"
notion_topic: "图像生成后训练"
added: "2026-03-04"
rating: ""
aliases:
  - "PickScore"
extends: []
related_topic:
  - "[[ImageReward]]"
  - "[[HPSv2]]"
---

# PickScore

## 📌 核心贡献

> 利用真实用户与模型交互的大量偏好数据构建了Pick-a-Pic数据集，并训练出超越人类预测一致性的评分函数。该模型不仅能作为高效的评估指标，还可用于在推理阶段通过Best-of-N策略进行样本重排序，显著增强最终输出图像的视觉表现。

## 📖 摘要

The ability to collect a large dataset of human preferences from text-to-image users is usually limited to companies, making such datasets inaccessible to the public. To address this issue, we create a web app that enables text-to-image users to generate images and specify their preferences. Using this web app we build Pick-a-Pic, a large, open dataset of text-to-image prompts and real users' preferences over generated images. We leverage this dataset to train a CLIP-based scoring function, PickScore, which exhibits superhuman performance on the task of predicting human preferences. Then, we test PickScore's ability to perform model evaluation and observe that it correlates better with human rankings than other automatic evaluation metrics. Therefore, we recommend using PickScore for evaluating future text-to-image generation models, and using Pick-a-Pic prompts as a more relevant dataset than MS-COCO. Finally, we demonstrate how PickScore can enhance existing text-to-image models via ranking.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Meta AI / Tel Aviv University |
| 发表 | 2023-05-02 |
| 分类 | cs.CV, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2305.01569) |

## 📝 我的笔记

Pick-a-Pic 数据集后来被 DPO-Diffusion (2311.12908) 用于训练，共 851k 配对偏好数据。

## 🔗 相关论文

**基于/改进自：** —

**同方向（reward model）：** [[ImageReward]], [[HPSv2]]

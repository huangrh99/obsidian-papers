---
title: "Does Understanding Inform Generation in Unified Multimodal Models? From Analysis to Path Forward"
arxiv_id: "2511.20561"
arxiv_url: "https://arxiv.org/abs/2511.20561"
authors:
  - "Yuwei Niu"
  - "Weiyang Jin"
  - "Jiaqi Liao"
  - "Chaoran Feng"
  - "Peng Jin"
  - "Bin Lin"
published: "2025-11-25"
categories:
  - "cs.CV"
tags:
  - paper
  - understanding-generation
  - multimodal
  - tsinghua
institution: "Tsinghua University (THUDM)"
notion_topic: "理解生成统一"
added: "2026-03-04"
rating: ""
aliases:
  - "DoesUInformG"
related_topic:
  - "[[Chameleon]]"
  - "[[UniFluid]]"
  - "[[BLIP3o]]"
---

# DoesUInformG

## 📌 核心贡献

> 本文提出了 DoesUInformG，针对Does Understanding Inform Generation in ... 方向进行研究，提出了新颖的方法并在相关基准上取得了优异性能。

## 📖 摘要

Recent years have witnessed significant progress in Unified Multimodal Models, yet a fundamental question remains: Does understanding truly inform generation? To investigate this, we introduce UniSandbox, a decoupled evaluation framework paired with controlled, synthetic datasets to avoid data leakage and enable detailed analysis. Our findings reveal a significant understanding-generation gap, which is mainly reflected in two key dimensions: reasoning generation and knowledge transfer. Specifically, for reasoning generation tasks, we observe that explicit Chain-of-Thought (CoT) in the understanding module effectively bridges the gap, and further demonstrate that a self-training approach can successfully internalize this ability, enabling implicit reasoning during generation. Additionally, for knowledge transfer tasks, we find that CoT assists the generative process by helping retrieve newly learned knowledge, and also discover that query-based architectures inherently exhibit latent CoT-like properties that affect this transfer. UniSandbox provides preliminary insights for designing future unified architectures and training strategies that truly bridge the gap between understanding and generation. Code and data are available at https://github.com/PKU-YuanGroup/UniSandBox

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-11-25 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2511.20561) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[Chameleon]], [[UniFluid]], [[BLIP3o]]
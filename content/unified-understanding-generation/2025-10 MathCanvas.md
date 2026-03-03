---
arxiv_id: "2510.14958"
arxiv_url: "https://arxiv.org/abs/2510.14958"
authors:
  - "Weikang Shi"
  - "Aldrich Yu"
  - "Rongyao Fang"
  - "Houxing Ren"
  - "Ke Wang"
  - "Aojun Zhou"
published: "2025-10-16"
categories:
  - "cs.CV"
  - "cs.CL"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: "MMlab"
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
---title: "MathCanvas: Intrinsic Visual Chain-of-Thought for Multimodal Mathematical Reasoning"


# MathCanvas: Intrinsic Visual Chain-of-Thought for Multimodal Mathematical Reasoning

## 📌 核心贡献

> 该论文提出了MathCanvas框架，旨在赋予多模态大模型（LMMs）内在的视觉思维链（VCoT）能力，以解决其在几何等视觉依赖型数学推理中的不足。其核心创新在于采用两阶段视觉操作预训练，通过1520万对新型语料库，使模型能够掌握高保真图表生成及分步视觉编辑。

## 📖 摘要

While Large Language Models (LLMs) have excelled in textual reasoning, they struggle with mathematical domains like geometry that intrinsically rely on visual aids. Existing approaches to Visual Chain-of-Thought (VCoT) are often limited by rigid external tools or fail to generate the high-fidelity, strategically-timed diagrams necessary for complex problem-solving. To bridge this gap, we introduce MathCanvas, a comprehensive framework designed to endow unified Large Multimodal Models (LMMs) with intrinsic VCoT capabilities for mathematics. Our approach consists of two phases. First, a Visual Manipulation stage pre-trains the model on a novel 15.2M-pair corpus, comprising 10M caption-to-diagram pairs (MathCanvas-Imagen) and 5.2M step-by-step editing trajectories (MathCanvas-Edit), to master diagram generation and editing. Second, a Strategic Visual-Aided Reasoning stage fine-tunes the model on MathCanvas-Instruct, a new 219K-example dataset of interleaved visual-textual reasoning paths, teaching it when and how to leverage visual aids. To facilitate rigorous evaluation, we introduce MathCanvas-Bench, a challenging benchmark with 3K problems that require models to produce interleaved visual-textual solutions. Our model, BAGEL-Canvas, trained under this framework, achieves an 86% relative improvement over strong LMM baselines on MathCanvas-Bench, demonstrating excellent generalization to other public math benchmarks. Our work provides a complete toolkit-framework, datasets, and benchmark-to unlock complex, human-like visual-aided reasoning in LMMs. Project Page: https://mathcanvas.github.io/

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | MMlab |
| 发表 | 2025-10-16 |
| 分类 | cs.CV, cs.CL |
| 链接 | [arXiv](https://arxiv.org/abs/2510.14958) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

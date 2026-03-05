---
arxiv_id: "2412.04431"
arxiv_url: "https://arxiv.org/abs/2412.04431"
authors:
  - "Jian Han"
  - "Jinlai Liu"
  - "Yi Jiang"
  - "Bin Yan"
  - "Yuqi Zhang"
  - "Zehuan Yuan"
published: "2024-12-05"
categories:
  - "cs.CV"
tags:
  - paper
  - understanding-generation
  - multimodal
  - bytedance
institution: "ByteDance"
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
aliases:
  - "Infinity"
extends:
  - "[[VQGAN]]"
  - "[[LlamaGen]]"
baseline:
  - "[[VQGAN]]"
  - "[[LlamaGen]]"
related_topic:
  - "[[ImageFolder]]"
  - "[[VQGAN-100k]]"
  - "[[VTP]]"
---

# Infinity

## 📌 核心贡献

> 该论文提出了一种在比特位令牌预测框架下重新定义视觉自回归模型的新方法。它通过引入无限词汇量分词器和比特位自校正机制，显著提升了图像生成能力与细节表现，并理论上实现了分词器词汇量和Transformer规模的无限扩展，从而超越了顶尖的扩散模型。

## 📖 摘要

\vspace{-0.2cm}
We present \methodNAME, a Bitwise Visual AutoRegressive Modeling capable of generating high-resolution, photorealistic images following language instruction.  \methodNAME redefines visual autoregressive model under a bitwise token prediction framework with an infinite-vocabulary tokenizer \& classifier and bitwise self-correction mechanism, remarkably improving the generation capacity and details. By theoretically scaling the tokenizer vocabulary size to infinity and concurrently scaling the transformer size, our method significantly unleashes powerful scaling capabilities compared to vanilla VAR.
\methodNAME sets a new record for autoregressive text-to-image models, outperforming top-tier diffusion models like SD3-Medium and SDXL. Notably, \methodNAME surpasses SD3-Medium by improving the GenEval benchmark score from \emph{0.62} to \emph{0.73} and the ImageReward benchmark score from \emph{0.87} to \emph{0.96}, achieving a win rate of \emph{66\%}. Without extra optimization, \methodNAME generates a high-quality \emph{1024}$\times$\emph{1024} image in 0.8 seconds, making it \emph{2.6}$\times$ faster than SD3-Medium and establishing it as the fastest text-to-image model. Models and codes will be released to promote further exploration of \methodNAME for visual generation and unified tokenizer modeling.

 🔗 相关论文

<!--  -->

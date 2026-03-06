---
arxiv_id: "2603.03583"
arxiv_url: "https://arxiv.org/abs/2603.03583"
authors:
  - "Chunyuan Deng"
  - "Sanket Lokegaonkar"
  - "Colin Lockard"
  - "Besnik Fetahu"
  - "Nasser Zalmout"
published: "2026-03-03"
categories:
  - "cs.CL"
  - "cs.LG"
tags:
  - paper
  - nlp
  - machine-learning
added: "2026-03-06"
rating: ""
institution: ""
---

# ByteFlow: Language Modeling through Adaptive Byte Compression without a Tokenizer

## 📌 核心贡献

> Modern language models still rely on fixed, pre-defined subword tokenizations. Once a tokenizer is trained, the LM can only operate at this fixed level of granularity, which often leads to brittle and counterintuitive behaviors even in otherwise strong reasoning models.

## 📖 摘要

Modern language models still rely on fixed, pre-defined subword tokenizations. Once a tokenizer is trained, the LM can only operate at this fixed level of granularity, which often leads to brittle and counterintuitive behaviors even in otherwise strong reasoning models. We introduce \textbf{ByteFlow Net}, a new hierarchical architecture that removes tokenizers entirely and instead enables models to learn their own segmentation of raw byte streams into semantically meaningful units. ByteFlow Net performs compression-driven segmentation based on the coding rate of latent representations, yielding adaptive boundaries \emph{while preserving a static computation graph via Top-$K$ selection}. Unlike prior self-tokenizing methods that depend on brittle heuristics with human-designed inductive biases, ByteFlow Net adapts its internal representation granularity to the input itself. Experiments demonstrate that this compression-based chunking strategy yields substantial performance gains, with ByteFlow Net outperforming both BPE-based Transformers and previous byte-level architectures. These results suggest that end-to-end, tokenizer-free modeling is not only feasible but also more effective, opening a path toward more adaptive and information-grounded language models.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-03 |
| 机构 |  |
| 分类 | cs.CL, cs.LG |
| 链接 | [arXiv](https://arxiv.org/abs/2603.03583) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

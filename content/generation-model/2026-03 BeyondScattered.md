---
arxiv_id: "2603.05454"
arxiv_url: "https://arxiv.org/abs/2603.05454"
authors:
  - "Pengxiang Li"
  - "Joey Tsai"
  - "Hongwei Xue"
  - "Kunyu Shi"
  - "Shilin Yan"
published: "2026-03-05"
categories:
  - "cs.CV"
tags:
  - paper
  - computer-vision
added: "2026-03-07"
rating: ""
institution: ""
---

# Beyond Scattered Acceptance: Fast and Coherent Inference for DLMs via Longest Stable Prefixes

## 📌 核心贡献

> 他们发现「扩散语言模型」（DLM）虽然能并行生成文本，但实际推理速度经常被不给力的解码调度器拖后腿。老方法像「散点接受」会无意中打碎「键值缓存」（KV cache），破坏内存局部性，让模型被迫在不稳定token边界反复修补，效率很低。所以他们提出了一个叫「最长稳定前缀」（LSP）的新调度器，让推理更连贯、更高效，直接从根本上解决卡顿问题！

## 📖 摘要

Diffusion Language Models (DLMs) promise highly parallel text generation, yet their practical inference speed is often bottlenecked by suboptimal decoding schedulers. Standard approaches rely on 'scattered acceptance'-committing high confidence tokens at disjoint positions throughout the sequence. This approach inadvertently fractures the Key-Value (KV) cache, destroys memory locality, and forces the model into costly, repeated repairs across unstable token boundaries. To resolve this, we present the Longest Stable Prefix (LSP) scheduler, a training-free and model-agnostic inference paradigm based on monolithic prefix absorption. In each denoising step, LSP evaluates token stability via a single forward pass, dynamically identifies a contiguous left-aligned block of stable predictions, and snaps its boundary to natural linguistic or structural delimiters before an atomic commitment. This prefix-first topology yields dual benefits: systemically, it converts fragmented KV cache updates into efficient, contiguous appends; algorithmically, it preserves bidirectional lookahead over a geometrically shrinking active suffix, drastically reducing token flip rates and denoiser calls. Extensive evaluations on LLaDA-8B and Dream-7B demonstrate that LSP accelerates inference by up to 3.4x across rigorous benchmarks including mathematical reasoning, code generation, multilingual (CJK) tasks, and creative writing while matching or slightly improving output quality. By fundamentally restructuring the commitment topology, LSP bridges the gap between the theoretical parallelism of DLMs and practical hardware efficiency.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-05 |
| 机构 |  |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2603.05454) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

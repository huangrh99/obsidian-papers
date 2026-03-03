---
title: "cozy: Comparative Symbolic Execution for Binary Programs"
arxiv_id: "2504.00151"
arxiv_url: "https://arxiv.org/abs/2504.00151"
authors:
  - "Caleb Helbling"
  - "Graham Leach-Krouse"
  - "Sam Lasser"
  - "Greg Sullivan"
published: "2025-03-31"
categories:
  - "cs.SE"
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
---

# BSQ Binary Spherical Quantization

## 📌 核心贡献

> Cozy 是一款通过符号执行框架 angr 比较二进制程序不同版本差异的工具，主要用于验证微补丁的正确性。其创新点在于分析补丁前后二进制文件的符号执行结果，找出两者兼容的最终状态，从而实现差异可视化。

## 📖 摘要

This paper introduces cozy, a tool for analyzing and visualizing differences between two versions of a software binary. The primary use case for cozy is validating "micropatches": small binary or assembly-level patches inserted into existing compiled binaries. To perform this task, cozy leverages the Python-based angr symbolic execution framework. Our tool analyzes the output of symbolic execution to find end states for the pre- and post-patched binaries that are compatible (reachable from the same input). The tool then compares compatible states for observable differences in registers, memory, and side effects. To aid in usability, cozy comes with a web-based visual interface for viewing comparison results. This interface provides a rich set of operations for pruning, filtering, and exploring different types of program data.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-03-31 |
| 分类 | cs.SE |
| 链接 | [arXiv](https://arxiv.org/abs/2504.00151) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

---
arxiv_id: "2603.04893"
arxiv_url: "https://arxiv.org/abs/2603.04893"
authors:
  - "Sean Lamont"
  - "Christian Walder"
  - "Paul Montague"
  - "Amir Dezfouli"
  - "Michael Norrish"
published: "2026-03-05"
categories:
  - "cs.CL"
  - "cs.AI"
tags:
  - paper
  - nlp
  - ai
added: "2026-03-07"
rating: ""
institution: ""
---

# Free Lunch for Pass@$k$? Low Cost Diverse Sampling for Diffusion Language Models

## 📌 核心贡献

> 这篇论文就像是给喜欢「瞎操心」、总出重复答案的扩散模型，找了个「省心」的办法，让它能生成五花八门、不重样的答案，特别适合那些需要「集思广益」的问题，比如写代码或者解数学题。

## 📖 摘要

Diverse outputs in text generation are necessary for effective exploration in complex reasoning tasks, such as code generation and mathematical problem solving. Such Pass@$k$ problems benefit from distinct candidates covering the solution space. However, traditional sampling approaches often waste computational resources on repetitive failure modes. While Diffusion Language Models have emerged as a competitive alternative to the prevailing Autoregressive paradigm, they remain susceptible to this redundancy, with independent samples frequently collapsing into similar modes. To address this, we propose a training free, low cost intervention to enhance generative diversity in Diffusion Language Models. Our approach modifies intermediate samples in a batch sequentially, where each sample is repelled from the feature space of previous samples, actively penalising redundancy. Unlike prior methods that require retraining or beam search, our strategy incurs negligible computational overhead, while ensuring that each sample contributes a unique perspective to the batch. We evaluate our method on the HumanEval and GSM8K benchmarks using the LLaDA-8B-Instruct model. Our results demonstrate significantly improved diversity and Pass@$k$ performance across various temperature settings. As a simple modification to the sampling process, our method offers an immediate, low-cost improvement for current and future Diffusion Language Models in tasks that benefit from diverse solution search. We make our code available at https://github.com/sean-lamont/odd.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-05 |
| 机构 |  |
| 分类 | cs.CL, cs.AI |
| 链接 | [arXiv](https://arxiv.org/abs/2603.04893) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

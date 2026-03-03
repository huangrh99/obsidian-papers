---
title: "Constrained Machine Learning: The Bagel Framework"
arxiv_id: "2112.01088"
arxiv_url: "https://arxiv.org/abs/2112.01088"
authors:
  - "Guillaume Perez"
  - "Sebastian Ament"
  - "Carla Gomes"
  - "Arnaud Lallouet"
published: "2021-12-02"
categories:
  - "cs.LG"
  - "cs.AI"
  - "cs.LO"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: "Bytedance"
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
---

# Constrained Machine Learning: The Bagel Framework

## 📌 核心贡献

> 这篇论文的核心贡献在于提出了BaGeL框架，旨在解决机器学习中难以处理的组合约束问题。其方法创新点在于将组合优化领域的现有工作整合到机器学习模型中，显著拓展了受限机器学习问题的建模能力。

## 📖 摘要

Machine learning models are widely used for real-world applications, such as document analysis and vision. Constrained machine learning problems are problems where learned models have to both be accurate and respect constraints. For continuous convex constraints, many works have been proposed, but learning under combinatorial constraints is still a hard problem. The goal of this paper is to broaden the modeling capacity of constrained machine learning problems by incorporating existing work from combinatorial optimization. We propose first a general framework called BaGeL (Branch, Generate and Learn) which applies Branch and Bound to constrained learning problems where a learning problem is generated and trained at each node until only valid models are obtained. Because machine learning has specific requirements, we also propose an extended table constraint to split the space of hypotheses. We validate the approach on two examples: a linear regression under configuration constraints and a non-negative matrix factorization with prior knowledge for latent semantics analysis.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Bytedance |
| 发表 | 2021-12-02 |
| 分类 | cs.LG, cs.AI, cs.LO |
| 链接 | [arXiv](https://arxiv.org/abs/2112.01088) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

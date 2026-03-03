---
title: "Got: Git, but for Objects"
arxiv_id: "1904.06584"
arxiv_url: "https://arxiv.org/abs/1904.06584"
authors:
  - "Rohan Achar"
  - "Cristina V. Lopes"
published: "2019-04-13"
categories:
  - "cs.PL"
  - "cs.DC"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: ""
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
---

# GoT

## 📌 核心贡献

> 这篇论文提出了 GoT（Global Object Tracker）模型，旨在解决分布式应用中可变、长寿命、可复制对象的状态同步问题。其创新点在于采用基于因果一致性的面向对象编程模型，并引入应用层冲突解决策略，借鉴去中心化版本控制（如 Git）的原理来管理复制对象的状态。

## 📖 摘要

We look at one important category of distributed applications characterized by the existence of multiple collaborating, and competing, components sharing mutable, long-lived, replicated objects. The problem addressed by our work is that of object state synchronization among the components. As an organizing principle for replicated objects, we formally specify the Global Object Tracker (GoT) model, an object-oriented programming model based on causal consistency with application-level conflict resolution strategies, whose elements and interfaces mirror those found in decentralized version control systems: a version graph, working data, diffs, commit, checkout, fetch, push, and merge. We have implemented GoT in a framework called Spacetime, written in Python.   In its purest form, GoT is impractical for real systems, because of the unbounded growth of the version graph and because passing diff'ed histories over the network makes remote communication too slow. We present our solution to these problems that adds some constraints to GoT applications, but that makes the model feasible in practice. We present a performance analysis of Spacetime for representative workloads, which shows that the additional constraints added to GoT make it not just feasible, but viable for real applications.



## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2019-04-13 |
| 分类 | cs.PL, cs.DC |
| 链接 | [arXiv](https://arxiv.org/abs/1904.06584) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

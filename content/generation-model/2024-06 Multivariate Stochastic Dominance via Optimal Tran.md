---
title: "Multivariate Stochastic Dominance via Optimal Transport and Applications to Models Benchmarking"
arxiv_id: "2406.06425"
arxiv_url: "https://arxiv.org/abs/2406.06425"
authors:
  - ""
published: "2024-06"
categories:
  - ""
tags:
  - paper
  - generative-model
  - multimodal
institution: ""
notion_topic: "生成模型"
added: "2026-03-03"
rating: ""
---

# Diffusability

## 📌 核心贡献

> 该论文通过利用耦合对多元一阶随机支配进行刻画，提出了一种基于具有平滑成本的最优传输框架来评估多元近似随机支配的统计量。为解决经验最优传输面临的维度灾难问题，作者进一步引入了该统计量的熵正则化，并为其经验形式建立了中心极限定理和自助法一致性。基于此，该研究还提出了一种假设检验框架并利用Sinkhorn算法实现了高效计算，以应用于多指标大语言模型的比较和基准测试。

## 📖 摘要

Stochastic dominance is an important concept in probability theory, econometrics and social choice theory for robustly modeling agents' preferences between random outcomes.  While many works have been dedicated to the univariate case,
little has been done in the multivariate scenario, wherein an agent has to decide between different multivariate outcomes. By exploiting a  characterization  of  multivariate first stochastic dominance in terms of couplings, we  introduce  a statistic that assesses multivariate almost stochastic dominance
under the framework of
Optimal Transport
with a smooth cost.
Further, we introduce an entropic regularization of this statistic, and establish a central limit theorem (CLT)
and consistency of the bootstrap procedure for the empirical statistic.
Armed with this CLT, we propose a hypothesis testing framework as well as an efficient implementation using the Sinkhorn algorithm. We showcase our  method in comparing and benchmarking Large Language Models that are evaluated on multiple metrics. Our multivariate stochastic dominance test allows us to capture the dependencies between the metrics in order to make an informed and statistically significant  decision on the relative performance of the models.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2024-06 |
| 分类 |  |
| 链接 | [arXiv](https://arxiv.org/abs/2406.06425) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

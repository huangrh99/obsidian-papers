---
arxiv_id: "2603.09014"
arxiv_url: "https://arxiv.org/abs/2603.09014"
authors:
  - "David Berthelot"
  - "Tianrong Chen"
  - "Jiatao Gu"
  - "Marco Cuturi"
  - "Laurent Dinh"
published: "2026-03-09"
categories:
  - "cs.LG"
  - "cs.CV"
tags:
  - paper
  - machine-learning
  - computer-vision
added: "2026-03-12"
rating: ""
institution: ""
---

# The Coupling Within: Flow Matching via Distilled Normalizing Flows

## 📌 核心贡献

> 传统的流模型训练时，噪声和数据怎么配对很重要。以前是独立配对，后来发现根据分布自适应配对（比如用最优传输）效果更好。这篇论文更进一步，不再直接计算这些配对，而是找个「老司机」（预训练模型）来教，用它「蒸馏」出来的配对方式来指导流模型的训练。这就像老司机直接教新人开车，比新人自己摸索路线效率高多了。

## 📖 摘要

Flow models have rapidly become the go-to method for training and deploying large-scale generators, owing their success to inference-time flexibility via adjustable integration steps. A crucial ingredient in flow training is the choice of coupling measure for sampling noise/data pairs that define the flow matching (FM) regression loss. While FM training defaults usually to independent coupling, recent works show that adaptive couplings informed by noise/data distributions (e.g., via optimal transport, OT) improve both model training and inference. We radicalize this insight by shifting the paradigm: rather than computing adaptive couplings directly, we use distilled couplings from a different, pretrained model capable of placing noise and data spaces in bijection -- a property intrinsic to normalizing flows (NF) through their maximum likelihood and invertibility requirements. Leveraging recent advances in NF image generation via auto-regressive (AR) blocks, we propose Normalized Flow Matching (NFM), a new method that distills the quasi-deterministic coupling of pretrained NF models to train student flow models. These students achieve the best of both worlds: significantly outperforming flow models trained with independent or even OT couplings, while also improving on the teacher AR-NF model.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-09 |
| 机构 |  |
| 分类 | cs.LG, cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2603.09014) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

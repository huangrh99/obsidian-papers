---
arxiv_id: "2510.10575"
arxiv_url: "https://arxiv.org/abs/2510.10575"
authors:
  - "Zhengrong Yue"
  - "Haiyu Zhang"
  - "Xiangyu Zeng"
  - "Boyu Chen"
  - "Chenting Wang"
  - "Shaobin Zhuang"
published: "2025-10-12"
categories:
  - "cs.CV"
tags:
  - paper
  - vision-tokenizer
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-04"
rating: ""
aliases:
  - "UniFlow"
extends:
  - "[[VQGAN]]"
  - "[[UniTok]]"
baseline:
  - "[[VQGAN]]"
  - "[[UniTok]]"
  - "[[FSQ]]"
related_topic:
  - "[[AToken]]"
  - "[[VidTok]]"
  - "[[TokenFlow]]"
---

# UniFlow: A Unified Pixel Flow Tokenizer for Visual Understanding and Generation

## 📌 核心贡献

> 提出 UniFlow 统一 tokenizer，通过 layer-wise adaptive self-distillation 在预训练视觉编码器上同时保留语义特征（用于理解）和细粒度细节（用于生成），有效缓解理解与生成之间的表征冲突。轻量级 patch-wise pixel flow decoder 以语义特征为条件，通过条件流匹配从噪声状态高效重建像素，ICLR 2026 收录，7B 版本在理解和生成双端均达到 SOTA。

## 📖 摘要

Tokenizer is a crucial component for both visual understanding and generation. To advance toward the ultimate goal of universal modeling, recent research has focused on developing a unified tokenizer. However, existing tokenizers face a significant performance trade-off between understanding and generation, stemming from the inherent conflict between high-level semantic abstraction and low-level pixel reconstruction. To tackle this challenge, we propose a generic and unified tokenizer, namely UniFlow, by flexibly adapting any visual encoder with a concise reconstruction decoder. Specifically, we introduce layer-wise adaptive self-distillation applied to the well-pretrained visual encoders, which enables UniFlow to simultaneously inherit the strong semantic features for visual understanding and flexibly adapt to model fine-grained details for visual generation. Moreover, we propose a lightweight patch-wise pixel flow decoder, which efficiently achieves high-fidelity pixel reconstruction by modeling a conditional flow from the noisy state back to the patch-wise pixel domain. By leveraging the semantic features as visual conditions for the decoder, we effectively alleviate the training conflicts between understanding and generation. Furthermore, the patch-wise learning strategy simplifies the data distribution, thereby improving training efficiency. Extensive experiments across 13 challenging benchmarks spanning 7 widely studied visual understanding and generation tasks demonstrate that UniFlow achieves a win-win outcome. For instance, our 7B UniFlow-XL not only surpasses the 14B TokenFlow-XL by 6.05% on average understanding benchmarks, but also achieves a competitive results in both visual reconstruction and generation, surpassing UniTok by 0.15 in rFID and 0.09 in gFID (without guidance), respectively.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-10-12 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2510.10575) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[VQGAN]], [[UniTok]]
**对比基线：** [[VQGAN]], [[UniTok]], [[FSQ]]
**同方向：** [[AToken]], [[VidTok]], [[TokenFlow]]

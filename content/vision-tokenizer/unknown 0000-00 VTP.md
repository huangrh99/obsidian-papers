---
title: "VTP"
arxiv_id: "2501.10781"
arxiv_url: "https://arxiv.org/abs/2501.10781"
authors:
  - ""
published: "unknown"
categories:
  - ""
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: "minimax"
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
---

# VTP

## 📌 核心贡献

> 结构:ViT提取视觉特征，文本Encoder是12层的Transformer结构，Pixel Decoder则是4层ViT结构。同时为了平衡语义表达能力与图片重建质量，在Pixel Encoder和Pixel Decoder之间插入了一个BottleNeck层，用于将高维特征进行降维。
训练的时候包括三种任务：
第一种是视觉重建任务：又分为两阶段的训练，第一阶段基于L1损失和Perceptual损失优化模型的所有参数；第二阶段则是基于GAN的损失仅优化Pixel Decoder部分；
第二种是自监督任务：包括两种部分，第一部分是Masked Image Modeling (MIM) ，第二种是DINO形式的自蒸馏。对于MIM，输入图片经过数据增强得到全局View和局部View两张图片，全局的View作为EMA teacher的输入，Masked之后的全局View作为视觉Tokenizer的Encoder的输入，之后用EMA Teacher的作为真值输出监督Encoder的学习；对于自蒸馏，则是全局View作为EMA Teacher的输入，局部View作为Encoder的输入，之后计算交叉熵损失。
第三种是对比学习：

## 📖 摘要

结构:ViT提取视觉特征，文本Encoder是12层的Transformer结构，Pixel Decoder则是4层ViT结构。同时为了平衡语义表达能力与图片重建质量，在Pixel Encoder和Pixel Decoder之间插入了一个BottleNeck层，用于将高维特征进行降维。
训练的时候包括三种任务：
第一种是视觉重建任务：又分为两阶段的训练，第一阶段基于L1损失和Perceptual损失优化模型的所有参数；第二阶段则是基于GAN的损失仅优化Pixel Decoder部分；
第二种是自监督任务：包括两种部分，第一部分是Masked Image Modeling (MIM) ，第二种是DINO形式的自蒸馏。对于MIM，输入图片经过数据增强得到全局View和局部View两张图片，全局的View作为EMA teacher的输入，Masked之后的全局View作为视觉Tokenizer的Encoder的输入，之后用EMA Teacher的作为真值输出监督Encoder的学习；对于自蒸馏，则是全局View作为EMA Teacher的输入，局部View作为Encoder的输入，之后计算交叉熵损失。
第三种是对比学习：

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | minimax |
| 发表 | unknown |
| 分类 |  |
| 链接 | [arXiv](https://arxiv.org/abs/2501.10781) |

## 📝 我的笔记



## 🔗 相关论文

<!-- [[wiki-link]] -->

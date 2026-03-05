---
arxiv_id: "2511.16917"
arxiv_url: "https://arxiv.org/abs/2511.16917"
authors:
  - "Chi Zhang"
  - "Jiepeng Wang"
  - "Youming Wang"
  - "Yuanzhi Liang"
  - "Xiaoyan Yang"
  - "Zuoxin Li"
published: "2025-11-21"
categories:
  - "cs.CV"
tags:
  - paper
  - computer-vision
  - multimodal
  - cuhk
added: "2026-03-05"
rating: ""
institution: "CUHK MMLab"
---

# UniModel: A Visual-Only Framework for Unified Multimodal Understanding and Generation

## 📌 核心贡献

> UniModel提出了一个纯视觉框架，通过将文本提示渲染为画布上的图像，并将所有输入输出视为RGB像素，从而将文本和图像映射到共享的视觉空间。该模型在一个像素到像素的扩散框架中，实现了模型、任务和表示的统一，支持视觉理解和视觉生成。

## 📖 摘要

We present UniModel, a unified generative model that jointly supports visual understanding and visual generation within a single pixel-to-pixel diffusion framework. Our goal is to achieve unification along three axes: the model, the tasks, and the representations. At the representation level, we eliminate modality discrepancies by mapping both text and images into a shared visual space: textual prompts are rendered as painted text images on a clean canvas, and all inputs and outputs are treated purely as RGB pixels. This yields a fully vision-native formulation of multimodal learning. At the task level, a broad range of vision-language problems are cast as pixel-to-pixel transformations in this visual space. For understanding tasks, the model takes an RGB image and produces a painted text image that visually encodes the semantic prediction. For generation tasks, painted text images serve as visual conditions that guide realistic and semantically aligned image synthesis. Captioning and text-to-image generation thus become different directions of the same underlying visual translation process. At the model level, we instantiate a single Unified Diffusion Transformer trained with rectified flow in pixel space. A shared backbone jointly learns bidirectional mappings between natural images and painted text images, with lightweight task embeddings to specify the desired direction. Experiments on text-to-image synthesis and image-to-text understanding demonstrate strong cross-modal alignment and emergent controllability such as cycle-consistent image-caption-image loops. Our initial exploration suggests that unifying model, tasks, and representations in a single visual space is a promising paradigm for general-purpose multimodal intelligence.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2025-11-21 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2511.16917) |

## 📝 我的笔记

## 🔗 相关论文

[[UniModel]]
[[DiT]]
[[LDM]]
[[VQGAN]]
[[CLIP]]

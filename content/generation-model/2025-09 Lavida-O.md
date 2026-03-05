---
arxiv_id: "2509.19244"
arxiv_url: "https://arxiv.org/abs/2509.19244"
authors:
  - "Shufan Li"
  - "Jiuxiang Gu"
  - "Kangning Liu"
  - "Zhe Lin"
  - "Zijun Wei"
  - "Aditya Grover"
published: "2025-09-23"
categories:
  - "cs.CV"
tags:
  - paper
  - computer-vision
  - multimodal
  - berkeley
added: "2026-03-05"
rating: ""
institution: "UC San Diego"
---

# Lavida-O: Elastic Large Masked Diffusion Models for Unified Multimodal Understanding and Generation

## 📌 核心贡献

> Lavida-O提出了一种统一的掩码扩散模型（MDM），旨在解决现有MDM在图像理解任务和高分辨率图像生成方面的局限性。它引入了新型弹性Mixture-of-Transformers（Elastic-MoT）架构，将轻量级生成分支与大型理解分支耦合，支持图像级理解、对象定位、图像编辑和高分辨率文本到图像合成。

## 📖 摘要

We propose Lavida-O, a unified Masked Diffusion Model (MDM) for multimodal understanding and generation. Unlike existing multimodal MDMs such as MMaDa and Muddit which only support simple image-level understanding tasks and low-resolution image generation, Lavida-O presents a single framework that enables image-level understanding, object grounding, image editing, and high-resolution (1024px) text-to-image synthesis. Lavida-O incorporates a novel Elastic Mixture-of-Transformers (Elastic-MoT) architecture that couples a lightweight generation branch with a larger understanding branch, supported by token compression, universal text conditioning and stratified sampling for efficient and high-quality generation. Lavida-O further incorporates planning and iterative self-reflection in image generation and editing tasks, seamlessly boosting generation quality with its understanding capabilities. Lavida-O achieves state-of-the-art performance on a wide range of benchmarks including RefCOCO object grounding, GenEval text-to-image generation, and ImgEdit image editing, outperforming existing autoregressive models and continuous diffusion models such as Qwen2.5-VL and FluxKontext-dev, while offering considerable speedup at inference. These advances establish Lavida-O as a new paradigm for scalable multimodal reasoning and generation.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2025-09-23 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2509.19244) |

## 📝 我的笔记

## 🔗 相关论文

[[Lavida-O]]
[[MMaDA]]
[[Muddit]]
[[DiT]]
[[LDM]]

---
arxiv_id: "2506.09344"
arxiv_url: "https://arxiv.org/abs/2506.09344"
authors:
  - "Inclusion AI"
  - "Biao Gong"
  - "Cheng Zou"
  - "Chuanyang Zheng"
  - "Chunluan Zhou"
  - "Canxiang Yan"
published: "2025-06-11"
categories:
  - "cs.AI"
  - "cs.CL"
  - "cs.CV"
tags:
  - paper
  - understanding-generation
  - multimodal
  - ant
institution: "Ant"
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
related_topic:
  - "[[AnyGPT]]"
  - "[[Mogao]]"
---

# Ming-Omni: A Unified Multimodal Model for Perception and Generation

## 📌 核心贡献

> Ming-Omni是一个统一的多模态模型，通过专用编码器和具有模态特定路由器的Ling MoE架构，实现对图像、文本、音频和视频的高效感知与融合。该模型创新性地支持语音和图像生成，可在一套框架下处理多样化任务，无需独立模型或额外微调。

## 📖 摘要

We propose Ming-Omni, a unified multimodal model capable of processing images, text, audio, and video, while demonstrating strong proficiency in both speech and image generation. Ming-Omni employs dedicated encoders to extract tokens from different modalities, which are then processed by Ling, an MoE architecture equipped with newly proposed modality-specific routers. This design enables a single model to efficiently process and fuse multimodal inputs within a unified framework, thereby facilitating diverse tasks without requiring separate models, task-specific fine-tuning, or structural redesign. Importantly, Ming-Omni extends beyond conventional multimodal models by supporting audio and image generation. This is achieved through the integration of an advanced audio decoder for natural-sounding speech and Ming-Lite-Uni for high-quality image generation, which also allow the model to engage in context-aware chatting, perform text-to-speech conversion, and conduct versatile image editing. Our experimental results showcase Ming-Omni offers a powerful solution for unified perception and generation across all modalities. Notably, our proposed Ming-Omni is the first open-source model we are aware of to match GPT-4o in modality support, and we release all code and model weights to encourage further research and development in the community.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Ant |
| 发表 | 2025-06-11 |
| 分类 | cs.AI, cs.CL, cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2506.09344) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[AnyGPT]], [[Mogao]]
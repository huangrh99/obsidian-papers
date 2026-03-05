---
arxiv_id: "non-arxiv"
arxiv_url: "https://z.ai/blog/glm-image"
authors:
  - "智谱 AI (Z.ai / THUDM)"
published: "2026-01-14"
categories:
  - "cs.CV"
institution: "智谱AI (Z.ai)"
tags:
  - generation-model
  - paper
  - autoregressive
  - diffusion
  - tsinghua
added: "2026-03-05"
rating: ""
aliases:
  - "GLM-Image"
---

# GLM-Image: Auto-regressive for Dense-knowledge and High-fidelity Image Generation

## 📌 核心贡献

> 智谱 AI 发布首个开源工业级**离散自回归图像生成模型**。采用 AR + Diffusion 解耦混合架构：自回归模块（基于 GLM-4-9B，9B 参数）负责低频语义 token，扩散 decoder（CogView4 单流 DiT，7B 参数）负责高频细节还原。核心亮点是**文字渲染**和**知识密集型生成**场景超越主流扩散模型，同时支持图像编辑、风格迁移、ID 一致性生成等多种 image-to-image 任务。

## 📖 摘要

GLM-Image is the first open-source, industrial-grade discrete auto-regressive image generation model. It adopts a hybrid architecture combining an auto-regressive module (GLM-4-9B-based, 9B params) with a diffusion decoder (CogView4-style single-stream DiT, 7B params). The AR part generates semantic-VQ tokens carrying low-frequency semantic signals; the diffusion decoder refines high-frequency details to produce the final image. This design excels at text rendering and knowledge-intensive generation while maintaining strong general image quality. Supports text-to-image, image editing, style transfer, identity-preserving generation, and multi-subject consistency.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-01-14 |
| 机构 | 智谱AI (Z.ai / THUDM) |
| 类型 | 技术博客（非 arxiv） |
| GitHub | https://github.com/zai-org/GLM-Image |
| HuggingFace | https://huggingface.co/zai-org/GLM-Image |
| 链接 | [z.ai blog](https://z.ai/blog/glm-image) |

## ⚡ 技术亮点

- **Visual Token Selection**：采用 semantic-VQ（来自 XOmni tokenizer）作为 AR token，兼顾语义相关性和信息完整性，相比 VQVAE token 训练收敛更快（loss ~3 vs ~7）
- **AR Pre-training**：MRoPE 位置编码支持图文交错；三阶段分辨率训练（256→512→1024px）；高分辨率阶段引入渐进式生成策略先生成 256 token 布局再细化
- **Decoder**：单流 DiT + flow matching；semantic-VQ token 经 projection 与 VAE latent 沿 channel 拼接，不增加序列长度；去除文本 encoder 输入；引入 Glyph-byT5 增强中文字符渲染
- **Post-training**：AR 模块和 Diffusion Decoder 分别用 GRPO 优化（Decoder 用 flow-GRPO）；AR 侧 reward：HPSv3 + OCR + VLM；Decoder 侧 reward：LPIPS + OCR + 手部评分模型

## 📊 评测亮点

- **CVTG-2k 文字渲染**：NED=0.9557，Word Accuracy avg=0.9116，开源模型第一
- **LongText-Bench-ZH**：0.9788，中文长文本渲染仅次于 Seedream 4.5（闭源）
- **DPG-Bench 综合**：84.78，与 GPT Image 1 同级，开源模型中表现优秀

## 📝 我的笔记

## 🔗 相关论文

- [[Self-Flow]] (BFL Self-Flow，同为 AR+扩散混合思路)
- CogView4（未入库） (Decoder backbone 来源)

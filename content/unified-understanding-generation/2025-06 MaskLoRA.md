---
arxiv_id: "2506.10082"
arxiv_url: "https://arxiv.org/abs/2506.10082"
authors:
  - ""
published: "2025-06"
categories:
  - ""
tags:
  - paper
  - understanding-generation
  - multimodal
  - skywork
institution: "Skywork"
notion_topic: "理解生成统一"
added: "2026-03-03"
rating: ""
aliases:
  - "MaskLoRA"
related_topic:
  - "[[VQGAN]]"
---

# UniPic-2

## 📌 核心贡献

> 提出基于时空 mask 的 LoRA 微调方法，将预训练图像到视频模型适配为灵活的视频编辑工具。核心创新是用空时掩码引导 LoRA 学习双重能力：在指定区域保留原始内容或生成新内容，同时控制生成区域的时序一致运动或基于参考帧的新外观，实现对视频编辑时序演变的精细控制。

## 📖 摘要

Video editing using diffusion models has achieved remarkable results in generating high-quality edits for videos. However, current methods often rely on large-scale pretraining, limiting flexibility for specific edits. First-frame-guided editing provides control over the first frame, but lacks fine-grained control over the edit's subsequent temporal evolution. To address this, we propose a mask-based LoRA (Low-Rank Adaptation) tuning method that adapts pretrained Image-to-Video models for flexible video editing.
Our key innovation is using a spatiotemporal mask to strategically guide the LoRA fine-tuning process. This teaches the model two distinct skills: first, to interpret the mask as a command to either preserve content from the source video or generate new content in designated regions. Second, for these generated regions, LoRA learns to synthesize either temporally consistent motion inherited from the video or novel appearances guided by user-provided reference frames.
This dual-capability LoRA grants users control over the edit's entire temporal evolution, allowing complex transformations like an object rotating or a flower blooming. Experimental results show our method achieves superior video editing performance compared to baseline methods. The code and video results are available at our project website: \href{https://cjeen.github.io/LoRAEdit}{https://cjeen.github.io/LoRAEdit}.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 | Skywork |
| 发表 | 2025-06 |
| 分类 |  |
| 链接 | [arXiv](https://arxiv.org/abs/2506.10082) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[VQGAN]]
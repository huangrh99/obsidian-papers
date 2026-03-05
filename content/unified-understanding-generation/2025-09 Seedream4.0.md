---
arxiv_id: "2509.20427"
arxiv_url: "https://arxiv.org/abs/2509.20427"
authors:
  - "Team Seedream"
  - " :"
  - "Yunpeng Chen"
  - "Yu Gao"
  - "Lixue Gong"
  - "Meng Guo"
published: "2025-09-24"
categories:
  - "cs.CV"
tags:
  - paper
  - understanding-generation
  - multimodal
institution: ""
notion_topic: "理解生成统一"
added: "2026-03-04"
rating: ""
related_topic:
  - "[[Transfusion]]"
  - "[[OmniGen]]"
---

# Seedream 4.0: Toward Next-generation Multimodal Image Generation

## 📌 核心贡献

> 纯diffusion结构，VLM只用于PE作prompt改写

## 📖 摘要

We introduce Seedream 4.0, an efficient and high-performance multimodal image generation system that unifies text-to-image (T2I) synthesis, image editing, and multi-image composition within a single framework. We develop a highly efficient diffusion transformer with a powerful VAE which also can reduce the number of image tokens considerably. This allows for efficient training of our model, and enables it to fast generate native high-resolution images (e.g., 1K-4K). Seedream 4.0 is pretrained on billions of text-image pairs spanning diverse taxonomies and knowledge-centric concepts. Comprehensive data collection across hundreds of vertical scenarios, coupled with optimized strategies, ensures stable and large-scale training, with strong generalization. By incorporating a carefully fine-tuned VLM model, we perform multi-modal post-training for training both T2I and image editing tasks jointly. For inference acceleration, we integrate adversarial distillation, distribution matching, and quantization, as well as speculative decoding. It achieves an inference time of up to 1.8 seconds for generating a 2K image (without a LLM/VLM as PE model). Comprehensive evaluations reveal that Seedream 4.0 can achieve state-of-the-art results on both T2I and multimodal image editing. In particular, it demonstrates exceptional multimodal capabilities in complex tasks, including precise image editing and in-context reasoning, and also allows for multi-image reference, and can generate multiple output images. This extends traditional T2I systems into an more interactive and multidimensional creative tool, pushing the boundary of generative AI for both creativity and professional applications. We further scale our model and data as Seedream 4.5. Seedream 4.0 and Seedream 4.5 are accessible on Volcano Engine https://www.volcengine.com/experience/ark?launch=seedream.

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-09-24 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2509.20427) |

## 📝 我的笔记



## 🔗 相关论文

**同方向：** [[Transfusion]], [[OmniGen]]
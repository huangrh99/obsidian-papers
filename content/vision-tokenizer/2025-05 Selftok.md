---
arxiv_id: "2505.07538"
arxiv_url: "https://arxiv.org/abs/2505.07538"
authors:
  - "Bohan Wang"
  - "Zhongqi Yue"
  - "Fengda Zhang"
  - "Shuo Chen"
  - "Li'an Bi"
  - "Junzhe Zhang"
published: "2025-05-12"
categories:
  - "cs.CV"
tags:
  - paper
  - vision-tokenizer
  - multimodal
institution: ""
notion_topic: "视觉编码器/词表"
added: "2026-03-03"
rating: ""
extends:
  - "[[VQGAN]]"
baseline:
  - "[[VQGAN]]"
  - "[[FSQ]]"
related_topic:
  - "[[LlamaGen]]"
  - "[[UniTok]]"
  - "[[FQGAN]]"
---

# Selftok

## 📌 核心贡献

> Selftok 提出了一种新颖的离散视觉分词器，彻底摒弃了传统的图像空间先验。它通过将逆扩散过程融入视觉tokens，引入了自回归（AR）特性，使其在本质上区别于传统的空间tokens，实现了方法上的重大创新。

## 📖 摘要

We completely discard the conventional spatial prior in image representation and introduce a novel discrete visual tokenizer: Self-consistency Tokenizer (Selftok). At its design core, we compose an autoregressive (AR) prior -- mirroring the causal structure of language -- into visual tokens by using the reverse diffusion process of image generation. The AR property makes Selftok fundamentally distinct from traditional spatial tokens in the following two key ways: - Selftok offers an elegant and minimalist approach to unify diffusion and AR for vision-language models (VLMs): By representing images with Selftok tokens, we can train a VLM using a purely discrete autoregressive architecture -- like that in LLMs -- without requiring additional modules or training objectives. - We theoretically show that the AR prior satisfies the Bellman equation, whereas the spatial prior does not. Therefore, Selftok supports reinforcement learning (RL) for visual generation with effectiveness comparable to that achieved in LLMs. Besides the AR property, Selftok is also a SoTA tokenizer that achieves a favorable trade-off between high-quality reconstruction and compression rate. We use Selftok to build a pure AR VLM for both visual comprehension and generation tasks. Impressively, without using any text-image training pairs, a simple policy gradient RL working in the visual tokens can significantly boost the visual generation benchmark, surpassing all the existing models by a large margin. Therefore, we believe that Selftok effectively addresses the long-standing challenge that visual tokens cannot support effective RL. When combined with the well-established strengths of RL in LLMs, this brings us one step closer to realizing a truly multimodal LLM. Project Page: https://selftok-team.github.io/report/.

 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 机构 |  |
| 发表 | 2025-05-12 |
| 分类 | cs.CV |
| 链接 | [arXiv](https://arxiv.org/abs/2505.07538) |

## 📝 我的笔记



## 🔗 相关论文

**基于/改进自：** [[VQGAN]]
**对比基线：** [[VQGAN]], [[FSQ]]
**同方向：** [[LlamaGen]], [[UniTok]], [[FQGAN]]

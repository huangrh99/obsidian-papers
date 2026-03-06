---
arxiv_id: "2603.03818"
arxiv_url: "https://arxiv.org/abs/2603.03818"
authors:
  - "Huihan Liu"
  - "Changyeon Kim"
  - "Bo Liu"
  - "Minghuan Liu"
  - "Yuke Zhu"
published: "2026-03-04"
categories:
  - "cs.LG"
  - "cs.AI"
  - "cs.RO"
tags:
  - paper
  - machine-learning
  - ai
  - robotics
added: "2026-03-06"
rating: ""
institution: ""
---

# Pretrained Vision-Language-Action Models are Surprisingly Resistant to Forgetting in Continual Learning

## 📌 核心贡献

> 机器人学会新技能的同时，老技能会「突然失忆」——这是持续学习的经典难题。这篇论文把现代大规模预训练的 VLA（视觉-语言-动作模型）放进同样的考卷，在仿真任务上跑了多个连续任务序列（真机实验规模有限，待更大范围核实），发现它们的表现出乎所有人意料。

## 📖 摘要

Continual learning is a long-standing challenge in robot policy learning, where a policy must acquire new skills over time without catastrophically forgetting previously learned ones. While prior work has extensively studied continual learning in relatively small behavior cloning (BC) policy models trained from scratch, its behavior in modern large-scale pretrained Vision-Language-Action (VLA) models remains underexplored. In this work, we found that pretrained VLAs are remarkably resistant to forgetting compared with smaller policy models trained from scratch. Simple Experience Replay (ER) works surprisingly well on VLAs, sometimes achieving zero forgetting even with a small replay data size. Our analysis reveals that pretraining plays a critical role in downstream continual learning performance: large pretrained models mitigate forgetting with a small replay buffer size while maintaining strong forward learning capabilities. Furthermore, we found that VLAs can retain relevant knowledge from prior tasks despite performance degradation during learning new tasks. This knowledge retention enables rapid recovery of seemingly forgotten skills through finetuning. Together, these insights imply that large-scale pretraining fundamentally changes the dynamics of continual learning, enabling models to continually acquire new skills over time with simple replay. Code and more information can be found at https://ut-austin-rpl.github.io/continual-vla

## 🔍 关键信息

| 字段 | 内容 |
|------|------|
| 发表 | 2026-03-04 |
| 机构 |  |
| 分类 | cs.LG, cs.AI, cs.RO |
| 链接 | [arXiv](https://arxiv.org/abs/2603.03818) |

## 📝 我的笔记

## 🔗 相关论文

<!-- 可手动添加 [[wiki-link]] -->

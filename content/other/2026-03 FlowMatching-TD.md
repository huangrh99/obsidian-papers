---
arxiv_id: "2603.04333"
arxiv_url: "https://arxiv.org/abs/2603.04333"
authors:
  - "Bhavya Agrawalla"
  - "Michal Nauman"
  - "Aviral Kumar"
published: "2026-03-06"
categories:
  - "cs.LG"
tags:
  - paper
  - reinforcement-learning
  - flow-matching
  - td-learning
  - cmu
added: "2026-03-06"
rating: "8"
aliases:
  - "FlowMatching-TD"
institution: "CMU, University of Warsaw"
xhs_published: "2026-03-06"
xhs_note_id: "69aacca7000000001a0345ec"
---

# What Does Flow Matching Bring To TD Learning?

## 📌 核心贡献

Flow Matching critic 在 TD 学习中优于传统 monolithic critic 的真正原因不是分布建模，而是**积分读出（integration readout）+ 稠密速度监督（dense velocity supervision）**两个独立机制。

## 🔑 关键发现

- **积分读出**：通过多步积分估 Q 值，早期误差被后续步骤修正（推理时自我修复），类似积分算面积比直接估点更稳定
- **稠密梯度监督**：每一步都有速度场梯度信号，让网络特征更具可塑性，不易在学习新目标时覆盖旧知识
- **分布 RL 是负向的**：刻意加上分布建模反而可能降性能——有效的是上面两个机制，不是分布本身
- 两个机制相互独立可分析，消融实验验证扎实

## 📊 实验结果

- 在线 RL 快速适应场景：最终性能是传统方法 2×，采样效率高约 5×

## 🤔 局限 / 待追问

- 连续动作空间稀疏奖励场景下是否 hold？
- 积分步数越多推理开销越大，计算代价与收益权衡曲线未讨论
- "稠密速度监督"在 off-policy 数据下的稳定性

## 💡 延伸思考

推理时多跑几步积分修正 Q 值误差 → RL 里的 test-time compute scaling 是否可行？

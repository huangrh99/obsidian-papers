---
date: 2026-03-02
type: reference
tags: [OpenClaw, 子Agent, token优化, 技术机制, JARVIS升级]
source: 小红书 OpenClaw 社区帖子（13篇高收藏），2026-03-02 对话
---

# OpenClaw 子 Agent 机制与优化技巧

## 核心内容

JARVIS 主动搜索 OpenClaw 使用技巧，从社区帖子提炼出 4 个高价值升级点，其中发现一个关键的**子 Agent 信息隔离问题**。

## 关键点

**① 子 Agent 分工降 token（最高优先）**
- 主 Agent 只做调度/监工，具体任务 route 到子 Agent 用便宜模型跑
- `agent-router.md` 已实现，但 SOUL.md 里未显式写出调度者定位

**② 🚨 子 Agent 只能看到 AGENTS.md 和 TOOLS.md**
- **SOUL.md / USER.md / MEMORY.md 子 Agent 看不到！**
- 全局规则（禁止 opus、路由 gemini）目前在 MEMORY.md，子 Agent 无法遵守
- 待办：把最关键的全局规则抄一份到 TOOLS.md

**③ web_fetch 加 Accept: text/markdown header 省 80% token**
- 支持 Cloudflare Markdown for Agents 的网站直接返回 markdown
- 需确认 OpenClaw 是否已内置支持

**④ 隐藏功能：Hooks + Webhook**
- 已开启：`boot-md` hook、`session-memory` hook
- 未用：webhook 让外部系统触发 Agent
- 可探索：TypeScript 自定义 handler

## 为什么重要 / 关联

- 第②点是系统性隐患：派出的 subagent 可能使用 opus（高费用）或不遵守路由规则
- 修复方案：在 TOOLS.md 头部加「全局约束」区块，列出所有 Agent 必须遵守的规则
- 与 `memory/agent-router.md` 和 `AGENTS.md` 直接关联

## 原始输入

> Boss 指令：「搜索 openclaw 的使用技巧，用这个来提升你自己」，时间：2026-03-02 00:58 GMT+8

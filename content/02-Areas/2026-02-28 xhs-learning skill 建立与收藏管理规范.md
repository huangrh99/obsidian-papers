---
date: 2026-02-28
type: reference
tags: [xhs, skill, learning, bookmark, queue, openclaw]
source: 今日对话 (会话 2cde05ef)
---

# xhs-learning skill：小红书收藏学习管理规范

## 核心内容

创建了 `~/.agents/skills/xhs-learning/SKILL.md`，规范化小红书收藏内容的学习管理流程，用 queue/learned 双文件系统追踪学习进度。

## 关键点

- **触发词**：`学习收藏` / `xhs收藏` / `看看收藏` / `xhs学习`
- **存储路径**：`~/.agents/skills/xhs-learning/`
  - `queue.json` — 待学习队列（只存 id + title + added_at，不存 url/token）
  - `learned.json` — 已学习记录
- **收藏 API**：`GET /api/v1/user/collects`（注意：不是 `/get_my_collects`）
- **设计原则**：url 和 token 动态过期，不要存；用 id 在需要时重新获取

## 初始状态

- 初始化时入队 10 条收藏
- learned.json 初始为空（正确，从零开始追踪）

## 为什么重要 / 关联

- 解决了 Boss 收藏大量内容但没有系统化学习的痛点
- 与 xhs-publisher、知识库归档系统形成联动
- 对应 MEMORY.md 触发词已更新

## 原始输入

> Boss 要求创建小红书收藏学习管理 skill，规范化学习流程和进度追踪。

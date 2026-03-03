---
date: 2026-03-03
type: reference
tags: [self-improving-agent, skill, 记忆系统, JARVIS, 持续改进]
source: 2026-03-03 对话记录 (凌晨 00:42-01:00)
---

# Self-Improving Agent Skill 安装与旧数据迁移

## 核心内容

从 ClawHub 安装 `self-improving-agent` skill，并将旧 MISTAKES.md 和 ref-mistakes-archive.md 内容迁移到新的 .learnings/ 格式体系。

## 关键点

- 安装路径：~/.openclaw/workspace/skills/self-improving-agent/
- 三个核心文件：
  - .learnings/ERRORS.md — 操作失败记录（5条迁移）
  - .learnings/LEARNINGS.md — 纠正/最佳实践（8条迁移）
  - .learnings/FEATURE_REQUESTS.md — 未支持的功能请求
- 迁移内容：xhs删错评论、登录误报、Discord配置冲突、收藏假数据等历史错误
- 原始 MISTAKES.md 和 ref-mistakes-archive.md 保留，加迁移说明

## 新机制

- 操作失败/命令报错 → .learnings/ERRORS.md
- Boss 纠正我 → .learnings/LEARNINGS.md (category: correction)
- 发现更好方法 → .learnings/LEARNINGS.md (category: best_practice)
- Boss 要求不存在的功能 → .learnings/FEATURE_REQUESTS.md

## 为什么重要 / 关联

- 从被动错误记录 → 主动学习机制的升级
- 与 AGENTS.md 的「行为规范（从错误中提炼）」相互补充
- 关联：~/.openclaw/workspace/.learnings/

## 原始输入

> Boss: 去 clawhub 下载 self-improving agent
> Boss: 可以的。之前我已经让你创建过类似的，你可以迁移一下吗
> 迁移完成：5个 ERRORS + 8条 LEARNINGS

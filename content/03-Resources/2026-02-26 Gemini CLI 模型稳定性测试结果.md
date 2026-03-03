---
date: 2026-02-26
type: reference
tags: [gemini, LLM, agent-routing, tools]
source: 会话记录 2026-02-26 00:26
---

# Gemini CLI 模型稳定性测试结果

## 核心内容

对 Gemini CLI 所有可用模型进行全面测试，确定稳定可用模型和路由策略。gemini-3 preview 系列因容量受限经常报 429，不适合作为默认模型。

## 关键点

- **gemini-2.5-pro**：延迟 ~16s，适合复杂任务、架构设计、代码审查
- **gemini-2.5-flash**：延迟 ~23s，适合日常编码、功能实现
- **gemini-2.5-flash-lite**：延迟 ~15s，适合轻量任务、快速脚本
- gemini-3-pro-preview / gemini-3-flash-preview / gemini-3.1-pro-preview —— 容量受限，429 频发，不可靠
- 遇 429 降级策略：gemini-3 系列 → 回退到 gemini-2.5-pro

## 路由策略（已落地到 SKILL.md）

| 任务类型 | 模型 |
|---------|------|
| 复杂/架构 | gemini-2.5-pro |
| 日常编码 | gemini-2.5-flash |
| 快速脚本 | gemini-2.5-flash-lite |
| 遇 429 时 | 降级 gemini-2.5-pro |

## 为什么重要 / 关联

独立任务路由 Gemini 是降低 Anthropic token 消耗的核心策略。稳定可用模型列表是 agent-router 规则的基础，已更新到 coding-agent SKILL.md。

## 原始输入

> gemini-cli 完整测试所有模型，确认 2.5-pro/flash/flash-lite 稳定，gemini-3 preview 系列容量受限经常 429

---
date: 2026-03-03
type: reference
tags: [Notion, Obsidian, 论文归档, 知识库, 自动化]
source: 2026-03-03 对话记录 (凌晨 00:02-00:10)
---

# Notion 论文批量归档 Obsidian 操作记录

## 核心内容

将 Notion 论文知识库（91 篇）批量归档到 Obsidian `03-Resources/papers/` 目录。
实际完成 84 篇（81 篇来自 Notion + 3 篇已有），每篇含 YAML frontmatter、核心贡献、arxiv 摘要。

## 关键点

- Notion integration 权限问题：需要在 Notion 页面手动添加 openclaw connection（子页面继承父页面权限）
- `linked database`（视图）和独立 DB 不同，linked view 的 ID 查不到数据，要用旧版 API
- 覆盖 topic：理解生成统一 / 视觉编码器 / 词表 / 生成模型 / VLM
- 未覆盖 topic（0篇）：LLM / 视频理解 / 视频生成 / reasoning / 强化学习（Notion 中数据未填）

## 为什么重要 / 关联

- 建立了 Notion → Obsidian 论文同步的完整流程，可复用
- 关联：`02-Areas/2026-02-26 Notion 论文知识库 9-Topic 体系.md`
- 后续 Notion 新增论文后，可再次触发同步

## 技术备注

旧版 API: POST /v1/databases/{id}/query
新版 linked view 查不到数据，需找真实 source DB ID
papers 目录：~/Documents/Library/Obsidian/02-Personal/03-Resources/papers/

## 原始输入

> Boss: 你看看我的 notion 的论文，已经有很多了。你都归档到 obsidian
> 结果：84 篇归档完成

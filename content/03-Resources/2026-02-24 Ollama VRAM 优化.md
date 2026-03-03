---
date: 2026-02-24
type: reference
tags: [Ollama, VRAM, 显存, 优化, Apple Silicon, Mac mini]
source: 2026-02-23 研究记录
---

# Ollama VRAM / 内存占用优化

## 背景

Mac mini（Apple Silicon）GPU/RAM 共享统一内存。`qwen3-embedding:0.6b` 常驻时占用约 **1.4 GB** 内存。

## 优化方案

### 方案 1：设 KEEP_ALIVE=0（推荐）

让 Ollama 在模型使用完后立即卸载，平时内存占用接近 0：

```bash
# 临时生效
launchctl setenv OLLAMA_KEEP_ALIVE 0

# 重启 Ollama
brew services restart ollama

# 验证（应显示空列表）
ollama ps
```

效果：不用时 0 占用，mem0 查询时短暂加载（几秒内）。

### 方案 2：手动卸载

```bash
ollama stop qwen3-embedding:0.6b
```

### 方案 3：换更小模型（不建议）

- `nomic-embed-text`（274 MB）
- 缺点：换模型需重建所有向量，已有记忆失效

## 关键点

- Ollama 默认 KEEP_ALIVE = 5 分钟（模型在内存中保留 5 分钟）
- Apple Silicon 统一内存，GPU 显存即 RAM
- 最小代价方案：KEEP_ALIVE=0，用时加载，不用时释放

## 原始输入

> 上网搜索如何减少 openclaw 的显存占用（Boss，2026-02-23）

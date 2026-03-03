---
date: 2026-02-24
type: reference
tags: [OpenClaw, token, 优化, 成本控制, 配置]
source: 2026-02-23 研究记录
---

# OpenClaw Token 消耗优化

## 诊断命令

```
/context list      # 看每个文件占多少 token
/context detail    # 更详细的分解
/status            # 当前上下文窗口用了多少
/usage tokens      # 每次回复显示用量
```

## Token 消耗来源（每轮必花）

| 文件 | 说明 |
|------|------|
| AGENTS.md | 最大，行为规范 |
| SOUL.md | 人格设定 |
| TOOLS.md | 工具配置 |
| MEMORY.md | 静态配置（已精简到 880B） |
| HEARTBEAT.md | 心跳任务列表 |
| USER.md | 用户信息 |

## 优化方法（效果从大到小）

### 1. 精简工作区文件

```bash
wc -c ~/.openclaw/workspace/*.md  # 检查各文件大小
```
- AGENTS.md 可删掉不需要的章节
- HEARTBEAT.md 任务完成后立即清空
- MEMORY.md 保持纯静态速查表

### 2. 降低心跳频率

心跳每次触发消耗一整轮 token（含完整 system prompt）。
建议：从 15 分钟 → 30~60 分钟，对月度 API 费用影响显著。

### 3. 长会话用 /compact

```
/compact Focus on decisions and open questions
```

### 4. 开新会话

会话越长，历史 token 越多。复杂任务完成后用 `/new`。

### 5. 禁用不常用工具

工具 schema 本身占 token（如 `browser` 约 2453 tok）。
在 `openclaw.json` 的 `tools.deny` 禁用：

```json
{
  "tools": {
    "deny": ["tts", "nodes"]
  }
}
```

### 6. 限制工作区文件注入大小

```json
{
  "agents": {
    "defaults": {
      "bootstrapMaxChars": 10000
    }
  }
}
```

## 原始输入

> 上网搜索如何减少 openclaw 的 token 消耗（Boss，2026-02-23）

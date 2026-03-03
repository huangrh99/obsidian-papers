---
date: 2026-03-02
type: reference
tags: [TTS, 声音克隆, F5-TTS, CosyVoice2, Apple-Silicon, AI工具]
source: 2026-03-02 对话日志
---

# F5-TTS + CosyVoice2 声音克隆实验

## 核心内容

Boss 探索本地声音克隆方案，从 Edge TTS → F5-TTS → CosyVoice2 逐步升级。最终目标：克隆 Boss 自己的声音，用于 TTS 场景（中英文混读）。

## 关键点

- **F5-TTS 1.1.16** 已安装完成：`~/f5-tts/venv`，Apple MPS ✅
  - 参考音频：`~/f5-tts/ref_audio2.wav`（Boss 自己的录音）
  - 输出目录：`~/f5-tts/output/`
  - 中文效果尚可，英文生硬（针对中文优化）
- **CosyVoice2**（阿里出品）：仓库已克隆到 `~/CosyVoice`，安装未完成
  - 特点：中英文混读最自然，零样本克隆，适配 Mac Apple Silicon
  - 下次 session 需继续安装
- **Edge TTS**：免费但不支持声音克隆，只有微软预设神经语音
- **底线坚守**：拒绝了克隆 IU 声音的请求（版权/法律）

## 为什么重要 / 关联

- CosyVoice2 安装完成后，可以给 JARVIS 配上 Boss 声音的 TTS
- 与 OpenClaw TTS 配置相关（`/config tts`）
- 后续可集成到 heartbeat 通知、Discord 消息朗读等场景

## 原始输入

> 2026-03-02 深夜 TTS 实验对话（02:40 - 04:10），来自 2026-03-02.md 日志

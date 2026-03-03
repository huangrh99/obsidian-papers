---
date: 2026-03-03
type: task
tags: [CosyVoice2, TTS, OpenClaw, 声音克隆, 待办]
source: 2026-03-03 对话记录
---

# CosyVoice2 接入 OpenClaw TTS 规划

## 核心内容

CosyVoice 2 已于 2026-03-03 凌晨跑通，中英文混读推理测试 ✅，Mac 音频播放 ✅。
下一步方向：将 CosyVoice 2 接入 OpenClaw TTS，使 JARVIS 的语音回复使用 Boss 的声音。

## 关键点

- CosyVoice 2 已解决 SIGTERM 中断 + `pkg_resources` 报错，运行稳定
- 中英混说是 CosyVoice 2 的强项，效果经过测试验证
- iMessage 暂不支持发音频文件（只能发文字），远程听效果需要 AirPlay/AirDrop
- 三个接入方向：AirPlay / AirDrop / 接入 OpenClaw TTS 语音气泡

## 为什么重要 / 关联

- 这是让 JARVIS 具备"Boss 声音"的关键路径
- 接入后可通过 iMessage/Telegram 发语音气泡，实现真正的个性化 TTS
- 关联：`02-Areas/2026-03-02 F5-TTS + CosyVoice2 声音克隆实验.md`

## 待办事项

- [ ] 研究 OpenClaw TTS 接入方式（API/插件/钩子）
- [ ] 确认 Boss 对音频效果的评价（像不像声音）
- [ ] 实现语音气泡通过 iMessage/Telegram 发送

## 原始输入

> Boss 问能否通过 iMessage 发音频 → 暂不支持，提供了 AirDrop / AirPlay / 接入 OpenClaw TTS 三个备选方向

---
date: 2026-02-28
type: task
tags: [xhs, mac, mcp, accessibility, applescript, rednote]
source: 今日对话 (会话 1047bb48)
---

# xhs-mac-mcp：用 Accessibility API 控制 Mac 版小红书

## 核心内容

Boss 发现 Mac 上已有 `/Applications/rednote.app`（iOS 版小红书通过 Apple Silicon 兼容层运行），提出创建 xhs-mac-mcp 工具，通过 AppleScript + Accessibility API 直接控制这个原生 App。这比 Android 模拟器路线更轻量，也不需要越狱或 APK。

## 关键点

- rednote.app 是 iOS 版小红书，在 Apple Silicon Mac 上原生运行
- 控制方式：AppleScript + pyobjc AXUIElement API（Accessibility API）
- **前提条件**：Boss 需在 系统设置 → 隐私与安全 → 辅助功能 → 给 Terminal.app 开权限
- 当前状态：**尚未实现**，Boss 离开后对话中断

## 下一步行动

- [ ] Boss 确认：在系统设置给 Terminal 开辅助功能权限
- [ ] 实现 xhs-mac-mcp（AppleScript + pyobjc AXUIElement）
- [ ] 支持操作：打开 App、搜索、发布内容、查看评论

## 为什么重要 / 关联

- 解决 Android 模拟器路线因 ABI 不兼容（小红书只有 armeabi-v7a，ARM64 模拟器无法安装）的根本问题
- 与 xhs-publisher / xhs-learning skill 联动，完善小红书自动化工具链
- 关联项目：xhs 发布体系、小红书收藏学习

## 原始输入

> Boss 手动打开 Mac 版 rednote.app 后发现可用，提出用 Accessibility API 控制的新想法，要求创建 xhs-mac-mcp。

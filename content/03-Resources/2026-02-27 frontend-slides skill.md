# frontend-slides — Claude Code / OpenClaw Skill

> 来源：GitHub zarazhangrui/frontend-slides（6.4k stars）
> 归档日期：2026-02-27
> 本地安装路径：~/.agents/skills/frontend-slides/

---

## 是什么

用 Claude 的前端能力生成**单文件 HTML 幻灯片**，零依赖，可交互，支持动画。
非设计师友好：不用描述审美偏好，先生成视觉预览，从中选择。

## 安装状态

✅ 已安装到 `~/.agents/skills/frontend-slides/`（SKILL.md + STYLE_PRESETS.md）
触发词：`做个PPT` / `做个幻灯片` / `/frontend-slides`

## 核心特性

- **零依赖**：单 HTML 文件，内联 CSS/JS，10 年后还能打开
- **视觉选风格**：生成 3 个风格预览让你选，不用描述「我想要那种感觉」
- **PPT 转 HTML**：上传 .pptx，保留所有图片和内容，转成 web 幻灯片
- **Anti-AI-Slop**：10 种预设风格都是精心设计的，避免紫色渐变白底那种通用 AI 审美

## 10 种预设风格

Neon Cyber / Midnight Executive / Deep Space / Terminal Green / Paper & Ink /
Swiss Modern / Soft Pastel / Warm Editorial / Brutalist / Gradient Wave

## 使用流程

**从零开始：**
1. 说「做个PPT，主题是 xxx」
2. 回答内容问题（几页、传达什么）
3. 说想要什么感觉（震撼/平静/专业）
4. 从 3 个风格预览里选一个
5. 生成完整 HTML，在浏览器打开

**PPT 转 HTML：**
1. 上传 .pptx 文件
2. 确认提取的内容
3. 选风格
4. 输出单 HTML 文件

## 输出特性

- 键盘导航（方向键/空格）
- 触摸/滑动支持
- 进度条 + 导航点
- 滚动触发动画
- 响应式设计

# XHS headless 浏览器交互规律

> 总结自 xhs-mcp 开发实践（2026-02-24）

## 核心规律：必须用坐标鼠标事件

在 XHS headless 浏览器环境下：

❌ **不能用**：
- `rod Element.Click()` — 会卡在 Interactable 检查，永远等待
- `element.Input()` — 依赖 element 引用，SPA 动态渲染后引用失效

✅ **必须用**：
- `page.Mouse.MoveTo(x, y) + page.Mouse.Click()` — 直接坐标点击，绕过 Interactable 检查
- `page.InsertText(content)` — 直接插入文本，不依赖 element 引用

## 坐标获取方式

```go
// JS 标记元素，获取坐标
coords, err := page.Eval(`() => {
    const btn = document.querySelector('.your-selector');
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    return { x: rect.left + rect.width/2, y: rect.top + rect.height/2 };
}`)
```

## SPA 预热注意事项

- XHS 是 SPA（Vue），页面加载后 DOM 内容可能为空（虚拟化）
- 必须先 `scrollIntoView` 后验证 `textContent` 是否有内容
- 等待特定元素出现后再操作（不要只等 URL 变化）

## 登录态管理

- cookies 保存在 `/tmp/cookies.json`（或配置路径）
- Server 重启后 browser 实例重新初始化，期间 `is_logged_in` 返回 false
- **区分两种失效**：
  - Transient（server 重启）：重启 server 5 秒后自愈
  - Permanent（cookies 过期）：需要重新扫码登录

## Tags

#xhs-mcp #headless浏览器 #rod #go #最佳实践

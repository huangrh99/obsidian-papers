# Google AntiGravity OAuth 问题

**日期**：2026-02-24  
**状态**：⚠️ OAuth token 已过期，待重新授权

---

## 背景

Boss 提到"接入 Google AntiGravity"模型。  
OpenClaw 配置中已存在 `google-antigravity` provider，但 token 已过期（expires in 0m）。

## 现象

- `openclaw models list` 显示 `google-antigravity` token 过期
- 关联插件：`@openclaw/google-gemini-cli-auth`（disabled 状态）
- provider id 为 `google-gemini-cli`，与 `google-antigravity` 对应关系待确认

## 恢复方法

```bash
openclaw models auth login --provider google-antigravity
```

会弹出浏览器用 `huangrunhui@connect.hku.hk` 登录授权。

或者先重装插件：
```bash
openclaw plugins install @openclaw/google-gemini-cli-auth
```

## 状态

⚠️ **搁置** — Boss 未完成 OAuth 流程，凌晨中断。  
下次 Boss 在线时提醒。

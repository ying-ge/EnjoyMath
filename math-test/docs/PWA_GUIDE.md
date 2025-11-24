# PWA 应用使用指南

## 📱 什么是 PWA？

PWA（Progressive Web App，渐进式 Web 应用）可以让您的网站像原生应用一样使用，包括：
- ✅ 添加到手机主屏幕
- ✅ 全屏体验（无浏览器地址栏）
- ✅ 离线访问
- ✅ 快速启动
- ✅ 推送通知（可选）

## 🚀 如何安装为 App

### iOS (iPhone/iPad)

1. 使用 **Safari 浏览器** 打开应用
2. 点击底部的 **分享按钮** (方框+箭头图标)
3. 向下滑动，选择 **"添加到主屏幕"**
4. 点击 **"添加"**
5. 现在可以从主屏幕像普通 App 一样打开！

### Android

1. 使用 **Chrome 浏览器** 打开应用
2. 点击浏览器菜单（右上角三个点）
3. 选择 **"添加到主屏幕"** 或 **"安装应用"**
4. 点击 **"添加"** 或 **"安装"**
5. 完成！应用会出现在主屏幕上

### 桌面 (Chrome/Edge)

1. 在地址栏右侧会显示 **安装图标** (+ 或 ⬇)
2. 点击安装图标
3. 在弹出的对话框中点击 **"安装"**
4. 应用会以独立窗口运行

## ✨ 功能特性

### 已实现的功能

- ✅ **离线访问**：Service Worker 缓存静态资源
- ✅ **全屏体验**：无浏览器地址栏
- ✅ **响应式设计**：完美适配手机、平板、电脑
- ✅ **触摸优化**：大按钮、流畅滚动
- ✅ **快速加载**：资源缓存，启动更快

### 注意事项

- ⚠️ API 请求需要网络连接（离线状态下无法提交答案）
- ⚠️ 首次访问需要网络来加载应用
- ⚠️ 建议在网络良好时使用以获得最佳体验

## 🔧 技术细节

### Service Worker

应用使用 Service Worker 实现：
- 静态资源缓存
- 离线访问支持
- 后台更新

### Manifest

`manifest.json` 定义了：
- 应用名称和图标
- 启动 URL
- 显示模式（standalone）
- 主题颜色

### 图标尺寸

应用包含多尺寸图标（72x72 到 512x512），适配不同设备和场景。

## 📝 开发说明

### 更新 Service Worker

如果修改了 Service Worker（`public/sw.js`），需要：
1. 更新版本号（CACHE_NAME）
2. 重新构建应用
3. 用户刷新页面后会获取新版本

### 测试 PWA 功能

#### Chrome DevTools
1. 打开 DevTools (F12)
2. 切换到 **Application** 标签
3. 查看 **Service Workers** 和 **Manifest**
4. 使用 **Lighthouse** 测试 PWA 评分

#### 移动端测试
1. 使用 Chrome Remote Debugging
2. 或直接在手机上测试安装流程

## 🐛 常见问题

### Q: 看不到"添加到主屏幕"选项？
A: 
- iOS：必须使用 Safari，不能使用 Chrome
- Android：确保使用最新版 Chrome
- 桌面：使用 Chrome 或 Edge

### Q: 安装后无法打开？
A: 检查网络连接，首次启动需要加载资源

### Q: 如何卸载？
A: 长按应用图标，选择"删除"或"卸载"

### Q: 更新后还是旧版本？
A: 清除浏览器缓存，或重新安装应用

## 📚 更多资源

- [PWA 文档](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://web.dev/add-manifest/)


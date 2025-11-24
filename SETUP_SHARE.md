# 📱 微信分享设置指南

## 快速设置步骤

### 1. 更新分享链接

打开 `index.html`，找到以下三处 `yourusername`，替换为你的 GitHub 用户名：

```html
<meta property="og:url" content="https://yourusername.github.io/EnjoyMath/">
<meta property="og:image" content="https://yourusername.github.io/EnjoyMath/share-image.png">
<meta property="twitter:url" content="https://yourusername.github.io/EnjoyMath/">
<meta property="twitter:image" content="https://yourusername.github.io/EnjoyMath/share-image.png">
<meta itemprop="image" content="https://yourusername.github.io/EnjoyMath/share-image.png">
```

**示例：** 如果你的 GitHub 用户名是 `zhangsan`，则替换为：
```html
<meta property="og:url" content="https://zhangsan.github.io/EnjoyMath/">
<meta property="og:image" content="https://zhangsan.github.io/EnjoyMath/share-image.png">
```

### 2. 生成分享预览图

1. 在浏览器中打开 `generate-share-image.html`
2. 点击"下载分享图"按钮
3. 将下载的图片重命名为 `share-image.png`
4. 将图片放在项目根目录（与 `index.html` 同级）

### 3. 部署到 GitHub

```bash
git add .
git commit -m "添加微信分享支持"
git push origin main
```

### 4. 启用 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 "GitHub Actions"（推荐）或 "Deploy from a branch"
3. 保存设置

### 5. 测试分享

1. 等待部署完成（约1-2分钟）
2. 访问你的网站：`https://yourusername.github.io/EnjoyMath/`
3. 在微信中打开链接
4. 点击右上角分享按钮
5. 选择"分享到朋友圈"或"发送给朋友"

## 🎨 分享预览图说明

- **尺寸**：1200x630 像素（微信推荐尺寸）
- **格式**：PNG 或 JPG
- **内容**：包含项目标题、描述和特色
- **位置**：项目根目录，文件名 `share-image.png`

## 🔧 微信分享调试

如果分享后显示不正确：

1. **使用微信调试工具**
   - 访问：https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Share/WeChat_Share.html
   - 输入你的网站 URL
   - 点击"检查"查看分享预览

2. **清除微信缓存**
   - 微信会缓存分享信息，更新后可能需要等待
   - 使用调试工具可以强制刷新

3. **检查图片 URL**
   - 确认 `share-image.png` 可以正常访问
   - 在浏览器中直接访问图片 URL 测试

## 📝 注意事项

- 分享图必须使用 HTTPS 访问
- 图片大小建议不超过 300KB
- 首次分享可能需要等待几分钟才能看到更新
- 微信会缓存分享信息，更新后可能需要使用调试工具清除缓存

## ✅ 完成检查清单

- [ ] 已替换 `index.html` 中的 `yourusername`
- [ ] 已生成并上传 `share-image.png`
- [ ] 已推送到 GitHub
- [ ] 已启用 GitHub Pages
- [ ] 已测试分享功能
- [ ] 分享预览显示正确

完成以上步骤后，你的网站就可以在微信中完美分享了！🎉

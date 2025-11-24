# 🚀 GitHub Pages 部署指南

## 快速部署

### 方法一：使用 GitHub Actions（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "准备部署到 GitHub Pages"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

3. **等待部署完成**
   - 在 Actions 标签页查看部署进度
   - 部署完成后，访问 `https://yourusername.github.io/EnjoyMath/`

### 方法二：手动部署

1. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 `main` 或 `master`
   - Folder 选择 `/ (root)`
   - 保存设置

2. **访问网站**
   - 部署完成后，访问 `https://yourusername.github.io/EnjoyMath/`

## 📱 微信分享配置

### 1. 更新分享链接

在 `index.html` 中，找到以下 meta 标签，将 `yourusername` 替换为你的 GitHub 用户名：

```html
<meta property="og:url" content="https://yourusername.github.io/EnjoyMath/">
<meta property="og:image" content="https://yourusername.github.io/EnjoyMath/share-image.png">
```

### 2. 创建分享预览图

分享预览图建议尺寸：**1200x630 像素**

你可以：
1. 使用在线工具创建（如 Canva、Figma）
2. 使用提供的 `generate-share-image.html` 生成
3. 使用设计软件手动创建

**分享图内容建议：**
- 标题：EnjoyMath - 探索数学，发现更好的自己
- 副标题：专为初中生设计的数学学习工具
- 特色：自适应测试、交互式题库
- 配色：灰色科技风格

### 3. 上传分享图

将生成的 `share-image.png` 文件放在项目根目录，然后提交：

```bash
git add share-image.png
git commit -m "添加微信分享预览图"
git push origin main
```

## 🔧 自定义域名（可选）

如果你想使用自定义域名：

1. 在项目根目录创建 `CNAME` 文件
2. 写入你的域名，例如：`math.yourdomain.com`
3. 在域名 DNS 设置中添加 CNAME 记录指向 `yourusername.github.io`

## 📝 注意事项

1. **路径问题**：确保所有相对路径正确
2. **HTTPS**：GitHub Pages 自动提供 HTTPS
3. **缓存**：更新后可能需要等待几分钟才能看到变化
4. **微信缓存**：微信会缓存分享预览，更新后可能需要等待或使用微信调试工具清除缓存

## 🐛 常见问题

### 问题：分享到微信时显示不正确

**解决方案：**
1. 检查 meta 标签是否正确
2. 确认分享图 URL 可访问
3. 使用[微信调试工具](https://developers.weixin.qq.com/doc/oplatform/en/api/share/share-config.html)清除缓存

### 问题：页面样式错乱

**解决方案：**
1. 检查 CSS 文件路径是否正确
2. 确认所有资源文件都已提交到 GitHub
3. 检查浏览器控制台是否有错误

### 问题：自适应测试无法使用

**解决方案：**
1. 确认 `adaptive-test/` 目录已完整上传
2. 检查 `questions.js` 文件是否存在
3. 确认所有 JavaScript 文件路径正确

## 📚 相关文档

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [微信分享开发文档](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Share/WeChat_Share.html)


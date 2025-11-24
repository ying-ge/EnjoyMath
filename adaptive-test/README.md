# 纯前端自适应数学水平测试系统

完全基于前端实现的自适应测试系统，可以部署到 GitHub Pages，无需服务器和数据库。

## 🎯 特点

- ✅ **完全静态**：纯 HTML + CSS + JavaScript
- ✅ **无需服务器**：可直接部署到 GitHub Pages
- ✅ **离线可用**：可以离线使用
- ✅ **自适应算法**：基于 IRT 2PL 模型
- ✅ **智能测试**：只需 15-20 道题目即可评估能力

## 📁 文件结构

```
adaptive-test/
├── index.html          # 测试入口页
├── test.html           # 答题页面
├── result.html         # 结果页面
├── css/
│   └── style.css       # 统一样式
└── js/
    ├── adaptive.js     # IRT算法实现
    ├── storage.js      # localStorage管理
    ├── test-engine.js  # 测试引擎
    └── questions.js    # 题库数据（103道题目）
```

## 🚀 使用方法

### 本地使用

直接在浏览器中打开 `index.html` 即可开始测试。

### 部署到 GitHub Pages

1. 将整个 `adaptive-test/` 文件夹推送到 GitHub 仓库
2. 在 GitHub 仓库设置中启用 Pages
3. 访问 `https://username.github.io/repo-name/adaptive-test/`

## 🔧 技术实现

### IRT 算法

- **模型**：2PL (Two-Parameter Logistic)
- **公式**：`P(θ) = 1 / (1 + e^(-a(θ-b)))`
- **能力估计**：最大似然估计（MLE）
- **题目选择**：Fisher 信息量最大化

### 数据存储

- 使用 `localStorage` 保存测试会话
- 支持断点续测
- 保存历史测试记录

## 📊 功能

1. **自适应测试**
   - 根据答题表现动态调整难度
   - 智能选择最能评估能力的题目

2. **能力评估**
   - 实时计算能力值
   - 显示能力等级（优秀/良好/中等/一般/需要加强）

3. **知识点分析**
   - 分析各知识点掌握度
   - 识别薄弱知识点

4. **学期表现**
   - 按学期统计答题情况
   - 了解各学期掌握情况

## 🎨 设计风格

- 素气清爽的灰色风格
- 与主页面和题库风格统一
- 响应式设计，支持移动端

## 📝 注意事项

1. **浏览器兼容性**：需要支持 ES6+ 的现代浏览器
2. **localStorage 限制**：通常有 5-10MB 大小限制
3. **数学公式**：使用 KaTeX CDN 渲染，需要网络连接

## 🔄 与后端版本的区别

| 特性 | 后端版本 | 纯前端版本 |
|------|---------|-----------|
| 部署 | 需要服务器 | GitHub Pages |
| 数据库 | SQLite | localStorage |
| 算法 | Python | JavaScript |
| 离线使用 | ❌ | ✅ |
| 部署难度 | 中等 | 简单 |

---

**完全静态，可直接部署到 GitHub Pages！** 🚀


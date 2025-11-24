# 快速启动指南

## 第一步：启动后端服务

### 在终端窗口1中运行：

```bash
cd /Users/mypro/Downloads/EnjoyMath
./start_backend.sh
```

或者手动运行：

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows用户: venv\Scripts\activate
pip install -r ../requirements.txt
python app.py
```

看到以下信息表示后端启动成功：
```
==================================================
数学水平测试系统 - 后端服务
==================================================
服务地址: http://0.0.0.0:5000
API文档: http://0.0.0.0:5000/api/health
==================================================
 * Running on http://0.0.0.0:5000
```

## 第二步：启动前端服务

### 在新的终端窗口2中运行：

```bash
cd /Users/mypro/Downloads/EnjoyMath
./start_frontend.sh
```

或者手动运行：

```bash
cd frontend
npm install  # 首次运行需要
npm run dev
```

看到以下信息表示前端启动成功：
```
  VITE v5.0.8  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## 第三步：访问应用

在浏览器中打开：**http://localhost:3000**

## 使用流程

1. **首页**：输入学生ID（可选），点击"开始测试"
2. **答题**：认真作答每道题目，系统会自动调整难度
3. **查看解析**：提交答案后查看解析，点击"下一题"继续
4. **查看结果**：完成15-20题后自动跳转到结果页面
5. **学习建议**：查看能力评估和个性化学习建议

## 故障排查

### 后端无法启动

- 检查Python版本：`python3 --version`（需要3.8+）
- 检查端口5000是否被占用
- 检查依赖是否安装：`pip list`

### 前端无法启动

- 检查Node.js版本：`node --version`（需要16+）
- 删除node_modules重新安装：`rm -rf node_modules && npm install`
- 检查端口3000是否被占用

### 数据库错误

- 删除旧数据库文件：`rm backend/math_test.db`
- 重新初始化：`python backend/app.py --init-db`

## 常见问题

**Q: 测试中途可以暂停吗？**
A: 可以，关闭浏览器后重新访问，输入相同的session_id可以继续测试。

**Q: 可以添加更多题目吗？**
A: 可以，编辑 `backend/init_questions.py` 文件添加新题目。

**Q: 如何修改测试题目数量？**
A: 编辑 `backend/adaptive.py` 中的 `max_questions` 参数。


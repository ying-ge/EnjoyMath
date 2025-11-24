# 📦 安装指南 - 新电脑部署

## 🎯 快速安装

### 方式一：自动安装脚本（推荐）

#### macOS / Linux
```bash
chmod +x install.sh
./install.sh
```

#### Windows
双击运行 `install.bat`

---

### 方式二：手动安装

## 📋 必需软件

### 1. Python 3.8+ 
**检查是否已安装**：
```bash
python3 --version
```

**未安装？**
- macOS: `brew install python3` 或从 [python.org](https://www.python.org/downloads/) 下载
- Windows: 从 [python.org](https://www.python.org/downloads/) 下载安装包
- Linux: `sudo apt install python3 python3-pip`

### 2. Node.js 16+
**检查是否已安装**：
```bash
node --version
npm --version
```

**未安装？**
- 从 [nodejs.org](https://nodejs.org/) 下载安装包
- macOS: `brew install node`

---

## 🚀 安装步骤

### 步骤 1：获取项目
- 从 GitHub 克隆，或
- 直接复制项目文件夹到新电脑

### 步骤 2：安装后端依赖
```bash
pip3 install -r requirements.txt
```

### 步骤 3：安装前端依赖
```bash
cd frontend
npm install
cd ..
```

### 步骤 4：初始化数据库
```bash
cd backend
python3 app.py --init-db
cd ..
```

### 步骤 5：启动服务

**终端 1 - 后端**：
```bash
cd backend
python3 app.py
```

**终端 2 - 前端**：
```bash
cd frontend
npm run dev
```

### 步骤 6：访问系统
打开浏览器：http://localhost:3000

---

## ✅ 安装验证

运行以下命令验证安装：

```bash
# 检查 Python 依赖
python3 -c "import flask, numpy, scipy; print('✅ Python 依赖正常')"

# 检查 Node.js 依赖
cd frontend && npm list react && cd ..
```

---

## 📚 详细说明

查看 `新电脑安装指南.md` 获取：
- 详细安装步骤
- 常见问题解决
- 故障排除方法

---

## 🔧 快速故障排除

| 问题 | 解决方法 |
|------|---------|
| Python 命令不存在 | 使用 `python3` 代替 `python` |
| pip 命令不存在 | `python3 -m ensurepip --upgrade` |
| npm 安装慢 | 使用国内镜像：`npm config set registry https://registry.npmmirror.com` |
| 端口被占用 | 修改端口配置（见详细指南） |

---

安装完成后即可开始使用！🎉


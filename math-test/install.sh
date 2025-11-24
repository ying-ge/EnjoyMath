#!/bin/bash
# 数学水平测试系统 - 自动安装脚本 (macOS/Linux)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 数学水平测试系统 - 自动安装"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查 Python
echo "📦 检查 Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到 Python3"
    echo "   请先安装 Python 3.8+："
    echo "   macOS: brew install python3"
    echo "   Linux: sudo apt install python3 python3-pip"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "✅ Python 版本: $(python3 --version)"

# 检查 Node.js
echo ""
echo "📦 检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js"
    echo "   请先安装 Node.js 16+："
    echo "   访问 https://nodejs.org/ 下载安装"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js 版本: $NODE_VERSION"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm"
    exit 1
fi
echo "✅ npm 版本: $(npm --version)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  开始安装依赖..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 安装后端依赖
echo "📥 安装后端依赖（Python）..."
if pip3 install -r requirements.txt --quiet; then
    echo "✅ 后端依赖安装成功"
else
    echo "⚠️  后端依赖安装可能有问题，请检查错误信息"
fi

# 安装前端依赖
echo ""
echo "📥 安装前端依赖（Node.js）..."
cd frontend
if npm install --silent; then
    echo "✅ 前端依赖安装成功"
else
    echo "⚠️  前端依赖安装可能有问题，请检查错误信息"
fi
cd ..

# 初始化数据库
echo ""
echo "📊 初始化数据库..."
cd backend
if python3 app.py --init-db 2>/dev/null; then
    echo "✅ 数据库初始化成功"
else
    echo "⚠️  数据库可能已存在或初始化失败，继续..."
fi
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ 安装完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 启动服务："
echo ""
echo "  1. 启动后端服务（新终端窗口）："
echo "     cd backend"
echo "     python3 app.py"
echo ""
echo "  2. 启动前端服务（另一个终端窗口）："
echo "     cd frontend"
echo "     npm run dev"
echo ""
echo "  3. 在浏览器中访问："
echo "     http://localhost:3000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"


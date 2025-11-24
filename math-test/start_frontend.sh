#!/bin/bash
# 前端启动脚本

cd frontend

# 检查node_modules
if [ ! -d "node_modules" ]; then
    echo "安装依赖..."
    npm install
fi

# 启动开发服务器
echo "启动前端开发服务器..."
npm run dev


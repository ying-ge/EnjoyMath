#!/bin/bash
# 后端启动脚本

cd backend

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
echo "安装依赖..."
pip install -r ../requirements.txt

# 初始化数据库
echo "初始化数据库..."
python app.py --init-db || true

# 启动服务器
echo "启动后端服务器..."
python app.py


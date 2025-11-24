@echo off
REM 数学水平测试系统 - 自动安装脚本 (Windows)

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   🚀 数学水平测试系统 - 自动安装
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM 检查 Python
echo 📦 检查 Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到 Python
    echo    请先安装 Python 3.8+：访问 https://www.python.org/downloads/
    pause
    exit /b 1
)
python --version
echo ✅ Python 已安装

REM 检查 Node.js
echo.
echo 📦 检查 Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到 Node.js
    echo    请先安装 Node.js 16+：访问 https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo ✅ Node.js 已安装

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   开始安装依赖...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM 安装后端依赖
echo 📥 安装后端依赖（Python）...
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo ⚠️  后端依赖安装可能有问题，请检查错误信息
) else (
    echo ✅ 后端依赖安装成功
)

REM 安装前端依赖
echo.
echo 📥 安装前端依赖（Node.js）...
cd frontend
call npm install --silent
if errorlevel 1 (
    echo ⚠️  前端依赖安装可能有问题，请检查错误信息
) else (
    echo ✅ 前端依赖安装成功
)
cd ..

REM 初始化数据库
echo.
echo 📊 初始化数据库...
cd backend
python app.py --init-db 2>nul
if errorlevel 1 (
    echo ⚠️  数据库可能已存在或初始化失败，继续...
) else (
    echo ✅ 数据库初始化成功
)
cd ..

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   ✅ 安装完成！
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📝 启动服务：
echo.
echo   1. 启动后端服务（新命令行窗口）：
echo      cd backend
echo      python app.py
echo.
echo   2. 启动前端服务（另一个命令行窗口）：
echo      cd frontend
echo      npm run dev
echo.
echo   3. 在浏览器中访问：
echo      http://localhost:3000
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pause


#!/usr/bin/env python3
"""
生成 PWA 应用图标
需要安装 Pillow: pip install Pillow
"""
from PIL import Image, ImageDraw, ImageFont
import os

def generate_icon(size, output_path):
    """生成指定尺寸的图标"""
    # 创建新图像
    img = Image.new('RGB', (size, size), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # 绘制渐变背景（简化版：使用单色）
    # 实际可以使用渐变，这里简化
    draw.rectangle([0, 0, size, size], fill='#667eea')
    
    # 绘制数学符号 √
    try:
        # 尝试使用系统字体
        font_size = int(size * 0.6)
        font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', font_size)
    except:
        try:
            font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', font_size)
        except:
            # 使用默认字体
            font = ImageFont.load_default()
    
    # 计算文字位置（居中）
    text = '√'
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2 - bbox[0]
    y = (size - text_height) // 2 - bbox[1]
    
    # 绘制白色文字
    draw.text((x, y), text, fill='white', font=font)
    
    # 保存图像
    img.save(output_path, 'PNG')
    print(f'生成图标: {output_path} ({size}x{size})')

def main():
    # 图标尺寸列表
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    # 输出目录
    output_dir = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public')
    os.makedirs(output_dir, exist_ok=True)
    
    # 生成所有尺寸的图标
    for size in sizes:
        output_path = os.path.join(output_dir, f'icon-{size}.png')
        generate_icon(size, output_path)
    
    print('\n所有图标生成完成！')
    print(f'图标保存在: {output_dir}')

if __name__ == '__main__':
    try:
        main()
    except ImportError:
        print('错误: 需要安装 Pillow 库')
        print('请运行: pip install Pillow')
    except Exception as e:
        print(f'生成图标时出错: {e}')


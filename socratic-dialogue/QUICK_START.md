# 🚀 苏格拉底 AI 辅助提问系统 - 快速开始

## 概览

这是一个智能化的数学学习助手系统，使用先进的 AI 技术实现苏格拉底式提问，自动生成启发性问题来引导学生思考。

## ✨ 核心特性

| 功能 | 说明 |
|------|------|
| 🤖 AI 问题生成 | 根据学生回答自动生成启发性问题 |
| 📊 实时分析 | 分析学生的理解程度和常见误区 |
| 🎯 自适应难度 | 根据学生表现自动调整问题难度 |
| 📈 学习追踪 | 记录和分析学生的学习进度 |
| 🔄 智能复习 | 基于遗忘曲线的个性化复习计划 |
| 💡 推荐系统 | 推荐下一步学习的最佳主题 |

## 🎯 5分钟快速开始

### 1️⃣ 选择 AI 服务

访问 `socratic-dialogue/index.html`，选择您偏好的 API：

```
推荐: OpenAI GPT-4
    - 最强的推理能力
    - API Key: sk-... (https://platform.openai.com)

或者: Claude (Anthropic)
    - 平衡的能力
    - API Key: sk-ant-... (https://console.anthropic.com)

或者: 智谱 GLM-4.6 (国内)
    - 优化的中文支持
    - API Key: (https://open.bigmodel.cn)
```

### 2️⃣ 配置 API

```
API 提供商: [选择上面的一个]
API Key: [粘贴您的密钥]
年级: 7/8/9年级
主题: [可选，如"代数"]
```

### 3️⃣ 点击"开始对话"

开始与 AI 助手的对话！

## 📖 使用示例

### 示例1: 学生提出问题

```
学生: "1/2 + 1/3 等于几？"

AI 回复: "很好的问题！让我们一起思考...
你还记得如何通分两个分数吗？
最小公倍数是什么？"

AI 生成问题:
- 1/2 和 1/3 的分母是什么？
- 什么是最小公倍数？你怎么找到它的？
- 通分后分子应该怎么加？
```

### 示例2: 学生分享解题思路

```
学生: "我觉得 2x + 3 = 7，x = 2"

AI 分析:
- ✓ 正确！
- 💭 建议：你能验证一下吗？把 x=2 代回原式。
- 📍 接下来：尝试解这个: 3x - 5 = 10
```

### 示例3: 识别误区

```
学生: "(-2)² = -4"

AI 识别:
- ❌ 常见误区：符号和指数运算混淆
- 💡 启发问题：(-2)² 表示什么？是 -2 的平方，还是 2 的平方的相反数？
- 🎯 建议：比较 -2² 和 (-2)² 的区别
```

## 🧠 苏格拉底提问的6种类型

系统会自动生成以下类型的问题：

```
1. 澄清 (Clarification)
   "你能用自己的话解释这个概念吗？"

2. 假设探究 (Probing)
   "你为什么认为这是对的？"

3. 证据 (Evidence)
   "能举个具体的例子吗？"

4. 方法 (Alternative)
   "有没有其他解法？"

5. 推论 (Consequence)
   "如果改变条件会怎样？"

6. 反思 (Metacognition)
   "你是怎么解决的？下次怎么做更好？"
```

## 📊 学生档案

系统自动建立和更新学生档案：

```javascript
// 自动记录的信息
{
    学习进度: "初级 → 中级 → 高级",
    掌握的概念: ["有理数", "方程"],
    困难的概念: ["不等式"],
    学习风格: "可视化/分析型/协作型",
    学习速度: "快/中等/慢",
    常见误区: ["符号混淆", ...],
    推荐复习: ["有理数运算", ...]
}
```

## 🔧 API 配置详解

### OpenAI（推荐）

```
URL: https://api.openai.com/v1/chat/completions
Model: gpt-4 或 gpt-3.5-turbo
Price: $0.03-0.06 per 1K tokens
```

获取 API Key:
1. 访问 https://platform.openai.com/api-keys
2. 创建新 key
3. 复制并粘贴

### Claude (Anthropic)

```
URL: https://api.anthropic.com/v1/messages
Model: claude-3-opus-20240229
Price: $3-15 per 1M input/output tokens
```

获取 API Key:
1. 访问 https://console.anthropic.com
2. 创建新 API key
3. 复制并粘贴

### 智谱 GLM-4.6（推荐中文用户）

```
URL: https://open.bigmodel.cn/api/paas/v4/chat/completions
Model: glm-4.6-vision
Price: ¥0.1/1000个input tokens
```

获取 API Key:
1. 访问 https://open.bigmodel.cn
2. 创建项目和 API key
3. 复制并粘贴

## 💰 成本估算

### 单个学生一个月的成本

```
学习时间: 30分钟/天 × 30天 = 15小时
平均问答数: 20个/小时 = 300个交互

OpenAI (GPT-3.5):
- 每个交互 ~1000 tokens
- 成本: 300 × 1000 / 1K × $0.002 = 0.6 USD

Claude:
- 每个交互 ~1500 tokens  
- 成本: 300 × 1500 / 1M × $3 = 1.35 USD

智谱 GLM:
- 每个交互 ~1000 tokens
- 成本: 300 × 1000 / 1000 × ¥0.1 = ¥30 (~$4.5)
```

## 🎓 教师和家长指南

### 如何有效使用

1. **定期检查报告** - 了解学生的学习进度
2. **设定学习目标** - 利用推荐系统规划学习路径
3. **鼓励反思** - 促进学生思考而非记忆
4. **监控困难概念** - 及时给予额外支持

### 常见问题

**Q: AI 会做学生的作业吗？**
A: 不会。系统只提供启发性问题，不给出答案。

**Q: 如何确保数据安全？**
A: 所有配置保存在本地浏览器，可随时清除。

**Q: 离线可以使用吗？**
A: 不能。需要连接到 AI API 服务。

**Q: 支持多种语言吗？**
A: 目前支持中文和英文。

## 🚀 高级用法

### 使用高级特性

```javascript
// 示例：完整的教学助手
const assistant = new ComprehensiveTeachingAssistant({
    apiProvider: 'openai',
    apiKey: 'sk-...',
    gradeLevel: '7'
});

// 初始化
await assistant.initialize();

// 开始学习会话
const session = await assistant.startLearningSession(
    { name: '小明', gradeLevel: '7' },
    '方程'
);

// 处理学生消息
const response = await assistant.handleStudentMessage('2x + 3 = 7');
console.log(response.questions); // AI 生成的问题
console.log(response.analysis);  // 学生回答的分析

// 评估学生回答
assistant.recordAnswerEvaluation(true, '正确！');

// 获取个性化建议
const recommendations = await assistant.getPersonalizedRecommendations();

// 结束会话
const report = await assistant.endLearningSession();
console.log(report); // 学习报告
```

### 自定义提问策略

```javascript
const assistant = new AIAssistant();

// 自定义提示词
assistant.questionGenerationPrompt = `
你的自定义提示...
`;

// 生成问题时使用
const questions = await assistant.generateSocraticQuestions('用户消息');
```

### 集成到现有系统

```html
<!-- 在你的 HTML 中 -->
<script src="js/ai-assistant.js"></script>
<script src="js/advanced-features.js"></script>

<script>
// 初始化
window.teachingAssistant = new ComprehensiveTeachingAssistant({
    apiProvider: 'openai',
    apiKey: localStorage.getItem('apiKey'),
    gradeLevel: localStorage.getItem('gradeLevel')
});

// 使用
teachingAssistant.initialize().then(() => {
    console.log('教学助手已准备');
});
</script>
```

## 📚 文件结构

```
socratic-dialogue/
├── index.html                    # 主界面
├── js/
│   ├── ai-assistant.js          # AI 助手核心
│   ├── advanced-features.js      # 高级功能（新增）
│   ├── api-client.js            # API 客户端
│   ├── socratic-engine.js        # 苏格拉底引擎
│   ├── ui-controller.js          # UI 控制器
│   ├── storage.js               # 本地存储
│   └── main.js                  # 主控制器
├── AI_ASSISTANT_GUIDE.md         # 完整指南（新增）
└── QUICK_START.md               # 本文件
```

## 🆘 故障排除

### API 连接失败

```
检查清单:
☐ API Key 是否正确复制
☐ 网络连接是否正常
☐ API 服务是否在线
☐ 尝试刷新页面
☐ 清除浏览器缓存
```

### 问题质量不高

```
可能原因:
- 学生表述不够清晰 → 引导学生更详细地描述
- 上下文不足 → 提供更多背景信息
- 模型选择不当 → 尝试更强的模型（如 GPT-4）
```

### 显示"API 配置失败"

```
解决方案:
1. 验证 API Key 格式
2. 确认选择了正确的提供商
3. 检查网络连接
4. 尝试测试连接按钮
```

## 📞 获取帮助

- 📖 完整指南: 查看 `AI_ASSISTANT_GUIDE.md`
- 💬 讨论: 提交 Issue
- 🐛 报告问题: 提供错误截图和日志

## 📈 后续计划

- [ ] 离线模式
- [ ] 多语言支持
- [ ] 移动应用
- [ ] 教师仪表板
- [ ] 班级协作
- [ ] 视频支持
- [ ] 更多可视化工具

## 许可

MIT License - 自由使用和修改

---

**现在就开始吧！** 🎉

访问 `socratic-dialogue/index.html` 开始您的 AI 助手之旅。

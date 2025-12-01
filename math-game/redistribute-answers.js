// 重新分配正确答案的脚本
const fs = require('fs');

// 读取当前的questions.js文件
const filePath = './js/questions.js';
const content = fs.readFileSync(filePath, 'utf8');

// 找到所有包含 "correct: 0," 的行，并随机重新分配
const lines = content.split('\n');
const correctOptionCount = [0, 0, 0, 0]; // A, B, C, D的计数

let modifiedCount = 0;
const maxModifications = 20; // 最多修改20个题目

for (let i = 0; i < lines.length && modifiedCount < maxModifications; i++) {
    const line = lines[i];

    // 查找correct: 0的题目
    if (line.includes('correct: 0,')) {
        // 找到当前使用最少的选项
        const minCount = Math.min(...correctOptionCount);
        const minIndices = correctOptionCount
            .map((count, index) => count === minCount ? index : -1)
            .filter(index => index !== -1);

        if (minIndices.length > 0) {
            // 随机选择一个使用次数最少的选项
            const randomIndex = minIndices[Math.floor(Math.random() * minIndices.length)];
            const newCorrectValue = randomIndex;

            // 替换这一行
            lines[i] = line.replace('correct: 0,', `correct: ${newCorrectValue},`);

            // 更新计数
            correctOptionCount[randomIndex]++;
            modifiedCount++;
            console.log(`修改题目ID ${i+1}: 选项A -> 选项${['B', 'C', 'D'][randomIndex-1]}`);
        }
    }
}

// 写回文件
const modifiedContent = lines.join('\n');
fs.writeFileSync(filePath, modifiedContent, 'utf8');

console.log(`完成！共修改了 ${modifiedCount} 道题目的正确答案分布`);
console.log('A, B, C, D的分布:', correctOptionCount);
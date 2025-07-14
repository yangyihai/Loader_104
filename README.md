# 骰子投掷游戏

一个精美的网页版骰子投掷游戏，具有3D动画效果和用户管理功能。

## 功能特点

- 🎲 **3D骰子动画**：真实的3D骰子投掷动画效果
- 👤 **用户注册**：用户需要输入真实姓名才能开始游戏
- 🔒 **单次限制**：每个用户（基于姓名和IP）只能投掷一次骰子
- 📊 **投掷记录**：右侧面板显示所有用户的投掷记录
- 🎯 **IP追踪**：自动获取用户IP地址，防止重复投掷
- 📱 **响应式设计**：适配各种屏幕尺寸

## 使用方法

1. 直接在浏览器中打开 `index.html` 文件
2. 输入您的真实姓名
3. 点击"投掷骰子"按钮
4. 观看3D动画并查看结果
5. 右侧面板会显示您和其他用户的投掷记录

## 技术特性

- **纯前端实现**：使用HTML、CSS、JavaScript，无需服务器
- **本地存储**：使用localStorage保存投掷记录
- **IP获取**：支持多种IP获取服务，有备用方案
- **动画效果**：CSS3 3D变换和关键帧动画
- **用户体验**：流畅的交互和视觉反馈

## 文件结构

```
Loder_骰子/
├── index.html      # 主页面文件
├── style.css       # 样式文件
├── script.js       # JavaScript逻辑
└── README.md       # 说明文档
```

## 开发者调试

在浏览器控制台中可以使用以下命令：

```javascript
// 清除所有投掷记录
window.diceGame.clearAllRecords();

// 查看当前用户IP
console.log(window.diceGame.userIP);

// 查看所有记录
console.log(window.diceGame.gameRecords);
```

## 注意事项

- 投掷记录保存在浏览器本地存储中
- 清除浏览器数据会丢失所有记录
- 不同浏览器的记录是独立的
- IP获取可能因网络环境而失败，程序会使用备用方案

## 📡 部署到网上（让朋友访问）

### 方案一：GitHub Pages（推荐，免费）

1. **创建GitHub账户**（如果没有的话）
   - 访问 [github.com](https://github.com) 注册账户

2. **创建仓库**
   - 点击右上角的"+"号，选择"New repository"
   - 仓库名称可以是：`dice-game` 或任何你喜欢的名字
   - 设置为 Public（公开）
   - 勾选 "Add a README file"

3. **上传文件**
   - 在仓库页面点击 "Upload files"
   - 将以下文件拖拽上传：
     * `index.html`
     * `style.css`
     * `script.js`
   - 填写提交信息，点击 "Commit changes"

4. **启用GitHub Pages**
   - 在仓库页面点击 "Settings"
   - 滚动到 "Pages" 部分
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main"
   - 点击 "Save"

5. **获取链接**
   - 几分钟后，你的游戏将可通过以下链接访问：
   - `https://你的用户名.github.io/dice-game/`

### 方案二：Netlify（简单拖拽部署）

1. 访问 [netlify.com](https://www.netlify.com)
2. 注册/登录账户
3. 将整个 `Loder_骰子` 文件夹拖拽到部署区域
4. 获得类似 `https://随机名称.netlify.app` 的链接

### 方案三：Vercel（快速部署）

1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账户登录
3. 导入你的GitHub仓库
4. 自动部署，获得链接

## 🔧 快速部署命令

如果你熟悉Git，可以使用以下命令：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始骰子游戏"

# 连接到GitHub仓库（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/dice-game.git

# 推送到GitHub
git push -u origin main
```

## 🎯 分享给朋友

部署完成后，你就可以把链接分享给朋友了！他们可以：
- 直接通过浏览器访问
- 在手机上也能正常使用
- 每个人的投掷记录会保存在各自的浏览器中
- 支持同时多人使用（每个人有独立的IP限制）

## 版本信息

- 版本：1.0.0
- 开发者：花花的无聊工具
- 最后更新：2024年

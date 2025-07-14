class DiceGame {
    constructor() {
        this.currentUser = null;
        this.userIP = null;
        this.gameRecords = this.loadRecords();
        this.hasRolled = false;
        
        this.initializeElements();
        this.bindEvents();
        this.getUserIP();
        this.displayRecords();
    }

    initializeElements() {
        // 模态框元素
        this.loginModal = document.getElementById('loginModal');
        this.alreadyRolledModal = document.getElementById('alreadyRolledModal');
        this.nameInput = document.getElementById('nameInput');
        this.startGameBtn = document.getElementById('startGame');
        this.loginError = document.getElementById('loginError');
        this.viewRecordsBtn = document.getElementById('viewRecords');
        this.previousResult = document.getElementById('previousResult');

        // 游戏界面元素
        this.gameArea = document.getElementById('gameArea');
        this.currentUserSpan = document.getElementById('currentUser');
        this.gameStatus = document.getElementById('gameStatus');
        this.dice = document.getElementById('dice');
        this.rollButton = document.getElementById('rollButton');
        this.result = document.getElementById('result');
        this.diceResult = document.getElementById('diceResult');
        this.recordsList = document.getElementById('recordsList');
    }

    bindEvents() {
        // 登录相关事件
        this.startGameBtn.addEventListener('click', () => this.handleLogin());
        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });

        // 游戏相关事件
        this.rollButton.addEventListener('click', () => this.rollDice());
        this.viewRecordsBtn.addEventListener('click', () => this.showRecords());
    }

    async getUserIP() {
        try {
            // 使用多个IP获取服务，提高成功率
            const ipSources = [
                'https://api.ipify.org?format=json',
                'https://httpbin.org/ip',
                'https://api.myip.com'
            ];
            
            for (let source of ipSources) {
                try {
                    const response = await fetch(source);
                    const data = await response.json();
                    this.userIP = data.ip || data.origin || data.ip;
                    if (this.userIP) break;
                } catch (e) {
                    continue;
                }
            }
            
            // 如果所有服务都失败，生成一个基于浏览器信息的伪IP
            if (!this.userIP) {
                this.userIP = this.generateFallbackIP();
            }
        } catch (error) {
            console.warn('无法获取真实IP，使用备用方案');
            this.userIP = this.generateFallbackIP();
        }
    }

    generateFallbackIP() {
        // 基于浏览器指纹生成一个伪唯一标识
        const navigator_info = navigator.userAgent + navigator.language + screen.width + screen.height;
        let hash = 0;
        for (let i = 0; i < navigator_info.length; i++) {
            const char = navigator_info.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        // 转换为类似IP的格式
        const num = Math.abs(hash);
        const a = (num % 254) + 1;
        const b = ((num >> 8) % 254) + 1;
        const c = ((num >> 16) % 254) + 1;
        const d = ((num >> 24) % 254) + 1;
        
        return `${a}.${b}.${c}.${d}`;
    }

    handleLogin() {
        const name = this.nameInput.value.trim();
        
        if (!name) {
            this.showLoginError('请输入您的真实姓名');
            return;
        }
        
        if (name.length < 2) {
            this.showLoginError('姓名至少需要2个字符');
            return;
        }

        // 检查用户是否已经投掷过
        const existingRecord = this.checkExistingUser(name, this.userIP);
        if (existingRecord) {
            this.showAlreadyRolledModal(existingRecord);
            return;
        }

        // 设置当前用户并开始游戏
        this.currentUser = name;
        this.startGame();
    }

    checkExistingUser(name, ip) {
        // 检查是否存在相同姓名或相同IP的记录
        return this.gameRecords.find(record => 
            record.name === name || record.ip === ip
        );
    }

    showLoginError(message) {
        this.loginError.textContent = message;
        this.loginError.style.display = 'block';
        setTimeout(() => {
            this.loginError.style.display = 'none';
        }, 3000);
    }

    showAlreadyRolledModal(record) {
        this.previousResult.textContent = record.result;
        this.loginModal.classList.add('hidden');
        this.alreadyRolledModal.classList.remove('hidden');
    }

    showRecords() {
        this.alreadyRolledModal.classList.add('hidden');
        this.gameArea.classList.remove('hidden');
        this.displayRecords();
    }

    startGame() {
        this.currentUserSpan.textContent = this.currentUser;
        this.loginModal.classList.add('hidden');
        this.gameArea.classList.remove('hidden');
        this.displayRecords();
    }

    rollDice() {
        if (this.hasRolled) return;

        this.hasRolled = true;
        this.rollButton.disabled = true;
        this.gameStatus.textContent = '骰子投掷中...';
        
        // 添加滚动动画
        this.dice.classList.add('rolling');
        
        // 生成随机结果
        const diceValue = Math.floor(Math.random() * 6) + 1;
        
        // 2秒后显示结果
        setTimeout(() => {
            this.dice.classList.remove('rolling');
            this.showDiceResult(diceValue);
            this.saveResult(diceValue);
            this.gameStatus.textContent = '投掷完成！';
        }, 2000);
    }

    showDiceResult(value) {
        // 移除所有面的显示类
        this.dice.classList.remove('show-1', 'show-2', 'show-3', 'show-4', 'show-5', 'show-6');
        
        // 添加对应面的显示类
        this.dice.classList.add(`show-${value}`);
        
        // 显示结果
        this.diceResult.textContent = value;
        this.result.classList.remove('hidden');
        
        // 添加结果显示动画
        setTimeout(() => {
            this.result.style.animation = 'fadeInUp 0.5s ease-out';
        }, 100);
    }

    saveResult(value) {
        const record = {
            name: this.currentUser,
            result: value,
            ip: this.userIP,
            timestamp: new Date().toISOString(),
            time: new Date().toLocaleString('zh-CN')
        };
        
        this.gameRecords.push(record);
        this.saveRecords();
        this.displayRecords();
    }

    loadRecords() {
        try {
            const saved = localStorage.getItem('diceGameRecords');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn('加载记录失败，使用空记录');
            return [];
        }
    }

    saveRecords() {
        try {
            localStorage.setItem('diceGameRecords', JSON.stringify(this.gameRecords));
        } catch (error) {
            console.warn('保存记录失败');
        }
    }

    displayRecords() {
        if (this.gameRecords.length === 0) {
            this.recordsList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">暂无投掷记录</div>';
            return;
        }

        // 按时间倒序排列
        const sortedRecords = [...this.gameRecords].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        this.recordsList.innerHTML = sortedRecords.map(record => `
            <div class="record-item">
                <div class="name">${this.escapeHtml(record.name)}</div>
                <div class="result">${record.result}</div>
                <div class="time">${record.time}</div>
                <div class="ip">IP: ${record.ip}</div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 清除所有记录（调试用）
    clearAllRecords() {
        this.gameRecords = [];
        this.saveRecords();
        this.displayRecords();
        console.log('所有记录已清除');
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.diceGame = new DiceGame();
});

// 添加一些CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .record-item {
        animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
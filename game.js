document.addEventListener('DOMContentLoaded', function() {
    const mazeElement = document.getElementById('maze');
    const timeElement = document.getElementById('time');
    const restartButton = document.getElementById('restart');
    
    let maze = [];
    let carPosition = { x: 0, y: 0 };
    let startTime;
    let timerInterval;
    
    // 迷宮設計 (0=路, 1=牆, S=起點, F=終點)
    const mazeLayout = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 'S', 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 'F', 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    
    // 初始化迷宮
    function initMaze() {
        mazeElement.innerHTML = '';
        maze = [];
        
        for (let y = 0; y < mazeLayout.length; y++) {
            maze[y] = [];
            for (let x = 0; x < mazeLayout[y].length; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                if (mazeLayout[y][x] === 1) {
                    cell.classList.add('wall');
                } else if (mazeLayout[y][x] === 0) {
                    cell.classList.add('road');
                } else if (mazeLayout[y][x] === 'S') {
                    cell.classList.add('start');
                    carPosition = { x, y };
                    const car = document.createElement('div');
                    car.className = 'car';
                    cell.appendChild(car);
                } else if (mazeLayout[y][x] === 'F') {
                    cell.classList.add('finish');
                }
                
                maze[y][x] = mazeLayout[y][x];
                mazeElement.appendChild(cell);
            }
        }
    }
    
    // 移動車子
    function moveCar(dx, dy) {
        const newX = carPosition.x + dx;
        const newY = carPosition.y + dy;
        
        // 檢查是否超出邊界或是牆
        if (newX < 0 || newY < 0 || newY >= maze.length || newX >= maze[0].length || maze[newY][newX] === 1) {
            return false;
        }
        
        // 更新車子位置
        const oldCell = mazeElement.children[carPosition.y * maze[0].length + carPosition.x];
        const car = oldCell.querySelector('.car');
        oldCell.removeChild(car);
        
        carPosition = { x: newX, y: newY };
        
        const newCell = mazeElement.children[newY * maze[0].length + newX];
        newCell.appendChild(car);
        
        // 檢查是否到達終點
        if (maze[newY][newX] === 'F') {
            clearInterval(timerInterval);
            const endTime = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(endTime / 60).toString().padStart(2, '0');
            const seconds = (endTime % 60).toString().padStart(2, '0');
            alert(`恭喜你成功到達終點！用時: ${minutes}:${seconds}`);
        }
        
        return true;
    }
    
    // 更新計時器
    function updateTimer() {
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
        const seconds = (currentTime % 60).toString().padStart(2, '0');
        timeElement.textContent = `${minutes}:${seconds}`;
    }
    
    // 開始遊戲
    function startGame() {
        initMaze();
        startTime = Date.now();
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    // 鍵盤控制
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowUp':
                moveCar(0, -1);
                break;
            case 'ArrowDown':
                moveCar(0, 1);
                break;
            case 'ArrowLeft':
                moveCar(-1, 0);
                break;
            case 'ArrowRight':
                moveCar(1, 0);
                break;
        }
    });
    
    // 重新開始按鈕
    restartButton.addEventListener('click', startGame);
    
    // 初始化遊戲
    startGame();
});

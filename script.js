document.addEventListener('DOMContentLoaded', () => {
    const mInput = document.getElementById('m');
    const nInput = document.getElementById('n');
    const gridMapText = document.getElementById('grid-map');
    const hsRInput = document.getElementById('hs_r');
    const hsCInput = document.getElementById('hs_c');
    const ccRInput = document.getElementById('cc_r');
    const ccCInput = document.getElementById('cc_c');
    const findPathBtn = document.getElementById('find-path-btn');
    const resultDiv = document.getElementById('result');
    const gridContainer = document.getElementById('grid-container');

    let grid = [];
    let m = 0, n = 0;

    function createGrid() {
        gridContainer.innerHTML = '';
        resultDiv.textContent = '';

        m = parseInt(mInput.value);
        n = parseInt(nInput.value);

        const hsR = m - 1 - parseInt(hsRInput.value);
        const hsC = parseInt(hsCInput.value);
        const ccR = m - 1 - parseInt(ccRInput.value);
        const ccC = parseInt(ccCInput.value);

        const maxGridWidth = window.innerWidth - 350 - 100;
        const maxGridHeight = window.innerHeight - 50;
        let cellSize = Math.floor(Math.min(maxGridWidth / n, maxGridHeight / m));
        cellSize = Math.max(5, Math.min(40, cellSize));

        gridContainer.style.gridTemplateColumns = `repeat(${n}, ${cellSize}px)`;
        gridContainer.style.gridTemplateRows = `repeat(${m}, ${cellSize}px)`;

        gridContainer.style.fontSize =
            cellSize < 12 ? '0em' :
            cellSize < 25 ? '0.8em' : '1.2em';

        const mapLines = gridMapText.value.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        grid = mapLines.map(line => line.split(/\s+/).map(Number));

        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.r = r;
                cell.dataset.c = c;

                if (grid[r] && grid[r][c] === 1) cell.classList.add('obstacle');
                if (r === hsR && c === hsC) {
                    cell.classList.add('knight');
                    cell.textContent = '🤺';
                }
                if (r === ccR && c === ccC) {
                    cell.classList.add('princess');
                    cell.textContent = '👸🏻';
                }

                gridContainer.appendChild(cell);
            }
        }
    }

    function bfs(start, end) {
        const dr = [-1, -1, -1, 0, 0, 1, 1, 1];
        const dc = [-1, 0, 1, -1, 1, -1, 0, 1];
        const queue = [start];
        const visited = Array.from({ length: m }, () => Array(n).fill(false));
        const parent = Array.from({ length: m }, () => Array(n).fill(null));
        visited[start.r][start.c] = true;

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.r === end.r && current.c === end.c) {
                return reconstructPath(parent, start, end);
            }

            for (let i = 0; i < 8; i++) {
                const newR = current.r + dr[i];
                const newC = current.c + dc[i];

                if (newR >= 0 && newR < m && newC >= 0 && newC < n &&
                    !visited[newR][newC] && grid[newR][newC] !== 1) {

                    visited[newR][newC] = true;
                    parent[newR][newC] = current;
                    queue.push({ r: newR, c: newC });
                }
            }
        }

        return null;
    }

    function reconstructPath(parent, start, end) {
        const path = [];
        let current = end;
        while (current) {
            path.push(current);
            current = parent[current.r][current.c];
        }
        return path.reverse();
    }

    function visualizePath(path, start, end) {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const step = path[i];
                if ((step.r === start.r && step.c === start.c) || (step.r === end.r && step.c === end.c)) return;
                const cell = gridContainer.querySelector(`[data-r='${step.r}'][data-c='${step.c}']`);
                if (cell) cell.classList.add('path');
            }, i * 75);
        }
    }

    findPathBtn.addEventListener('click', () => {
        createGrid();
        const mVal = parseInt(mInput.value);
        const start = { r: mVal - 1 - parseInt(hsRInput.value), c: parseInt(hsCInput.value) };
        const end = { r: mVal - 1 - parseInt(ccRInput.value), c: parseInt(ccCInput.value) };

        if (start.r < 0 || start.r >= m || start.c < 0 || start.c >= n ||
            end.r < 0 || end.r >= m || end.c < 0 || end.c >= n) {
            resultDiv.textContent = 'Lỗi: Tọa độ không hợp lệ.';
            resultDiv.style.color = 'red';
            return;
        }

        if (grid[start.r][start.c] === 1 || grid[end.r][end.c] === 1) {
            resultDiv.textContent = 'Lỗi: Hiệp sĩ/Công chúa ở trong ô cấm.';
            resultDiv.style.color = 'red';
            return;
        }

        const path = bfs(start, end);
        if (path) {
            resultDiv.textContent = ` Hiệp sĩ hết FA 🫂! Số bước phải đi: ${path.length - 1}`;
            resultDiv.style.color = 'green';
            visualizePath(path, start, end);
        } else {
            resultDiv.textContent = 'Hiệp sĩ và công chúa không đến được với nhau 💔';
            resultDiv.style.color = 'red';
        }
    });

    createGrid();
});
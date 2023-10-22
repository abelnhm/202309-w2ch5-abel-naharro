function createBoard(rows, cols) {
  const board = new Array(rows);
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols).fill(Math.floor(Math.random() * 2));
  }

  return board;
}

function printBoard(board) {
  console.log(board.map((row) => row.join(' ')).join('\n'));
}

function getNeighbors(board, row, col) {
  const neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const r = row + i;
      const c = col + j;
      if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
        neighbors.push(board[r][c]);
      }
    }
  }

  return neighbors;
}

function getNextState(board, row, col) {
  const cell = board[row][col];
  const neighbors = getNeighbors(board, row, col);
  const liveNeighbors = neighbors.filter((n) => n === 1).length;

  if (cell === 1 && liveNeighbors < 2) return 0;
  if (cell === 1 && (liveNeighbors === 2 || liveNeighbors === 3)) return 1;
  if (cell === 1 && liveNeighbors > 3) return 0;
  if (cell === 0 && liveNeighbors === 3) return 1;

  return cell;
}

function getNextBoard(board) {
  const nextBoard = createBoard(board.length, board[0].length);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      nextBoard[i][j] = getNextState(board, i, j);
    }
  }

  return nextBoard;
}

function runGame(rows, cols, iterations) {
  let board = createBoard(rows, cols);
  printBoard(board);
  for (let i = 0; i < iterations; i++) {
    board = getNextBoard(board);
    console.log('Iteration ' + (i + 1));
    printBoard(board);
  }
}

runGame(10, 10, 10); // Change the arguments to customize the game

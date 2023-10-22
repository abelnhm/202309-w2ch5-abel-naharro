export class LiveGame {
  size = 0;
  board = [];
  auxBoard = [];

  constructor(size) {
    this.size = size;
    this.board = new Array(size)
      .fill()
      .map(() =>
        new Array(size).fill().map(() => Math.floor(Math.random() * 2))
      );
    this.auxBoard = structuredClone(this.board);
  }

  getNeighbors = (x, y, board) => {
    let neighborsLive = 0;

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i !== x || j !== y) {
          if (board[i] && board[i][j] === 1) {
            neighborsLive++;
          }
        }
      }
    }

    return neighborsLive;
  };

  getNextBoard = () => {
    const newBoard = structuredClone(this.auxBoard);
    let status;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        status = this.getNeighbors(i, j, this.auxBoard);
        if (this.auxBoard[i][j] === 0) {
          if (status === 3) {
            newBoard[i][j] = 1;
          }
        }

        if (status < 2 || status > 3) {
          newBoard[i][j] = 0;
        }
      }
    }

    this.auxBoard = newBoard;
    return newBoard;
  };

  printBoard = (board) => {
    const emojiBoard = board.map((row) =>
      row.map((cell) => (cell === 1 ? '⬛' : '⬜')).join(' ')
    );

    console.table(emojiBoard);
    return emojiBoard;
  };

  playGame = () => {
    this.printBoard(this.board);

    setInterval(() => {
      for (let index = 0; index < 2; index++) {
        const newBoard = this.getNextBoard();
        this.printBoard(newBoard);
      }
    }, 700);
  };
}

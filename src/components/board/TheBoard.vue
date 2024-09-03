<template>
  <section>
    <div :class="overlayClass" @click="hideBoardOverlay">
      <h3 id="current-game-status">PLAY</h3>
    </div>
    <h1 id="current-game-status">15 PUZZLE</h1>

    <div class="row" v-for="(row, rowIdx) in board" :key="rowIdx">
      <button
        v-for="(number, colIdx) in row"
        :id="getButtonId(rowIdx, colIdx)"
        :key="colIdx"
        :class="getButtonClass(number, rowIdx, colIdx)"
        @click="handleButtonClick(rowIdx, colIdx, number)"
      >
        {{ number }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      directions: [
        [1, 0], // down
        [-1, 0], // up
        [0, 1], // right
        [0, -1], // left
      ],
    };
  },
  computed: {
    overlayClass() {
      return this.$store.getters.isPausedGetter ? "board-overlay" : "hide";
    },
    board() {
      return this.$store.getters.boardGetter;
    },
    shuffleFlag() {
      return this.$store.getters.toggleShuffleGetter;
    },
    numberOfCorrect() {
      let correctCount = 0;
      this.board.forEach((row, rowIdx) => {
        row.forEach((number, colIdx) => {
          const actualIndex = this.getButtonId(rowIdx, colIdx);
          if (actualIndex === number) {
            correctCount++;
          }
        });
      });
      this.$store.commit("numberOfGreensMutator", correctCount);
      console.log(this.$store.getters.numberOfGreensGetter);
      return correctCount;
    },
  },
  watch: {
    shuffleFlag(newVal) {
      if (!this.$store.state.backendBoard) this.shuffleBoard(10);
    },
  },
  methods: {
    getButtonId(rowIdx, colIdx) {
      return rowIdx * 4 + colIdx + 1;
    },
    getButtonClass(number, rowIdx, colIdx) {
      const actualIndex = this.getButtonId(rowIdx, colIdx);
      this.numberOfCorrect;
      if (actualIndex === number) {
        return "btn correct";
      }
      if (number === null) return "btn empty";
      return "btn incorrect";
    },
    hideBoardOverlay() {
      this.$store.commit("togglePause");
    },
    swapButtons(row, col, di, dj) {
      if (this.isOutOfBounds(row + di, col + dj)) return;
      const [targetRow, targetCol] = [row + di, col + dj];
      [this.board[row][col], this.board[targetRow][targetCol]] = [
        this.board[targetRow][targetCol],
        this.board[row][col],
      ];
    },
    isOutOfBounds(row, col) {
      return row < 0 || row >= 4 || col < 0 || col >= 4;
    },
    shuffleBoard(numberOfShuffles) {
      for (let i = 0; i < numberOfShuffles; i++) {
        const [di, dj] = this.directions[Math.floor(Math.random() * 4)];
        const rawIdx = Math.floor(Math.random() * 16);
        const [row, col] = [Math.floor(rawIdx / 4), rawIdx % 4];
        this.swapButtons(row, col, di, dj);
      }
    },
    swapInGame(row, col, dir) {
      this.swapButtons(row, col, ...dir);
      this.$store.commit("increaseMoves");
    },
    handleButtonClick(row, col, number) {
      if (number === null) return;

      const neighbours = [
        { row: row - 1, col }, // above
        { row: row + 1, col }, // below
        { row, col: col - 1 }, // left
        { row, col: col + 1 }, // right
      ];

      for (const { row: nRow, col: nCol } of neighbours) {
        if (this.isValidNeighbour(nRow, nCol)) {
          const neighbourValue = this.board[nRow][nCol];
          if (neighbourValue === null) {
            this.swapInGame(row, col, [nRow - row, nCol - col]);
            break;
          }
        }
      }
    },
    isValidNeighbour(row, col) {
      return row >= 0 && row < 4 && col >= 0 && col < 4;
    },
  },
  async beforeCreate() {
    const response = await fetch("http://localhost:3001/get-saved-progress");
    if (response.ok) {
      const data = await response.json();
      if (data.moves > 0 || data.time > 0) {
        this.$store.commit("setResumeData");
        this.$store.commit("setBackendMoves", data.moves);
        this.$store.commit("setBackendTime", data.time);
        this.$store.commit("setBackendBoard", data.board);
      }
    }
  },
  beforeMount() {
    if (!this.$store.state.backendBoard) this.shuffleBoard(10);
  },
};
</script>

<!-- <script>
export default {
  data() {
    return {
      numberOfCorrect: 0,
      directions: [
        [1, 0], // down
        [-1, 0], // up
        [0, 1], // right
        [0, -1], // left
      ],
    };
  },
  computed: {
    overlayClass() {
      return this.$store.getters.isPausedGetter ? "board-overlay" : "hide";
    },
    board() {
      return this.$store.getters.boardGetter;
    },
    shuffleFlag() {
      return this.$store.getters.toggleShuffleGetter;
    },
  },
  watch: {
    shuffleFlag(newVal) {
      if (!this.$store.state.backendBoard) this.shuffleBoard(10);
    },
  },
  methods: {
    getButtonId(rowIdx, colIdx) {
      return rowIdx * 4 + colIdx + 1;
    },
    getButtonClass(number, rowIdx, colIdx) {
      const actualIndex = this.getButtonId(rowIdx, colIdx);
      if (actualIndex === number){
        this.numberOfCorrect++;
        console.log(this.numberOfCorrect)
        return "btn correct";
      } 
      if (number === null) return "btn empty";
      return "btn incorrect";
    },
    hideBoardOverlay() {
      this.$store.commit("togglePause");
    },
    swapButtons(row, col, di, dj) {
      if (this.isOutOfBounds(row + di, col + dj)) return;
      const [targetRow, targetCol] = [row + di, col + dj];
      [this.board[row][col], this.board[targetRow][targetCol]] = [
        this.board[targetRow][targetCol],
        this.board[row][col],
      ];
    },
    isOutOfBounds(row, col) {
      return row < 0 || row >= 4 || col < 0 || col >= 4;
    },
    shuffleBoard(numberOfShuffles) {
      for (let i = 0; i < numberOfShuffles; i++) {
        const [di, dj] = this.directions[Math.floor(Math.random() * 4)];
        const rawIdx = Math.floor(Math.random() * 16);
        const [row, col] = [Math.floor(rawIdx / 4), rawIdx % 4];
        this.swapButtons(row, col, di, dj);
      }
    },
    swapInGame(row, col, dir) {
      this.swapButtons(row, col, ...dir);
      this.$store.commit("increaseMoves");
    },
    handleButtonClick(row, col, number) {
      if (number === null) return;

      const neighbours = [
        { row: row - 1, col }, // above
        { row: row + 1, col }, // below
        { row, col: col - 1 }, // left
        { row, col: col + 1 }, // right
      ];

      for (const { row: nRow, col: nCol } of neighbours) {
        if (this.isValidNeighbour(nRow, nCol)) {
          const neighbourValue = this.board[nRow][nCol];
          if (neighbourValue === null) {
            this.swapInGame(row, col, [nRow - row, nCol - col]);
            break;
          }
        }
      }
    },
    isValidNeighbour(row, col) {
      return row >= 0 && row < 4 && col >= 0 && col < 4;
    },
  },
  async beforeCreate() {
    const response = await fetch("http://localhost:3001/get-saved-progress");
    if (response.ok) {
      const data = await response.json();
      if (data.moves > 0 || data.time > 0) {
        this.$store.commit("setResumeData");
        this.$store.commit("setBackendMoves", data.moves);
        this.$store.commit("setBackendTime", data.time);
        this.$store.commit("setBackendBoard", data.board);
      }
    }
  },
  beforeMount() {
    if (!this.$store.state.backendBoard) this.shuffleBoard(10);
  },
};
</script> -->

<style scoped>
section {
  width: 33%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 3px solid rgb(51, 51, 51);
  padding: 20px;
  border-radius: 25px;
  background-color: #111;
}

.board-overlay {
  position: absolute;
  width: 100%;
  height: 101%;
  background-color: rgb(32, 32, 32);
  opacity: 80%;
  border-radius: 25px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

h1 {
  color: white;
  font-size: 100px;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 2px solid white;
}

h3 {
  color: white;
  font-size: 100px;
  text-align: center;
  width: 100%;
}

.hide {
  display: none;
}

button {
  width: 84px;
  height: 84px;
  margin: 12px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 33px;
  font-weight: 800;
  background: none;
  border: 1px solid white;
  color: white;
}

.row {
  display: flex;
  width: 100%;
  justify-content: center;
}

.correct {
  background: green;
}

.incorrect {
  background: #810000;
}

@media (max-width: 1200px) {
  section {
    width: 60%;
    margin-bottom: 4%;
  }
}

@media (max-width: 700px) {
  section {
    width: 100%;
  }
  h1 {
    font-size: 40px;
  }
  button {
    width: 40px;
    height: 40px;
    margin: 12px;
    border-radius: 5px;
    font-size: 17px;
  }
}
</style>

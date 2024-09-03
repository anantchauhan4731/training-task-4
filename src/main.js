import "./assets/main.css";

import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";

const store = createStore({
  state() {
    return {
      moves: 0,
      time: 0,
      isPaused: true,
      currentState: null,
      hasResumeData: false,
      backendMoves: null,
      backendTime: null,
      backendBoard: null,
      board: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null],
      ],
      toggleShuffle: false,
      numberOfGreens: true,
    };
  },
  actions: {
    async saveProgressAction({ commit, state }) {
      try {
        commit("fetchDataToSave");
        const res = await fetch("http://localhost:3001/save-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state.currentState),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchProgressAction({ commit, state }) {
      try {
        commit("fetchDataToSave");
        const res = await fetch("http://localhost:3001/save-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state.currentState),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  getters: {
    numberOfGreensGetter(state) {
      return state.numberOfGreens;
    },
    getResumeData(state) {
      return state.hasResumeData;
    },
    movesGetter(state) {
      return state.moves;
    },
    boardGetter(state) {
      return state.board;
    },
    isPausedGetter(state) {
      return state.isPaused;
    },
    timeGetter(state) {
      const totalTimeInSeconds = state.time;
      const minutes = parseInt(totalTimeInSeconds / 60);
      const seconds = totalTimeInSeconds % 60;
      return `${minutes > 9 ? "" : "0"}${minutes}:${
        seconds > 9 ? "" : "0"
      }${seconds}`;
    },
    toggleShuffleGetter(state) {
      return state.toggleShuffle;
    },
  },
  mutations: {
    numberOfGreensMutator(state, n) {
      state.numberOfGreens = n;
    },
    toggleShuffleMutator(state) {
      state.toggleShuffle = !state.toggleShuffle;
      console.log("hi", state.toggleShuffle);
    },
    retry(state) {
      state.moves = 0;
      state.time = 0;
      state.backendMoves = 0;
      state.isPaused = true;
      state.hasResumeData = false;
      state.currentState = null;
    },
    setBoard(state) {
      state.board = state.backendBoard;
    },
    setBackendBoard(state, b) {
      state.backendBoard = b;
    },
    setTime(state) {
      state.time = state.backendTime;
    },
    setBackendTime(state, t) {
      state.backendTime = t;
    },
    setMoves(state) {
      state.moves = state.backendMoves;
    },
    setBackendMoves(state, m) {
      state.backendMoves = m;
    },
    setResumeData(state) {
      state.hasResumeData = true;
    },
    increaseTimer(state) {
      !state.isPaused && state.time++;
    },
    increaseMoves(state) {
      state.moves++;
    },
    togglePause(state) {
      state.isPaused = !state.isPaused;
    },
    fetchDataToSave(state) {
      const currentState = {
        time: state.time,
        moves: state.moves,
        board: state.board,
      };

      state.currentState = currentState;
    },
  },
});

const app = createApp(App);

app.use(store);

app.mount("#app");

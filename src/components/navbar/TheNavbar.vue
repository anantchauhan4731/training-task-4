<template>
  <nav>
    <ul>
      <li>
        <button @click="pauseGame">
          {{ $store.getters.isPausedGetter ? "PLAY" : "PAUSE" }}
        </button>
      </li>
      <li><button @click="retryGame">RETRY</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    pauseGame() {
      this.$store.commit("togglePause");
    },
    retryGame() {
      this.$store.commit("toggleShuffleMutator");
      this.$store.commit("retry");
    },
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  border-bottom: 2px solid white;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 0;
  padding: 0;
}
li {
  text-decoration: none;
  list-style: none;
}
button {
  background: #006efe;
  border: 0;
  color: white;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  font-size: 30px;
}
</style>

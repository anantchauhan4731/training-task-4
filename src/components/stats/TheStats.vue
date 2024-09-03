<template>
  <section>
    <h2>STATS</h2>
    <div class="stats-item">
      <h3>MOVES</h3>
      <h3>- {{ $store.getters.movesGetter }}</h3>
    </div>
    <div class="stats-item">
      <h3>TIMER</h3>
      <h3>- {{ $store.getters.timeGetter }}</h3>
    </div>
    <div>
      <div class="save-progress-container">
        <button @click="saveProgressHandler" class="save-progress">
          SAVE PROGRESS
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    saveProgressHandler() {
      this.$store.dispatch("saveProgressAction");
    },
  },
};
</script>

<style scoped>
section {
  width: 30%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

h3 {
  font-size: 40px;
  width: 200px;
}

.stats-item {
  margin: 10px 40px;
  padding: 10px 30px;
  display: flex;
  height: 100px;
  align-items: center;
  background-color: #111;
  border: 3px solid rgb(51, 51, 51);
  border-radius: 15px;
}
.save-progress-container {
  margin: 10px 40px;
  padding: 10px 30px;
  display: flex;
  height: 100px;
  align-items: center;
}
.save-progress {
  width: 100%;
  height: 100%;
  background: #006efe;
  color: white;
  border: 0;
  border-radius: 50px;
  font-size: 30px;
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
  h3 {
    font-size: 25px;
  }
  .stats-item {
    margin: 10px 0;
  }
  .save-progress-container {
    margin: 10px 0;
  }
}
</style>

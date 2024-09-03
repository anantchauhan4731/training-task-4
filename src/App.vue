<template>
  <div>
    <modal title="RESUME?" v-if="$store.getters.getResumeData"></modal>
    <modal title="YOU WON!" v-if="$store.getters.numberOfGreensGetter === 15"></modal>
    <the-navbar></the-navbar>
    <main>
      <the-stats></the-stats>
      <the-board></the-board>
      <the-description></the-description>
    </main>
  </div>
</template>

<script>
import TheBoard from "./components/board/TheBoard.vue";
import TheDescription from "./components/description/TheDescription.vue";
import TheNavbar from "./components/navbar/TheNavbar.vue";
import TheStats from "./components/stats/TheStats.vue";
import Modal from "./components/UI/modal/Modal.vue";

export default {
  mounted() {
    setInterval(() => {
      this.$store.commit("increaseTimer");
    }, 1000);
  },
  components: { TheBoard, TheStats, TheDescription, TheNavbar, Modal },
};
</script>

<style>
main {
  margin-top: 35px;
  display: flex;
  width: 100%;
  min-height: 80vh;
  justify-content: space-evenly;
}

@media (max-width: 1200px) {
  main {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 50px;
  }
}
</style>

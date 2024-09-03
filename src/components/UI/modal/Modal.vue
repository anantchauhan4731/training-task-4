<template>
  <div v-if="showModal" class="overlay">
    <div class="modal">
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
      <div class="button-group">
        <button class="no-btn" @click="closeModal">
          {{ title === "YOU WON!" ? "CLOSE" : "NO" }}
        </button>
        <button
          v-if="title !== 'YOU WON!'"
          class="yes-btn"
          @click="confirmAndFetch"
        >
          YES
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    confirmAndFetch() {
      this.closeModal();
      this.$store.commit("setMoves");
      this.$store.commit("setTime");
      this.$store.commit("setBoard");
    },
  },
};
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #000;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  width: 500px;
  position: relative;
}

h2 {
  color: #fff;
  text-align: center;
  font-size: 42px;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  width: 100%;
  height: 50px;
  font-size: 30px;
  color: #fff;
  border: none;
  border-radius: 10px;
}

.no-btn {
  background: #810000;
}

.yes-btn {
  background: green;
}

@media (min-width: 768px) {
  .button-group {
    flex-direction: row;
  }
}

@media (max-width: 768px) {
  .modal {
    width: 90%;
  }
  h2 {
    font-size: 20px;
  }
  button {
    font-size: 16px;
  }
}
</style>

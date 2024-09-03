<template>
  <section>
    <h2>RULES</h2>
    <div class="stats-item">
      <li>Place each block in it's correct position starting from 1 to 15.</li>
      <li>
        To move a block you can click on it and swap it with the empty block.
      </li>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
section {
  width: 30%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

li {
  font-size: 25px;
  margin: 20px 0;
}

.stats-item {
  margin: 40px;
  padding: 30px;
  background-color: #111;
  border: 3px solid rgb(51, 51, 51);
  border-radius: 15px;
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
    margin: 0;
  }
  .stats-item {
    margin: 10px 0;
  }
}
</style>

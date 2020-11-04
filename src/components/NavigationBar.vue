<template>
  <div class="nav-bar">
    <router-link to="/attestation">
      <div class="icon-btn">
        <img src="../assets/icon1.svg" width="25px" alt="">
        <p>Mon attestation</p>
      </div>
    </router-link>

    <router-link to="/generate">
      <div class="icon-btn">
        <img src="../assets/icon1.svg" width="25px" alt="">
        <p>Generer</p>
      </div>
    </router-link>

    <router-link to="/">
      <div class="icon-btn">
        <img src="../assets/icon1.svg" width="25px" alt="">
        <p>Profil</p>
      </div>
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      msg: 'Hi there!',
    };
  },
};
</script>

<style scoped>
.nav-bar {
  width: 100%;
  height: 64px;
  background: #4b79b6;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.icon-btn {
  font-size: 0.6em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px
}

.icon-btn > p {
  margin: 0;
}
</style>

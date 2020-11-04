<template>
  <div class="nav-bar">
    <router-link to="/attestation">
      <div class="icon-btn" :class="{'unselected-route': isCurrentRoute('Attestation')}">
        <img src="../assets/icon1.svg" width="25px" alt="">
        <p>Mon attestation</p>
      </div>
    </router-link>

    <router-link to="/generate">
      <div class="icon-btn" :class="{'unselected-route': isCurrentRoute('Generate')}">
        <img src="../assets/icon1.svg" width="25px" alt="">
        <p>Generer</p>
      </div>
    </router-link>

    <router-link to="/">
      <div class="icon-btn" :class="{'unselected-route': isCurrentRoute('Profile')}">
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
      currentRoute: '',
    };
  },
  created() {
    this.currentRoute = this.$route.name;
  },
  watch: {
    $route(to) {
      if (to.name) {
        this.currentRoute = to.name;
      }
    },
  },
  methods: {
    isCurrentRoute(name) {
      return !(name === this.currentRoute);
    },
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
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 88px
}

.icon-btn > p {
  margin: 0;
}

.unselected-route {
  opacity: 0.6;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
      <NavigationBar />
    </div>
    <router-view/>
    <div class="version-number">
      v0.5
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  name: 'Home',
  components: {
    NavigationBar,
  },
  created() {
    // -- Redirect user according to the info done
    const userInfo = JSON.parse(localStorage.getItem('attestationInfo'));
    const currentAttestation = JSON.parse(localStorage.getItem('currentAttestation'));
    if (userInfo !== null && currentAttestation !== null) {
      this.$router.push('Attestation');
    } else if (userInfo !== null && currentAttestation === null) {
      this.$router.push('Generate');
    }
  },
};
</script>

<style>
:root {
  --color-1: #25e77d;
  --color-2: #ffffff;
}

h1 {
  font-size: 1.2em;
}

a {
  text-decoration: none;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 600px;
  margin: auto;
  font-size: 14px;
}

#nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  margin: auto;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

#nav div.router-link-exact-active {
  opacity: 1;
}

.version-number {
  position: fixed;
  bottom: 2px;
  right: 2px;
  font-size: 9px;
  color: var(--color-2);
}

@media (max-width: 600px) {
  #nav {
    left: 0;
  }
}
</style>

<template>
  <div id="app">
    <div v-if="disclaimer" class="disclaimer-app">
      <div>
        <p><strong>Générateur d’attestation</strong></p>
        <p>Cette application est gracieusement mise à disposition par la société BAG-ERA.
          Le code source de ce générateur d’attestation est ouvert.</p>
        <p><strong>Confidentialité des données</strong></p>
        <p>Les informations saisies dans ce générateur d’attestation ne font
          l’objet d’aucune collecte.
        <p>Les données personnelles sont exclusivement stockées, localement,
          dans le terminal (ordinateur, tablette, smartphone)
          utilisé pour générer l’attestation.</p>
        <p @click="killDisclaimer" style="text-align: center">FERMER</p>
          <!-- Disclaimer à propos de l’application -->
      </div>
    </div>
    <div @click="openDisclaimer" class="open-disclaimer">
      <p>?</p>
    </div>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
      <NavigationBar />
    </div>
    <router-view/>
    <div class="version-number">
      v1.0
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
  data() {
    return {
      disclaimer: false,
    };
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
  methods: {
    openDisclaimer() {
      this.disclaimer = true;
    },
    killDisclaimer() {
      this.disclaimer = false;
    },
  },
};
</script>

<style>
:root {
  --color-1: rgb(111, 207, 151);
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

.open-disclaimer {
  position: fixed;
  top: 6px;
  right: 6px;
  border: 1px solid black;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.open-disclaimer > p {
  margin: 0;
  font-weight: bold;
}

.disclaimer-app {
  position: fixed;
  top: 0;
  background-color: #ffffff;
  padding: 12px;
  margin: 12px;
  z-index: 10;
  display: flex;
  justify-content: center;
  border: 2px solid grey;
  border-radius: 12px;
}

@media (max-width: 600px) {
  #nav {
    left: 0;
  }
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
    </div>
    <router-view/>
    <div class="version-number">
      v0.2
    </div>
  </div>
</template>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  max-width: 600px;
  margin: auto;
  font-size: 14px;
}

#nav {
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.version-number {
  position: fixed;
  bottom: 0px;
  right: 6px;
  font-size: 9px;
  color: grey;
}
</style>

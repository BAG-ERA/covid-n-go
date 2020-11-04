<template>
  <div>
    <h1>Generate</h1>
    <div class="action-btn">
      <input
        class="generate-btn"
        type="button" @click="generatePdfCall"
        value="GENERATE">
    </div>
  </div>
</template>

<script>
import getFromLocalStorage from '@/mixins/storage';

export default {
  name: 'Generate',
  mixins: [getFromLocalStorage],
  data() {
    return {
      msg: 'Hi there!',
    };
  },
  created() {
    const formInfo = this.getFromLocalStorage();
    console.log('formInfo: ', formInfo);
  },
  methods: {
    generatePdfCall() {
      console.log('Generate ...');
    },
  },
};
</script>

<style scoped>
.action-btn {
  display: flex;
  justify-content: center;
}

.generate-btn {
  padding: 24px;
  width: 100%;
  background-color: #25e77d;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  text-align: center;
  letter-spacing: 0.2em;
  margin-top: 2em;
  font-size: 1em;
}
</style>

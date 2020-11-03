<template>
  <div class="hello">
    <button  @click="generatePdfCall">GENERATE</button>
    <a hidden ref="dw" :download="name" :href='url'>link</a>
  </div>
</template>

<script>
// eslint-disable-next-line import/named
import pdfBase from '@/assets/certificate.pdf';
import generatePdf from '../mixins/pdf-utils';

export default {
  name: 'Form',
  data() {
    return {
      url: '',
      name: 'init',
      data: {
        firstname: 'Isabel',
        lastname: 'Vergara',
        birthday: '04/02/1984',
        placeofbirth: 'Colombie',
        address: '30 quai de france',
        zipcode: '38000',
        city: 'Grenoble',
        datesortie: '02/11/2020',
        heuresortie: '23:30',
      },
    };
  },
  props: {
    msg: String,
  },
  methods: {
    async generatePdfCall() {
      const now = new Date();
      const month = (`0${(now.getMonth() + 1).toString()}`).slice(-2);
      const minutes = (`0${now.getMinutes().toString()}`).slice(-2);
      this.data.datesortie = `${now.getDate()}/${month}/${now.getFullYear()}`;
      this.data.heuresortie = `${`${now.getHours()}`}:${minutes}`;
      const date = (now).toISOString();
      this.name = `attestation_${date}.pdf`;
      const data = await generatePdf(this.data, 'travail', pdfBase);
      this.url = window.URL.createObjectURL(data);
      setTimeout(() => { this.$refs.dw.click(); }, 1000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

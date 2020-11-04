<template>
  <div>
    <h1>My attestation</h1>
    <div v-if="generatedQR" class="action-btn">
      <img :src="generatedQR">
      <span>{{ QRData[0] }}</span>
    </div>
    <a @click="generatePdfCall">Ouvrir le pdf</a>
    <a hidden ref="dw" :href='url' :download="name"></a>
  </div>
</template>

<script>
import pdfBase from '@/assets/certificate.pdf';
import getFromLocalStorage from '@/mixins/storage';
import generatePdf from '../mixins/pdf-utils';

export default {
  name: 'Attestation',
  mixins: [getFromLocalStorage],
  data() {
    return {
      generatedQR: null,
      QRData: null,
      url: '',
      name: 'attestation.pdf',
      motif: [],
      data: {
        firstname: '',
        lastname: '',
        birthday: '',
        placeofbirth: '',
        address: '',
        zipcode: '',
        city: '',
        datesortie: '',
        heuresortie: '',
      },
    };
  },
  created() {
    const currentAtt = JSON.parse(localStorage.getItem('currentAttestation'));
    if (currentAtt) {
      this.generatedQR = currentAtt.QRCode;
      this.QRData = currentAtt.data;
      this.motif = currentAtt.motif;
    }
    const formInfo = this.getFromLocalStorage();
    if (formInfo !== null) {
      this.data = formInfo;
    }
  },
  methods: {
    async generatePdfCall() {
      this.generatingPDF = true;
      const data = await generatePdf(this.data, this.motif, pdfBase, this.generatedQR, this.QRData);
      this.url = window.URL.createObjectURL(data);
      this.generatingPDF = false;
      setTimeout(() => this.$refs.dw.click(), 200);
    },
  },
};
</script>

<style scoped>
  .super-class {
    background: #4b79b6;
  }
</style>

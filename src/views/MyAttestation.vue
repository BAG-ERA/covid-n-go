<template>
  <div>
    <h1>Mon attestation</h1>
    <div v-if="generatedQR" class="qr-code">
      <img :src="generatedQR">
      <span class="qr-code-txt">{{ QRInfo }}</span>
    </div>
    <div class="open-pdf" @click="generatePdfCall">Ouvrir le pdf</div>
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
  computed: {
    QRInfo() {
      const tmp = this.QRData.split(';');
      return `${tmp[0]} ${tmp[tmp.length - 1]}`;
    },
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
h1 {
  text-align: center;
}

.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code > img {
  width: 80%;
}

.qr-code-txt {
  margin: 24px 0;
}

.open-pdf {
  margin: 12px;
  padding: 12px;
  text-align: center;
  color: var(--color-2);
  background-color: var(--color-1);
  border-radius: 6px;
}
</style>

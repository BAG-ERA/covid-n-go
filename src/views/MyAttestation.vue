<template>
  <div>
    <h1>Mon attestation</h1>
    <div v-if="generatedQR" class="qr-code">
      <img :src="generatedQR">
      <span class="qr-code-txt">{{ QRInfo }}</span>
    </div>
    <div class="action-btn">
      <div class="open-pdf unselectable-btn-text" @click="generatePdfCall">AFFICHER LE PDF</div>
    </div>
      <div class="made-by">
        <p>Made with &#x2764;&#xFE0F; by <a href="https://bag-era.fr/" target="_blank">Bag-era - 2020</a> - Take care</p>
      </div>

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
      this.name = `attestation_${this.data.datesortie}-${this.data.heuresortie}.pdf`;
      setTimeout(() => { this.$refs.dw.click(); this.generatingPDF = false; }, 200);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.action-btn {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}
.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code > img {
  width: 80%;
  max-width: 400px;
}

.qr-code-txt {
  margin: 24px 0;
}

.open-pdf {
  padding: 3vh;
  width: 100%;
  background-color: var(--color-1);
  color: var(--color-2);
  border: none;
  border-radius: 6px;
  text-align: center;
  letter-spacing: 0.2em;
  margin-top: 2em;
  font-size: 1em;
}

.made-by {
  color: grey;
  text-align: center;
  font-size: 0.8em;
  margin: 48px 0;
}
</style>

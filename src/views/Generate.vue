<template>
  <div>
    <h1>Generate</h1>
    <div class="motif-section">
      <label for="motif">Motif</label>
      <select name="motif" id="motif" v-model="motif">
        <option v-for="i in motifList" :key="i" :value="i">{{ i }}</option>
      </select>
    </div>
    <div class="action-btn">
      <input
        class="generate-btn"
        type="button" @click="generateQRCode"
        value="GENERATE">
    </div>
  </div>
</template>

<script>
import getFromLocalStorage from '@/mixins/storage';
import generateQR from '../mixins/util';

export default {
  name: 'Generate',
  mixins: [getFromLocalStorage],
  data() {
    return {
      generatedQR: null,
      QRData: null,
      motif: 'travail',
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
      motifList: [
        'travail',
        'achats',
        'sante',
        'famille',
        'handicap',
        'sport_animaux',
        'convocation',
        'missions',
        'enfants',
      ],
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
    async generateQRCode() {
      const creationInstant = new Date();
      const creationDate = creationInstant.toLocaleDateString('fr-FR');
      const creationHour = creationInstant
        .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
      this.data.datesortie = creationDate;
      this.data.heuresortie = creationHour;
      const data = [
        `Cree le: ${creationDate} a ${creationHour}`,
        `Nom: ${this.data.lastname}`,
        `Prenom: ${this.data.firstname}`,
        `Naissance: ${this.data.birthday} a ${this.data.placeofbirth}`,
        `Adresse: ${this.data.address} ${this.data.zipcode} ${this.data.city}`,
        `Sortie: ${this.data.datesortie} a ${this.data.heuresortie}`,
        `Motifs: ${this.motif}`,
      ].join(';\n ');
      this.QRData = data;
      this.generatedQR = await generateQR(data);
      localStorage.setItem('currentAttestation', JSON.stringify({
        QRCode: this.generatedQR,
        data,
        motif: this.motif,
      }));
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

<template>
  <div>
    <h1>Selectionnez un motif</h1>
    <div class="motif-section">
      <div class="icon-row"
        :class="{ 'active': isActive[reason.name] }"
        @click="selectMotive(reason)"
        v-for="reason in reasons"
        :key="reason.name">
        <div class="icon-container">
          <img :src="require('../assets/' + reason.icon)" width="50px" alt="">
        </div>
        <div class="description-container">{{ reason.description }}</div>
      </div>
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
import reasons from '../data/reasons';

export default {
  name: 'Generate',
  mixins: [getFromLocalStorage],
  data() {
    return {
      reasons,
      generatedQR: null,
      QRData: null,
      motif: 'travail',
      isActive: {
        travail: false,
        achats: false,
        sante: false,
        famille: false,
        handicap: false,
        sport_animaux: false,
        convocation: false,
        missions: false,
        enfants: false,
      },
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
    selectMotive(reason) {
      if (this.isActive[reason.name]) {
        // eslint-disable-next-line no-bitwise
        this.isActive[reason.name] = false;
      } else {
        this.isActive[reason.name] = true;
      }
    },
    async generateQRCode() {
      this.motif = [];
      this.reasons.forEach((reason) => {
        if (this.isActive[reason.name]) {
          this.motif.push(reason.name);
        }
      });
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
        `Motifs: ${this.motif.toString()}`,
      ].join(';\n ');
      this.QRData = data;
      this.generatedQR = await generateQR(data);
      localStorage.setItem('currentAttestation', JSON.stringify({
        QRCode: this.generatedQR,
        data,
        motif: this.motif,
      }));
      this.$router.push('Attestation');
    },
  },
};
</script>

<style scoped>
.action-btn {
  display: flex;
  justify-content: center;
}

.icon-row {
  display: flex;
  margin: 0.3em;
  background: #ffffff;
  cursor: pointer;
}
.active{
  background:#0000000A;
}

.icon-container{
  font-size: 0.6em;
  display: flex;
  align-items: center;
  flex: 20%;
  flex-direction:row
}

.description-container {
  font-size: 0.6em;
  display: flex;
  flex: 75%;
  align-items: center;
  flex-direction:row
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

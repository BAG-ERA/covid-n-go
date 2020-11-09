<template>
  <div>
    <h1>Vous voulez :</h1>
    <div class="motif-section">
      <div class="icon-row"
        :class="{ 'active': isActive[reason.name] }"
        @click="selectMotive(reason)"
        v-for="reason in reasons"
        :key="reason.name">
        <div class="icon-container">
          <img :src="require('../assets/' + reason.icon)" width="40em" alt="">
        </div>
        <div class="description-container">{{ reason.shortdescription }}</div>
      </div>
    </div>
    <div class="action-btn">
      <div
        class="generate-btn unselectable-btn-text"
        :class="{'disabled-btn': !formIsValid}"
        @click="generateQRCode">
        GENERER
      </div>
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
      formIsValid: false,
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
    this.formIsValid = this.validateForm();
  },
  watch: {
    isActive: {
      deep: true,
      handler() {
        this.formIsValid = this.validateForm();
      },
    },
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
      if (!this.formIsValid) {
        return;
      }
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
      localStorage.setItem('attestationInfo', JSON.stringify(this.data));
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
    validateForm() {
      let isValid = true;
      const copyForm = { ...this.isActive };
      const f = Object.values(copyForm);
      isValid = f.includes(true);
      return isValid;
    },
  },
};
</script>

<style scoped>
.action-btn {
  display: flex;
  justify-content: center;
  margin-bottom: 85px;
}

.icon-row {
  display: flex;
  margin: 0.3em;
  padding: 1vh;
  background: #ffffff;
  cursor: pointer;
  border: 1px solid;
  border-color: #00000009;
}
.active{
  background:rgba(111, 207, 151, 0.4);;
}

.icon-container{
  font-size: 0.6em;
  display: flex;
  align-items: center;
  flex: 20%;
  flex-direction:row;
  justify-content: center;
}

.description-container {
  font-size: 0.9em;
  display: flex;
  flex: 70%;
  align-items: center;
  flex-direction:row
}

.generate-btn {
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

.disabled-btn {
  background-color: lightgrey;
}
</style>

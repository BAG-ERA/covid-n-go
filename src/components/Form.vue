<template>
  <div>
    <div
      v-if="generatingPDF"
      class="generating-message">
      <p>Generating attestation</p>
      <p class="emoji-me">⏱️</p>
    </div>
    <div v-else>
      <div class="form-style-8">
        <label for="firstname">Prenom</label>
        <input type="text" v-model="data.firstname" name="firstname" placeholder="" />
        <label for="lastname">Nom de famille</label>
        <input type="text" v-model="data.lastname" name="lastname" placeholder="" />
        <label for="birthday">Date de naissance</label>
        <input
          type="date"
          v-model="birthday"
          name="birthday"
          placeholder=""/>
        <label for="placeofbirth">Lieu de naissance</label>
        <input
          type="text"
          v-model="data.placeofbirth"
          name="placeofbirth"
          placeholder="" />
        <label for="address">Adresse</label>
        <input type="text" v-model="data.address" name="address" placeholder="" />
        <label for="zipcode">Code postal</label>
        <input type="number" v-model="data.zipcode" name="zipcode" placeholder="" />
        <label for="city">Ville</label>
        <input type="text" v-model="data.city" name="city" placeholder="" />
        <div class="motif-section">
          <label for="motif">Motif</label>
          <select name="motif" id="motif" v-model="motif">
            <option v-for="i in motifList" :key="i" :value="i">{{ i }}</option>
          </select>
        </div>
      </div>

      <div class="action-btn">
        <input
          class="generate-btn"
          :class="{'disabled-btn': !formIsValid}"
          type="button" @click="generateQRCode"
          value="GÉNÉRER"
          :disabled="!formIsValid">
      </div>
      <div v-if="generatedQR" class="action-btn">
        <img :src="generatedQR">
        <span>{{ QRData[0] }}</span>
      </div>
    </div>
    <a @click="generatePdfCall">Ouvrir le pdf</a>
    <a hidden ref="dw" :href='url' target="_self"></a>
  </div>
</template>

<script>
// eslint-disable-next-line import/named
import pdfBase from '@/assets/certificate.pdf';
import generatePdf from '../mixins/pdf-utils';
import generateQR from '../mixins/util';

export default {
  name: 'Form',
  data() {
    return {
      formIsValid: false,
      generatingPDF: false,
      url: '',
      generatedQR: null,
      QRData: null,
      name: 'attestation.pdf',
      birthday: '',
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
  props: {
    msg: String,
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
      const temp = formInfo.birthday.split('/');
      this.birthday = `${temp[2]}-${temp[1]}-${temp[0]}`;
      this.formIsValid = this.validateForm();
    }
  },
  watch: {
    birthday(nVal) {
      const temp = nVal.split('-');
      this.data.birthday = `${temp[2]}/${temp[1]}/${temp[0]}`;
    },
    data: {
      deep: true,
      handler() {
        this.formIsValid = this.validateForm();
      },
    },
  },
  methods: {
    async generateQRCode() {
      const creationInstant = new Date();
      const creationDate = creationInstant.toLocaleDateString('fr-FR');
      const creationHour = creationInstant
        .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
      this.data.datesortie = creationDate;
      this.data.heuresortie = creationHour;
      this.setToLocalStorage();
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
    async generatePdfCall() {
      this.generatingPDF = true;
      const data = await generatePdf(this.data, this.motif, pdfBase, this.generatedQR, this.QRData);
      this.url = window.URL.createObjectURL(data);
      this.generatingPDF = false;
      this.$refs.dw.click();
    },
    setToLocalStorage() {
      localStorage.setItem('attestationInfo', JSON.stringify(this.data));
    },
    getFromLocalStorage() {
      return JSON.parse(localStorage.getItem('attestationInfo'));
    },
    validateForm() {
      let isValid = true;
      const copyForm = { ...this.data };
      delete copyForm.datesortie;
      delete copyForm.heuresortie;
      const f = Object.values(copyForm);
      isValid = !f.includes('');
      return isValid;
    },
  },
};
</script>

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
label {
  text-align: left;
  font-size: 0.8em;
  opacity: 0.6;
  margin-left: 6px;
  letter-spacing: 0.1em;
}

.motif-section {
  margin-top: 12px;
}

.action-btn {
  display: flex;
  justify-content: center;
}

.generate-btn {
  padding: 24px;
  width: 100%;
  background-color: #00be56;
  color: #FFFFFF;
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

.generating-message {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.emoji-me {
  font-size: 3em;
}
/**
 * CUSTOM FORM STYLE
 * from : https://www.sanwebe.com/2014/08/css-html-forms-designs
 */
.form-style-8{
  font-family: 'Open Sans Condensed', arial, sans;
  width: 100%;
  /* padding: 30px; */
  background: #FFFFFF;
  /* margin: 12px auto; */
  /* box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -webkit-box-shadow:  0px 0px 15px rgba(0, 0, 0, 0.22); */
}

.form-style-8 h2{
  background: #4D4D4D;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed', sans-serif;
  color: #797979;
  font-size: 18px;
  font-weight: 100;
  padding: 20px;
  margin: -30px -30px 30px -30px;
}

.form-style-8 input[type="text"],
.form-style-8 input[type="date"],
.form-style-8 input[type="datetime"],
.form-style-8 input[type="email"],
.form-style-8 input[type="number"],
.form-style-8 input[type="search"],
.form-style-8 input[type="time"],
.form-style-8 input[type="url"],
.form-style-8 input[type="password"],
.form-style-8 textarea,
.form-style-8 select
{
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  display: block;
  width: 100%;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  margin-bottom: 10px;
  font: 1em Arial, Helvetica, sans-serif;
  /* height: 45px; */
}

.form-style-8 textarea{
  resize:none;
  overflow: hidden;
}

.form-style-8 input[type="button"],
.form-style-8 input[type="submit"]{
  -moz-box-shadow: inset 0px 1px 0px 0px #45D6D6;
  -webkit-box-shadow: inset 0px 1px 0px 0px #45D6D6;
  box-shadow: inset 0px 1px 0px 0px #45D6D6;
  background-color: #2CBBBB;
  border: 1px solid #27A0A0;
  display: inline-block;
  cursor: pointer;
  color: #00be56;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 14px;
  padding: 8px 18px;
  text-decoration: none;
  text-transform: uppercase;
}

.form-style-8 input[type="button"]:hover,
.form-style-8 input[type="submit"]:hover {
  background:linear-gradient(to bottom, #34CACA 5%, #30C9C9 100%);
  background-color:#34CACA;
}
</style>

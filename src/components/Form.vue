<template>
  <div>
    <div class="form-style-8">
      <input type="text" v-model="data.firstname" name="firstname" placeholder="Prenom" />
      <input type="text" v-model="data.lastname" name="lastname" placeholder="Nom de famille" />
      <input
        type="date"
        v-model="birthday"
        name="birthday"
        placeholder="Date de naissance"/>
      <input
        type="text"
        v-model="data.placeofbirth"
        name="placeofbirth"
        placeholder="Lieu de naissance" />
      <input type="text" v-model="data.address" name="address" placeholder="Adresse" />
      <input type="number" v-model="data.zipcode" name="zipcode" placeholder="Code postal" />
      <input type="text" v-model="data.city" name="city" placeholder="Ville" />
      <div class="motif-section">
        <label for="motif">Motif</label>
        <select name="motif" id="motif" v-model="motif">
          <option v-for="i in motifList" :key="i" :value="i">{{ i }}</option>
        </select>
      </div>
    </div>

    <input class="generate-btn" type="button" @click="generatePdfCall" value="GENERATE">
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
    const formInfo = this.getFromLocalStorage();
    if (formInfo !== null) {
      this.data = formInfo;
      const temp = formInfo.birthday.split('/');
      this.birthday = `${temp[2]}-${temp[1]}-${temp[0]}`;
    }
  },
  watch: {
    birthday(nVal) {
      const temp = nVal.split('-');
      this.data.birthday = `${temp[2]}/${temp[1]}/${temp[0]}`;
    },
  },
  methods: {
    async generatePdfCall() {
      this.setToLocalStorage();
      const now = new Date();
      const month = (`0${(now.getMonth() + 1).toString()}`).slice(-2);
      const minutes = (`0${now.getMinutes().toString()}`).slice(-2);
      this.data.datesortie = `${now.getDate()}/${month}/${now.getFullYear()}`;
      this.data.heuresortie = `${`${now.getHours()}`}:${minutes}`;
      const date = (now).toISOString();
      this.name = `attestation_${date}.pdf`;
      const data = await generatePdf(this.data, this.motif, pdfBase);
      this.url = window.URL.createObjectURL(data);
      setTimeout(() => { this.$refs.dw.click(); }, 1000);
    },
    setToLocalStorage() {
      localStorage.setItem('attestationInfo', JSON.stringify(this.data));
    },
    getFromLocalStorage() {
      return JSON.parse(localStorage.getItem('attestationInfo'));
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
label {
  text-align: left;
}

.motif-section {
  margin-top: 12px;
}

.generate-btn {
  padding: 12px;
  background-color: #00be56;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
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
  font: 16px Arial, Helvetica, sans-serif;
  height: 45px;
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

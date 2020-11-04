export default {
  methods: {
    setToLocalStorage(form, storageName = 'attestationInfo') {
      localStorage.setItem(storageName, JSON.stringify(form));
    },
    getFromLocalStorage(storageName = 'attestationInfo') {
      return JSON.parse(localStorage.getItem(storageName));
    },
    validateForm(userForm) {
      let isValid = true;
      const copyForm = { ...userForm };
      delete copyForm.datesortie;
      delete copyForm.heuresortie;
      const f = Object.values(copyForm);
      isValid = !f.includes('');
      return isValid;
    },
  },
};

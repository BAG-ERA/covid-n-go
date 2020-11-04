import Vue from 'vue';
import VueRouter from 'vue-router';
import Profile from '../views/Profile.vue';
import Generate from '../views/Generate.vue';
import MyAttestation from '../views/MyAttestation.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/generate',
    name: 'Generate',
    component: Generate,
  },
  {
    path: '/attestation',
    name: 'Attestation',
    component: MyAttestation,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

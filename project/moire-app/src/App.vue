<template>
  <appHeader></appHeader>

  <router-view></router-view>

  <appFooter></appFooter>
</template>
<script>
import appHeader from '@/components/appHeader.vue';
import appFooter from '@/components/appFooter.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: {
    appHeader, appFooter,
  },
  methods: {
    ...mapActions(['loadBasket']),
    ...mapMutations(['updateUserAccessKey']),
  },
  created() {
    const userAccesKey = localStorage.getItem('userAccessKey');
    if (userAccesKey) {
      this.updateUserAccessKey(userAccesKey);
    }
    this.loadBasket();
  },

};
</script>

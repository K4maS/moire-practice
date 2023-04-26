<template>
  <appHeader></appHeader>

  <router-view></router-view>

  <appFooter></appFooter>
</template>
<script>
import { mapActions } from 'vuex';
import appHeader from '@/components/appHeader.vue';
import appFooter from '@/components/appFooter.vue';

export default {
  components: {
    appHeader, appFooter,
  },
  methods: {
    ...mapActions(['loadProducts']),
  },
  created() {
    this.loadProducts();
  },

};
</script>

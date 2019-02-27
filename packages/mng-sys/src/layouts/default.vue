<template>
  <div id="app">
    <Sidebar/>
    <div class="main-panel" data="red">
      <Navbar/>
      <!-- <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </div>-->
      <div class="content">
        <router-view/>
      </div>
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
@Component({
  components: {
    Sidebar,
    Navbar,
    Footer
  }
})
export default class Default extends Vue {
  public name: string = 'defaultLayout';
}
</script>


<style lang="scss" scoped>
</style>

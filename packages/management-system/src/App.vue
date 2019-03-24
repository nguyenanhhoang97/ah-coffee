<template>
  <div>
    <template v-if="$route.meta.requiresAuth">
      <div class="white-content" v-bind:class="{ 'sidebar-mini': getSidebarStyle }" v-loading="getGlobalStatus">
        <div class="wrapper">
          <nav-mini/>
          <app-sidebar/>
          <div class="main-panel" data="blue">
            <app-header/>
            <search-box/>
            <div class="content">
              <transition>
                <keep-alive>
                  <router-view/>
                </keep-alive>
              </transition>
            </div>
            <app-footer/>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="white-content">
        <div class="wrapper">
          <transition>
            <keep-alive>
              <router-view/>
            </keep-alive>
          </transition>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';

import {
  NavMini,
  AppSidebar,
  AppHeader,
  SearchBox,
  AppFooter
} from '@/components';
import '@/assets/scss/style.scss';

@Component({
  components: {
    NavMini,
    AppSidebar,
    AppHeader,
    AppFooter,
    SearchBox
  },

  computed: {
    ...mapGetters('global', ['getSidebarStyle', 'getGlobalStatus'])
  }
})
export default class App extends Vue {}
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

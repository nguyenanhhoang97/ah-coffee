<template>
  <div>
    <div class="navbar-minimize-fixed" style="opacity: 1;">
      <button class="minimize-sidebar btn btn-link btn-just-icon">
        <i class="fas fa-align-center visible-on-sidebar-regular text-muted"></i>
        <i class="fas fa-align-justify visible-on-sidebar-mini text-muted"></i>
      </button>
    </div>
    <div class="sidebar" data="red">
      <!--
        Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red"
      -->
      <div class="sidebar-wrapper">
        <div class="logo">
          <a href="javascript:void(0)" class="simple-text logo-mini">AH</a>
          <a href="javascript:void(0)" class="simple-text logo-normal">Coffee</a>
        </div>
        <ul class="nav">
          <li v-for="tab in menu" :key="tab.route" class="nav-item">
            <router-link :to="{ name: tab.route }" v-if="!tab.isParent" active-class="active">
              <i :class="tab.icon"></i>
              <p>{{ tab.name }}</p>
            </router-link>
            <a
              data-toggle="collapse"
              href="#"
              v-if="tab.isParent"
              v-bind:aria-expanded="tab.expand1"
              active-class="active"
              @click="handleSubMenu(tab)"
            >
              <i :class="tab.icon"></i>
              <p>
                {{ tab.name }}
                <b class="caret"></b>
              </p>
            </a>
            <div class="collapse" v-bind:class="{ show: tab.expand2 }" id="pagesExamples">
              <ul class="nav" v-if="tab.isParent">
                <li v-for="child in tab.childs" :key="child.route">
                  <a :href="{ name: child.route }">
                    <span class="sidebar-mini-icon">{{ child.name }}</span>
                    <span class="sidebar-normal">{{ child.name }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({
  data() {
    return {
      expand1: false,
      expand2: false,
      menu: [
        {
          icon: 'fas fa-tachometer-alt',
          name: this.$t('dashboard'),
          route: 'dashboard',
          index: '1'
        },
        {
          icon: 'fas fa-file',
          name: this.$t('page'),
          isParent: true,
          route: 'page',
          expand1: false,
          expand2: false,
          index: '2',
          childs: [
            {
              name: this.$t('pricing'),
              route: 'pricing',
              index: '2-1'
            },
            {
              name: this.$t('timeline'),
              route: 'timeline',
              index: '2-2'
            }
          ]
        },
        {
          icon: 'fas fa-th-large',
          name: this.$t('components'),
          isParent: true,
          route: 'components',
          expand1: false,
          expand2: false,
          index: '3',
          childs: [
            {
              name: this.$t('buttons'),
              route: 'buttons',
              index: '3-1'
            },
            {
              name: this.$t('pannels'),
              route: 'pannels',
              index: '3-2'
            }
          ]
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleSubMenu(tab) {
      tab.expand1 = !tab.expand1;
      tab.expand2 = !tab.expand2;
    }
  }
})
export default class Sidebar extends Vue {}
</script>

<style lang="scss">
</style>


<template>
  <div>
    <div class="navbar-minimize-fixed">
      <button class="minimize-sidebar btn btn-link btn-just-icon">
        <i class="tim-icons icon-align-center visible-on-sidebar-regular text-muted"></i>
        <i class="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted"></i>
      </button>
    </div>
    <div class="sidebar" data="blue">
      <!--
        Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red"
      -->
      <div class="sidebar-wrapper">
        <div class="logo">
          <a href="javascript:void(0)" class="simple-text logo-mini">AH</a>
          <a href="javascript:void(0)" class="simple-text logo-normal">CoffeeShop</a>
        </div>
        <ul class="nav">
          <li v-for="tab in menus" :key="tab.route" class="nav-item">
            <a :href="{ name: tab.route }" v-if="!tab.isParent" active-class="active">
              <i :class="tab.icon"></i>
              <p>{{ tab.name }}</p>
            </a>
            <a
              data-toggle="collapse"
              :href="{ name: tab.route }"
              v-if="tab.isParent"
              aria-expanded="true"
              active-class="active"
            >
              <i :class="tab.icon"></i>
              <p>
                {{ tab.name }}
                <b class="caret"></b>
              </p>
            </a>
            <div class="collapse show" id="pagesExamples">
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
  computed: {
    menus() {
      return [
        {
          icon: 'fas fa-tachometer-alt',
          name: this.$t('dashboard'),
          route: 'dashboard'
        },
        {
          icon: 'fas fa-file',
          name: this.$t('page'),
          isParent: true,
          route: 'contact.create',
          childs: [
            {
              name: this.$t('pricing'),
              route: 'contact.create'
            },
            {
              name: this.$t('timeline'),
              route: 'contact.list'
            }
          ]
        }
      ];
    }
  }
})
export default class Sidebar extends Vue {}
</script>

<style>
</style>

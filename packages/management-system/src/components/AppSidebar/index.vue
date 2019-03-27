<template>
  <div class="sidebar" data="blue">
    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="javascript:void(0)" class="simple-text logo-mini">AH</a>
        <a href="javascript:void(0)" class="simple-text logo-normal">Coffee</a>
      </div>
      <ul class="nav">
        <li class v-for="tab in menus" :key="tab.route">
          <router-link :to="tab.route" class="nav-link" active-class="active">
            <i :class="tab.icon"/>
            <p>{{ tab.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppSidebar extends Vue {
  public menus: any = [
    {
      icon: 'tim-icons icon-chart-pie-36',
      name: 'Dashboard',
      route: '/'
    },
    {
      icon: 'tim-icons icon-puzzle-10',
      name: 'OrderBoard',
      route: '/orderboard'
    },
    {
      icon: 'tim-icons icon-app',
      name: 'Manage Category',
      route: '/category'
    },
    {
      icon: 'tim-icons icon-atom',
      name: 'Manage Product',
      route: '/product'
    },
    {
      icon: 'tim-icons icon-notes',
      name: 'Manage Bill',
      route: '/bill'
    },
    {
      icon: 'tim-icons icon-single-02',
      name: 'Manage Customer',
      route: '/customer'
    },
    {
      icon: 'tim-icons icon-single-02',
      name: 'Manage Employee',
      route: '/employee'
    },
    // {
    //   icon: 'tim-icons icon-money-coins',
    //   name: 'Manage Revenues',
    //   route: 'revenues'
    // }
  ];
}
</script>


<style lang="scss" scoped>
.sidebar {
  .sidebar-wrapper {
    overflow-x: hidden;
  }
}
</style>

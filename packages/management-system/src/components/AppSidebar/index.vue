<template>
  <div class="sidebar" data="blue">
    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="javascript:void(0)" class="simple-text logo-mini">AH</a>
        <a href="javascript:void(0)" class="simple-text logo-normal">Coffee</a>
      </div>
      <ul class="nav" v-if="menus">
        <li class v-for="tab in menus" :key="tab.route">
          <router-link :to="tab.route" class="nav-link" active-class="active" v-show="tab.roles">
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
import { mapState, mapGetters, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('session', ['role'])
  }
})
export default class AppSidebar extends Vue {
  public menus: any = [
    {
      icon: 'tim-icons icon-chart-pie-36',
      name: 'Dashboard',
      route: '/',
      roles: ['admin', 'manager', 'salesperson'].indexOf(this.$store.state.session.role) > -1
    },
    {
      icon: 'tim-icons icon-puzzle-10',
      name: 'OrderBoard',
      route: '/orderboard',
      roles: ['admin', 'manager', 'salesperson'].indexOf(this.$store.state.session.role) > -1
    },
    {
      icon: 'tim-icons icon-app',
      name: 'Manage Category',
      route: '/category',
      roles: ['admin', 'manager'].indexOf(this.$store.state.session.role) > -1
    },
    {
      icon: 'tim-icons icon-atom',
      name: 'Manage Product',
      route: '/product',
      roles: ['admin', 'manager'].indexOf(this.$store.state.session.role) > -1
    },
    {
      icon: 'tim-icons icon-notes',
      name: 'Manage Bill',
      route: '/bill',
      roles: ['admin', 'manager'].indexOf(this.$store.state.session.role) > -1
    },
    {
      icon: 'tim-icons icon-notes',
      name: 'My Bill',
      route: '/my-bill',
      roles: ['admin', 'manager', 'salesperson'].indexOf(this.$store.state.session.role) > -1
    },
    {
      icon: 'tim-icons icon-single-02',
      name: 'Manage Customer',
      route: '/customer',
      roles: ['manager', 'salesperson'].indexOf(this.$store.state.session.role) > -1
    },
    {
      icon: 'tim-icons icon-single-02',
      name: 'Manage Salesperson',
      route: '/salesperson',
      roles: ['manager'].indexOf(this.$store.state.session.role) > -1
    },
    {
      icon: 'tim-icons icon-single-02',
      name: 'Manage User',
      route: '/user',
      roles: ['admin'].indexOf(this.$store.state.session.role) > -1
    }
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

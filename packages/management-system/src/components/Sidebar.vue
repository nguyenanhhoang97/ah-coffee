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
          <a href="javascript:void(0)" class="simple-text logo-normal">Coffee</a>
        </div>
        <ul class="nav">
          <el-menu
            class="nav"
            background-color="transparent"
            active-text-color="white"
            text-color="#DADADA"
          >
            <div v-for="tab in menus" :key="tab.route">
              <el-menu-item v-if="!tab.isParent" :index="tab.index">
                <div class="custom-nav-item">
                  <i :class="tab.icon"></i>
                  <p>{{ tab.name }}</p>
                </div>
              </el-menu-item>
              <el-submenu v-if="tab.isParent" :index="tab.index">
                <template slot="title" class="nav-item">
                  <div class="custom-nav-item">
                    <i :class="tab.icon"></i>
                    <p>{{ tab.name }}</p>
                    <b class="caret"></b>
                  </div>
                </template>
                <div v-for="child in tab.childs" :key="child.route">
                  <el-menu-item :index="tab.index">
                    <span>{{ child.name }}</span>
                  </el-menu-item>
                </div>
              </el-submenu>
            </div>
          </el-menu>
          <!-- <li v-for="tab in menus" :key="tab.route" class="nav-item">
            <router-link :to="{ name: tab.route }" v-if="!tab.isParent" active-class="active">
              <i :class="tab.icon"></i>
              <p>{{ tab.name }}</p>
            </router-link>
            <a
              data-toggle="collapse"
              href="#"
              v-if="tab.isParent"
              v-bind:aria-expanded=" tab.expand1? 'true' : 'false' "
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
          </li>-->
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
          route: 'dashboard',
          index: '1'
        },
        {
          icon: 'fas fa-file',
          name: this.$t('page'),
          isParent: true,
          route: 'contact.create',
          // expand1: false,
          // expand2: 'collapse',
          // expand2: false,
          index: '2',
          childs: [
            {
              name: this.$t('pricing'),
              route: 'contact.create',
              index: '2-1'
            },
            {
              name: this.$t('timeline'),
              route: 'contact.list',
              index: '2-2'
            }
          ]
        }
      ];
    }
  },
  methods: {
    handleSubMenu(tab) {
      // if (tab.expand1 === false) {
      //   tab.expand1 = true;
      // } else {
      //   tab.expand1 = false;
      // }
      // if (tab.expand2 === 'collapse') {
      //   tab.expand2 = 'collapse show';
      // } else {
      //   tab.expand2 = 'collapse';
      // }
      tab.expand1 = !tab.expand1;
      tab.expand2 = !tab.expand2;
      // console.log(tab);
    }
  }
})
export default class Sidebar extends Vue {}
</script>

<style lang="scss">
.el-submenu__icon-arrow {
  display: none;
}
.caret {
  top: 1.8rem !important;
}
.custom-nav-item {
  padding-top: 0.7rem;
}
</style>


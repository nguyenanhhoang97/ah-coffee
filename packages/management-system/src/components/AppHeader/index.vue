<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent">
      <div class="container-fluid">
        <div class="navbar-wrapper">
          <div class="navbar-minimize d-inline">
            <button
              class="minimize-sidebar btn btn-link btn-just-icon"
              rel="tooltip"
              data-original-title="Sidebar toggle"
              data-placement="right"
              @click="handleChangeSidebarStyle"
            >
              <i class="tim-icons icon-align-center visible-on-sidebar-regular"></i>
              <i class="tim-icons icon-bullet-list-67 visible-on-sidebar-mini"></i>
            </button>
          </div>
          <div class="navbar-toggle d-inline">
            <button type="button" class="navbar-toggler">
              <span class="navbar-toggler-bar bar1"></span>
              <span class="navbar-toggler-bar bar2"></span>
              <span class="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <span class="navbar-brand" href="javascript:void(0)">{{ $route.meta.title }}</span>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
        <div id="navigation" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="dropdown nav-item">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <div class="photo">
                    <img :src="avatar" alt="Profile Photo">
                  </div>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleProfile">{{ $t('button.profile') }}</el-dropdown-item>
                  <el-dropdown-item @click.native="handleLogOutDialog">{{ $t('button.logout') }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li class="separator d-lg-none"></li>
          </ul>
        </div>
      </div>
    </nav>
    <el-dialog
      :title="$t('label.logoutTitle')"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseLogOutDialog"
    >
      <span>{{ $t('message.logout_message') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleLogOut">{{ $t('button.logout') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';
import { SERVER_URL } from '@/core/constants';

@Component({
  computed: {
    ...mapGetters('global', ['getSidebarStyle']),
    ...mapGetters('session', ['isAuthenticated'])
  },

  methods: {
    ...mapActions('session', ['logout']),
    ...mapActions('global', ['setNavBarStyle']),
    ...mapActions('profile', ['currentUser'])
  },

  data() {
    return {
      dialogVisible: false,
      avatar: '',
      serverUrl: SERVER_URL
    };
  }
})
export default class AppHeader extends Vue {
  public logout!: any;
  public setNavBarStyle!: any;
  public getSidebarStyle!: any;

  public currentUser!: () => Promise<any>;

  public mounted() {
    this.initCurrentProfile();
  }

  public async initCurrentProfile() {
    try {
      await this.currentUser().then((res: any) => {
        const avt = this.$data.serverUrl + '/' + res.user.avatar;
        this.$data.avatar = avt;
      });
    } catch (e) {
      throw e;
    }
  }

  public handleChangeSidebarStyle() {
    this.setNavBarStyle(!this.getSidebarStyle);
  }

  public handleProfile() {
    this.$router.push('profile');
  }

  public handleLogOut() {
    try {
      this.logout();
    } catch (e) {
      throw e;
    }
  }

  public handleLogOutDialog() {
    this.$data.dialogVisible = true;
  }

  public handleCloseLogOutDialog(done: any) {
    this.$data.dialogVisible = false;
  }
}
</script>

<style lang="scss">
#ddown-right__BV_toggle_ {
  height: auto;
}
</style>


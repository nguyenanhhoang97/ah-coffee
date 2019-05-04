<template>
  <div class="wrapper wrapper-full-page">
    <div class="full-page login-page">
      <!--   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " -->
      <div class="content">
        <div class="container">
          <div class="col-lg-4 col-md-6 ml-auto mr-auto">
            <form class="form">
              <div class="card card-login card-white">
                <div class="card-header">
                  <img src="~@/assets/images/cards/card-info.png" alt>
                  <h1 class="card-title">Login</h1>
                </div>
                <div class="card-body">
                  <div class="input-group">
                    <el-input
                      placeholder="Username"
                      prefix-icon="tim-icons icon-email-85"
                      popper-class="form-control"
                      size="medium"
                      v-model="formData[formIds.username]"
                    ></el-input>
                  </div>
                  <div class="input-group">
                    <el-input
                      placeholder="Password"
                      prefix-icon="tim-icons icon-lock-circle"
                      popper-class="form-control"
                      size="medium"
                      show-password
                      v-model="formData[formIds.password]"
                    ></el-input>
                  </div>
                </div>
                <div class="card-footer">
                  <el-button
                    class="btn btn-info btn-lg btn-block mb-3"
                    @click.prevent="handleLogin"
                  >{{ $t('button.login') }}</el-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';
import { LoginForm } from './store/types';

@Component({
  methods: {
    ...mapActions('session', ['login'])
  }
})
export default class Login extends Vue {
  public loading: boolean = false;
  public formData: LoginForm = { username: '', password: '' };
  public formIds: any = {
    username: 'username',
    password: 'password'
  };
  public errorMsg: string = '';
  public login!: (data: LoginForm) => Promise<any>;

  public async handleLogin() {
    if (this.loading) {
      return;
    }
    try {
      this.loading = true;
      await this.login(this.formData).then((message: any) => {
        if (message === 'invalid_username') {
          const error: any = this.$i18n.t('message.invalid_username');
          this.$message.error(error);
        } else if (message === 'invalid_password') {
          const error: any = this.$i18n.t('message.invalid_password');
          this.$message.error(error);
        } else if (message === 'invalid_role') {
          const error: any = this.$i18n.t('message.invalid_role');
          this.$message.error(error);
        }
      });
    } catch (e) {
      throw e;
    }
    this.loading = false;
  }
}
</script>


<style lang="scss" scoped>
</style>

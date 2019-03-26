<template>
  <div class="col-lg-12">
    <div class="card" v-loading="getLoading">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.yourProfile') }}</h4>
      </div>
      <div class="card-body">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$t('label.updateYourProfile')" name="updateProfile">
            <el-form
              ref="form"
              :model="form"
              label-width="200px"
              label-position="left"
              :rules="rules"
            >
              <el-form-item :label="$t('label.username')" prop="username">{{ form.username }}</el-form-item>
              <el-form-item :label="$t('label.role')" prop="role">
                <el-tag v-if="form.role === 'admin'">Administrator</el-tag>
                <el-tag v-if="form.role === 'manager'">Manager</el-tag>
                <el-tag v-if="form.role === 'salesperson'">Salesperson</el-tag>
              </el-form-item>
              <el-form-item :label="$t('label.status')" prop="status">
                <el-tag type="danger" v-if="form.status === 0">Deactive</el-tag>
                <el-tag type="success" v-if="form.status === 1">Active</el-tag>
              </el-form-item>
              <el-form-item :label="$t('label.fullname')" prop="fullname">
                <el-input v-model="form.fullname"></el-input>
              </el-form-item>
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item :label="$t('label.address')" prop="address">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item :label="$t('label.phoneNumber')" prop="phone_number">
                <el-input v-model="form.phone_number"></el-input>
              </el-form-item>
              <el-form-item :label="$t('label.avatar')">
                <input
                  type="file"
                  name="import_file"
                  accept="image/*"
                  @change="selectedFile($event)"
                >
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSaveUpdateProfile">{{$t('button.save')}}</el-button>
                <el-button @click="handleCancel">{{$t('button.cancel')}}</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="$t('label.changePass')" name="changePass">
            <el-form
              ref="changePassForm"
              :model="changePassForm"
              label-width="200px"
              label-position="left"
              :rules="changePassRules"
            >
              <el-form-item :label="$t('label.oldPass')" prop="oldPass">
                <el-input type="password" v-model="changePassForm.oldPass"></el-input>
              </el-form-item>
              <el-form-item :label="$t('label.newPassword')" prop="newPassword">
                <el-input type="password" v-model="changePassForm.newPassword"></el-input>
              </el-form-item>
              <el-form-item :label="$t('label.repeatNewPass')" prop="repeatNewPass">
                <el-input type="password" v-model="changePassForm.repeatNewPass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSaveChangePass">{{$t('button.save')}}</el-button>
                <el-button @click="handleCancel">{{$t('button.cancel')}}</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState, mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapState('profile', ['profile']),
    ...mapGetters('profile', ['getProfile', 'getLoading'])
  },

  methods: {
    ...mapActions('profile', ['currentUser', 'updateProfile', 'changePassword'])
  },

  data() {
    return {
      activeName: 'updateProfile',
      form: {},
      changePassForm: {},
      rules: {
        fullname: [
          {
            required: true,
            message: this.$i18n.t('message.fullnameValid'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: this.$i18n.t('message.emailValid'),
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: this.$i18n.t('message.addressValid'),
            trigger: 'blur'
          }
        ],
        phone_number: [
          {
            required: true,
            message: this.$i18n.t('message.phoneNumberValid'),
            trigger: 'blur'
          }
        ]
      },
      changePassRules: {
        oldPass: [
          {
            required: true,
            message: this.$i18n.t('message.fullnameValid'),
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: this.$i18n.t('message.emailValid'),
            trigger: 'blur'
          }
        ],
        repeatNewPass: [
          {
            required: true,
            message: this.$i18n.t('message.addressValid'),
            trigger: 'blur'
          }
        ]
      }
    };
  },

  watch: {
    // call again the method if the route changes
    // tslint:disable-next-line
    $route: 'initCurrentProfile'
  }
})
export default class Profile extends Vue {
  public currentUser!: () => Promise<any>;
  public updateProfile!: (data: any) => Promise<any>;
  public changePassword!: (data: any) => Promise<any>;

  public mounted() {
    this.initCurrentProfile();
  }

  public async initCurrentProfile() {
    try {
      await this.currentUser().then((res: any) => {
        this.$data.form = { ...res.user };
      });
    } catch (e) {
      throw e;
    }
  }

  public handleClick(tab: any, event: any) {
    return;
  }

  public selectedFile(event: any) {
    const fileInp = event.target.files[0];
    this.$data.form.file = fileInp;
  }

  public handleCancel() {
    this.$data.form = {};
    this.$router.push('/');
  }

  public handleSaveUpdateProfile(form: any) {
    const formRef: any = this.$refs.form;
    formRef.validate(async (valid: any) => {
      if (valid) {
        const params = {
          fullname: this.$data.form.fullname,
          email: this.$data.form.email,
          address: this.$data.form.address,
          phoneNumber: this.$data.form.phone_number,
          file: this.$data.form.file,
          oldPath: this.$data.form.avatar
        };
        try {
          await this.updateProfile(params).then((message: any) => {
            if (message === 'updated_user_info') {
              const resMess: any = this.$i18n.t(
                'message.updateProfileSuccessMsg'
              );
              this.$message.success(resMess);
            } else if (message === 'forbidden') {
              const error: any = this.$i18n.t('message.forbidden');
              this.$message.error(error);
            } else if (message === 'req_body_check_failed') {
              const error: any = this.$i18n.t('message.req_body_check_failed');
              this.$message.error(error);
            }
          });
        } catch (e) {
          throw e;
        }
      } else {
        return false;
      }
    });
  }

  public handleSaveChangePass(form: any) {
    const formRef: any = this.$refs.changePassForm;
    formRef.validate(async (valid: any) => {
      if (valid) {
        const params = {
          oldpsw: this.$data.changePassForm.oldPass,
          psw: this.$data.changePassForm.newPassword
        };
        try {
          await this.changePassword(params).then((message: any) => {
            if (message === 'updated_password') {
              const resMess: any = this.$i18n.t(
                'message.updatePasswordSuccessMsg'
              );
              this.$message.success(resMess);
            } else if (message === 'incorrect_password') {
              const resMess: any = this.$i18n.t(
                'message.incorrectOldPass'
              );
              this.$message.error(resMess);
            } else if (message === 'forbidden') {
              const error: any = this.$i18n.t('message.forbidden');
              this.$message.error(error);
            } else if (message === 'req_body_check_failed') {
              const error: any = this.$i18n.t('message.req_body_check_failed');
              this.$message.error(error);
            }
          });
        } catch (e) {
          throw e;
        }
      } else {
        return false;
      }
    });
  }
}
</script>

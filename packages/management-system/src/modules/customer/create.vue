<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.newCus') }}</h4>
      </div>
      <div class="card-body">
        <el-form ref="form" :model="form" label-width="200px" label-position="left" :rules="rules">
          <el-form-item :label="$t('label.email')" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.username')" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.password')" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.fullname')" prop="fullname">
            <el-input v-model="form.fullname"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.address')" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.phoneNumber')" prop="phoneNumber">
            <el-input v-model="form.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveUser('form')">{{$t('button.save')}}</el-button>
            <el-button @click="handleCancel">{{$t('button.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions('customer', ['createCustomer', 'customerList'])
  },

  computed: {
    ...mapGetters('customer', ['getCustomers', 'getLoading'])
  },

  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        fullname: '',
        address: '',
        phoneNumber: ''
      },
      rules: {
        fullname: [
          {
            required: true,
            message: this.$i18n.t('message.fullnameValid'),
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: this.$i18n.t('message.usernameValid'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$i18n.t('message.pswValid'),
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
        phoneNumber: [
          {
            required: true,
            message: this.$i18n.t('message.phoneNumberValid'),
            trigger: 'blur'
          }
        ]
      }
    };
  }
})
export default class CreateCustomer extends Vue {
  public createCustomer!: (data: any) => Promise<any>;
  public customerList!: (data: any) => Promise<any>;

  public selectedFile(event: any) {
    const fileInp = event.target.files[0];
    this.$data.form.file = fileInp;
  }

  public handleSaveUser(form: any) {
    const formRef: any = this.$refs.form;
    formRef.validate(async (valid: any) => {
      if (valid) {
        const params = { ...this.$data.form };
        try {
          await this.createCustomer(params).then((message: any) => {
            if (message === 'saved') {
              const parameters = {
                pageIndex: 0,
                pageSize: 10
              };
              this.customerList(parameters);
              const resMess: any = this.$i18n.t('message.createdUsrNoti');
              this.$message.success(resMess);
              this.$data.form = {};
              this.$router.push('/customer');
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

  public handleCancel() {
    this.$data.form = {};
    this.$router.push('/customer');
  }
}
</script>

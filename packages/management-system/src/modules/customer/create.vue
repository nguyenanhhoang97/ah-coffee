<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.newCate') }}</h4>
      </div>
      <div class="card-body">
        <el-form ref="form" :model="form" label-width="200px" label-position="left" :rules="rules">
          <el-form-item :label="$t('label.cateName')" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.introduction')" prop="introduction">
            <el-input type="textarea" v-model="form.introduction"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.uploadImage')" prop="file">
            <input type="file" name="import_file" accept="image/*" @change="selectedFile($event)">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveCategory('form')">{{$t('button.save')}}</el-button>
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
    ...mapActions('category', ['createCategory', 'categoryList'])
  },

  computed: {
    ...mapGetters('category', ['getCategories', 'getLoading'])
  },

  data() {
    return {
      form: {
        name: '',
        introduction: '',
        file: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$i18n.t('message.cateNameValid'),
            trigger: 'blur'
          }
        ],
        introduction: [
          {
            required: true,
            message: this.$i18n.t('message.introductionValid'),
            trigger: 'blur'
          }
        ],
        file: [
          {
            required: true,
            message: this.$i18n.t('message.fileValid'),
            trigger: 'blur'
          }
        ]
      }
    };
  }
})
export default class CreateCustomer extends Vue {
  public createCategory!: (data: any) => Promise<any>;
  public categoryList!: (data: any) => Promise<any>;

  public selectedFile(event: any) {
    const fileInp = event.target.files[0];
    this.$data.form.file = fileInp;
  }

  public handleSaveCategory(form: any) {
    const formRef: any = this.$refs.form;
    formRef.validate(async (valid: any) => {
      if (valid) {
        const params = { ...this.$data.form };
        try {
          await this.createCategory(params).then((message: any) => {
            if (message === 'saved') {
              const parameters = {
                pageIndex: 0,
                pageSize: 10
              };
              this.categoryList(parameters);
              const resMess: any = this.$i18n.t('message.cate_save_message');
              this.$message.success(resMess);
              this.$data.form = {};
              this.$router.push('/category');
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
    this.$router.push('/category');
  }
}
</script>

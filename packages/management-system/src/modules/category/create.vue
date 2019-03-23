<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.newCate') }}</h4>
      </div>
      <div class="card-body">
        <el-form ref="form" :model="form" label-width="200px" label-position="left">
          <el-form-item :label="$t('label.cateName')">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.introduction')">
            <el-input type="textarea" v-model="form.introduction"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.uploadImage')">
            <input type="file" name="import_file" accept="image/*" @change="selectedFile($event)">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveCategory">Create</el-button>
            <el-button @click="handleCancel">Cancel</el-button>
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
    ...mapActions('category', ['createCategory'])
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
      }
    };
  }
})
export default class CreateCategory extends Vue {
  public createCategory!: (data: any) => Promise<any>;

  public selectedFile(event: any) {
    const fileInp = event.target.files[0];
    this.$data.form.file = fileInp;
  }

  public async handleSaveCategory() {
    const params = { ...this.$data.form };
    try {
      await this.createCategory(params).then((message: any) => {
        if (message === 'saved') {
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
  }

  public handleCancel() {
    this.$data.form = {};
    this.$router.push('/category');
  }
}
</script>

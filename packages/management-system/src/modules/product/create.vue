<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.newProduct') }}</h4>
      </div>
      <div class="card-body">
        <el-form ref="form" :model="form" label-width="200px" label-position="left" :rules="rules">
          <el-form-item :label="$t('label.productName')" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.category')" v-if="categories" prop="category">
            <el-select v-model="form.category" placeholder="Select">
              <el-option
                v-for="item in categories.category"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('label.introduction')" prop="introduction">
            <el-input type="textarea" v-model="form.introduction"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.price')" prop="price">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.uploadImages')" prop="file">
            <input type="file" name="import_file" accept="image/*" multiple @change="selectedFile($event)">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveProduct('form')">{{$t('button.save')}}</el-button>
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
    ...mapActions('product', ['createProduct', 'productList']),
    ...mapActions('category', ['categoryList'])
  },

  computed: {
    ...mapGetters('product', ['getProducts', 'getLoading']),
    ...mapState('category', ['categories'])
  },

  data() {
    return {
      form: {
        name: '',
        category: '',
        introduction: '',
        price: '',
        file: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$i18n.t('message.productNameValid'),
            trigger: 'blur'
          }
        ],
        category: [
          {
            required: true,
            message: this.$i18n.t('message.cateSelValid'),
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: this.$i18n.t('message.priceValid'),
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
export default class CreateProduct extends Vue {
  public createProduct!: (data: any) => Promise<any>;
  public categoryList!: (data: any) => Promise<any>;
  public productList!: (data: any) => Promise<any>;

  public mounted() {
    this.initCategoryList();
  }

  public async initCategoryList() {
    const parameters = {
      pageIndex: 0,
      pageSize: 0
    };
    await this.categoryList(parameters);
  }

  public selectedFile(event: any) {
    const fileInp = event.target.files;
    this.$data.form.file = fileInp;
  }

  public handleSaveProduct(form: any) {
    const formRef: any = this.$refs.form;
    formRef.validate(async (valid: any) => {
      if (valid) {
        const params = { ...this.$data.form };
        try {
          await this.createProduct(params).then((message: any) => {
            if (message === 'saved') {
              const parameters = {
                pageIndex: 0,
                pageSize: 10
              };
              this.productList(parameters);
              const resMess: any = this.$i18n.t('message.productSavemessage');
              this.$message.success(resMess);
              this.$data.form = {};
              this.$router.push('/product');
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
    this.$router.push('/product');
  }
}
</script>

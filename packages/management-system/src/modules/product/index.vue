<template>
  <div class="col-lg-12">
    <div class="card" v-loading="getLoading">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.manageProduct') }}</h4>
      </div>
      <div class="card-body">
        <el-row>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="handleCreateProduct"
          >{{ $t('button.newProduct') }}</el-button>
        </el-row>
        <el-table :data="getProducts.product" style="width: 100%" v-if="getProducts">
          <el-table-column :label="$t('label.numericalOrder')" width="50" type="index"></el-table-column>
          <el-table-column :label="$t('label.productName')" prop="name" sortable></el-table-column>
          <el-table-column :label="$t('label.category')" prop="category_id.name" sortable></el-table-column>
          <el-table-column :label="$t('label.price')" prop="price" sortable></el-table-column>
          <el-table-column :label="$t('label.status')" sortable>
            <template slot-scope="scope">
              <div class="cell" v-if="scope.row.status === 0">
                <el-tag type="info">{{$t('tag.notAvailable')}}</el-tag>
              </div>
              <div class="cell" v-else>
                <el-tag type="success">{{$t('tag.available')}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right" width="300">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" :placeholder="$t('placeholder.search')"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="medium"
                icon="el-icon-view"
                @click="handleViewDetail(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="medium"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="medium"
                type="primary"
                icon="el-icon-setting"
                @click="handleChangeProductStatus(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="medium"
                type="danger"
                icon="el-icon-delete"
                @click="handleDeleteProduct(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          layout="total, sizes, prev, pager, next"
          :total="getProducts.total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :title="$t('label.productDetails')" :visible.sync="detailDialogVisible">
      <el-form label-width="200px" class="productDetails" label-position="left" v-if="selectedItem">
        <el-form-item :label="$t('label.productName')">{{ selectedItem.name }}</el-form-item>
        <el-form-item :label="$t('label.category')">{{ selectedItemCateName }}</el-form-item>
        <el-form-item :label="$t('label.introduction')">{{ selectedItem.introduction }}</el-form-item>
        <el-form-item :label="$t('label.price')">{{ selectedItem.price }}</el-form-item>
        <el-form-item :label="$t('label.status')">
          <el-tag type="info" v-if="selectedItem.status === 0">{{$t('tag.notAvailable')}}</el-tag>
          <el-tag type="success" v-else>{{$t('tag.available')}}</el-tag>
        </el-form-item>
        <el-form-item :label="$t('label.images')">
          <el-carousel height="250px">
            <el-carousel-item v-for="item in selectedItemImg" :key="item._id">
              <img :src="serverUrl+'/'+item.path">
            </el-carousel-item>
          </el-carousel>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailDialogVisible = false">{{$t('button.close')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('label.updateProduct')" :visible.sync="editDialogFormVisible">
      <el-form :model="selectedItem" label-position="left">
        <el-form-item :label="$t('label.productName')" :label-width="formLabelWidth">
          <el-input v-model="selectedItem.name"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('label.category')"
          v-if="categories"
          prop="category"
          :label-width="formLabelWidth"
        >
          <el-select v-model="selectedItem.categoryId" placeholder="Select">
            <el-option
              v-for="item in categories.category"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('label.introduction')"
          prop="introduction"
          :label-width="formLabelWidth"
        >
          <el-input type="textarea" v-model="selectedItem.introduction"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.price')" prop="price" :label-width="formLabelWidth">
          <el-input v-model="selectedItem.price"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.uploadImages')" :label-width="formLabelWidth">
          <input
            type="file"
            name="import_file"
            accept="image/*"
            multiple
            @change="selectedFile($event)"
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="handleSaveUpdateProduct">{{ $t('button.save') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('label.changeProductStatus')" :visible.sync="chStatusDialogFormVisible">
      <el-form :model="selectedItem" label-position="left">
        <el-form-item
          :label="$t('label.productStatus')"
          :label-width="formLabelWidth"
          v-if="statusList"
        >
          <el-select v-model="selectedItem.status" placeholder="Select">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chStatusDialogFormVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="handleSaveChangeStatus">{{ $t('button.save') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('label.delProduct')" :visible.sync="delDialogFormVisible" width="30%">
      <span>{{$t('message.del_message')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogFormVisible = false">{{$t('button.cancel')}}</el-button>
        <el-button type="danger" @click="handleDelCate">{{$t('button.delete')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';
import { SERVER_URL } from '@/core/constants';

@Component({
  methods: {
    ...mapActions('global', ['setGlobalReady']),
    ...mapActions('product', [
      'productList',
      'changeProductStatus',
      'deleteCate',
      'updateProduct'
    ]),
    ...mapActions('category', ['categoryList'])
  },

  computed: {
    ...mapGetters('product', ['getProducts', 'getLoading']),
    ...mapState('product', ['statusList']),
    ...mapState('category', ['categories'])
  },

  data() {
    return {
      search: '',
      pageIndex: 1,
      pageSize: 10,
      detailDialogVisible: false,
      editDialogFormVisible: false,
      chStatusDialogFormVisible: false,
      delDialogFormVisible: false,
      formLabelWidth: '200px',
      selectedItem: {},
      selectedItemCateName: '',
      selectedItemImg: [],
      serverUrl: SERVER_URL,
      file: undefined
    };
  },

  watch: {
    // call again the method if the route changes
    // tslint:disable-next-line
    $route: 'initProductList'
  }
})
export default class Product extends Vue {
  public loading: boolean = false;
  public tableData: any[] = [];

  public productList!: (data: any) => Promise<any>;
  public changeProductStatus!: (data: any) => Promise<any>;
  public deleteCate!: (data: any) => Promise<any>;
  public categoryList!: (data: any) => Promise<any>;
  public updateProduct!: (data: any) => Promise<any>;

  public mounted() {
    this.initProductList();
  }

  public async initProductList() {
    if (this.loading) {
      return;
    }
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.productList(parameters);
  }

  public selectedFile(event: any) {
    const fileInp = event.target.files;
    this.$data.file = fileInp;
  }

  public handleSizeChange(val: any) {
    this.$data.pageSize = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.productList(parameters);
  }

  public handleCurrentChange(val: any) {
    this.$data.pageIndex = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.productList(parameters);
  }

  public handleCreateProduct() {
    this.$router.push('product/create');
  }

  public async handleEdit(index: any, row: any) {
    this.$data.selectedItem = { ...row, categoryId: row.category_id._id };
    const parameters = {
      pageIndex: 0,
      pageSize: 0
    };
    await this.categoryList(parameters);
    this.$data.editDialogFormVisible = true;
  }

  public async handleSaveUpdateProduct() {
    const params = {
      productId: this.$data.selectedItem.id,
      name: this.$data.selectedItem.name,
      categoryId: this.$data.selectedItem.categoryId,
      price: this.$data.selectedItem.price,
      introduction: this.$data.selectedItem.introduction,
      file: this.$data.file
    };
    try {
      await this.updateProduct(params).then((message: any) => {
        if (message === 'updated_product_info') {
          const parameters = {
            pageIndex: 0,
            pageSize: 10
          };
          this.productList(parameters);
          const resMess: any = this.$i18n.t(
            'message.updateProductSuccessMessage'
          );
          this.$message.success(resMess);
          this.$data.form = {};
          this.$data.file = undefined;
          this.$data.editDialogFormVisible = false;
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

  public handleChangeProductStatus(index: any, row: any) {
    this.$data.selectedItem = { ...row };
    this.$data.chStatusDialogFormVisible = true;
  }

  public async handleSaveChangeStatus() {
    const params = {
      productId: this.$data.selectedItem.id,
      productStatus: this.$data.selectedItem.status
    };
    try {
      await this.changeProductStatus(params).then((message: any) => {
        if (message === 'updated_product_status') {
          const parameters = {
            pageIndex: this.$data.pageIndex - 1,
            pageSize: this.$data.pageSize
          };
          this.productList(parameters);
          const resMess: any = this.$i18n.t(
            'message.updateProductStSuccessMessage'
          );
          this.$message.success(resMess);
          this.$data.form = {};
          this.$data.chStatusDialogFormVisible = false;
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

  public handleDeleteProduct(index: any, row: any) {
    this.$data.selectedItem = { ...row };
    this.$data.delDialogFormVisible = true;
  }

  public async handleDelCate() {
    const params = {
      productId: this.$data.selectedItem.id,
      productStatus: 2
    };
    try {
      await this.changeProductStatus(params).then((message: any) => {
        if (message === 'updated_product_status') {
          const parameters = {
            pageIndex: 0,
            pageSize: 10
          };
          this.productList(parameters);
          const resMess: any = this.$i18n.t('message.delProductSuccessMessage');
          this.$message.success(resMess);
          this.$data.form = {};
          this.$data.delDialogFormVisible = false;
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

  public handleViewDetail(index: any, row: any) {
    this.$data.detailDialogVisible = true;
    this.$data.selectedItem = { ...row };
    this.$data.selectedItemCateName = this.$data.selectedItem.category_id.name;
    this.$data.selectedItemImg = this.$data.selectedItem.product_imgs;
  }
}
</script>

<template>
  <div class="col-lg-12">
    <div class="card" v-loading="getLoading">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.manageCategory') }}</h4>
      </div>
      <div class="card-body">
        <el-row>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="handleCreateCategory"
          >{{ $t('button.newCate') }}</el-button>
        </el-row>
        <el-table :data="getCategories.category" style="width: 100%">
          <el-table-column :label="$t('label.numericalOrder')" width="50" type="index"></el-table-column>
          <el-table-column :label="$t('label.cateName')" prop="name" sortable></el-table-column>
          <el-table-column :label="$t('label.introduction')" prop="introduction" sortable></el-table-column>
          <el-table-column :label="$t('label.image')" width="200">
            <template slot-scope="scope">
              <img
                :src="serverUrl+'/'+scope.row.img_path"
                :alt="scope.row.name"
                style="height: 65px"
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.status')" sortable width="150">
            <template slot-scope="scope">
              <div class="cell" v-if="scope.row.status === 0">
                <el-tag type="warning">{{$t('tag.pending')}}</el-tag>
              </div>
              <div class="cell" v-else>
                <el-tag type="success">{{$t('tag.available')}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right" width="250">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" :placeholder="$t('placeholder.search')"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="medium"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="medium"
                type="primary"
                icon="el-icon-setting"
                v-show="role == 'admin'"
                @click="handleChangeCateStatus(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="medium"
                type="danger"
                icon="el-icon-delete"
                v-show="role == 'admin'"
                @click="handleDeleteCate(scope.$index, scope.row)"
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
          :total="getCategories.total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :title="$t('label.updateCate')" :visible.sync="editDialogFormVisible">
      <el-form :model="selectedItem" label-width="200px" label-position="left">
        <el-form-item :label="$t('label.cateName')" :label-width="formLabelWidth">
          <el-input v-model="selectedItem.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.introduction')" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="selectedItem.introduction"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.uploadImage')" :label-width="formLabelWidth">
          <input type="file" name="import_file" accept="image/*" @change="selectedFile($event)">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="handleSaveUpdateCate">{{ $t('button.save') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('label.changeCateStatus')" :visible.sync="chStatusDialogFormVisible">
      <el-form :model="selectedItem" label-width="200px" label-position="left">
        <el-form-item
          :label="$t('label.cateStatus')"
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
        <el-button type="primary" @click="handleSaveChangeCateStatus">{{ $t('button.save') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('label.delCate')" :visible.sync="delDialogFormVisible" width="30%">
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
    ...mapActions('category', ['categoryList', 'updateCategory', 'changeCateStatus', 'deleteCate'])
  },

  computed: {
    ...mapGetters('category', ['getCategories', 'getLoading']),
    ...mapState('category', ['statusList']),
    ...mapState('session', ['role'])
  },

  data() {
    return {
      search: '',
      pageIndex: 1,
      pageSize: 10,
      editDialogFormVisible: false,
      chStatusDialogFormVisible: false,
      delDialogFormVisible: false,
      formLabelWidth: '200px',
      selectedItem: {},
      serverUrl: SERVER_URL,
      file: undefined
    };
  },

  watch: {
    // call again the method if the route changes
    // tslint:disable-next-line
    '$route': 'initCategoryList'
  },
})
export default class Category extends Vue {
  public categoryList!: (data: any) => Promise<any>;
  public updateCategory!: (data: any) => Promise<any>;
  public changeCateStatus!: (data: any) => Promise<any>;
  public deleteCate!: (data: any) => Promise<any>;

  public mounted() {
    this.initCategoryList();
  }

  public async initCategoryList() {
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    await this.categoryList(parameters);
  }

  public handleSizeChange(val: any) {
    this.$data.pageSize = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.categoryList(parameters);
  }

  public handleCurrentChange(val: any) {
    this.$data.pageIndex = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.categoryList(parameters);
  }

  public handleCreateCategory() {
    this.$router.push('category/create');
  }

  public handleEdit(index: any, row: any) {
    this.$data.editDialogFormVisible = true;
    this.$data.selectedItem = { ...row };
  }

  public handleChangeCateStatus(index: any, row: any) {
    this.$data.chStatusDialogFormVisible = true;
    this.$data.selectedItem = { ...row };
  }

  public handleDeleteCate(index: any, row: any) {
    this.$data.delDialogFormVisible = true;
    this.$data.selectedItem = { ...row };
  }

  public selectedFile(event: any) {
    const fileInp = event.target.files[0];
    this.$data.file = fileInp;
  }

  public async handleSaveUpdateCate() {
    const params = {
      categoryId: this.$data.selectedItem.id,
      name: this.$data.selectedItem.name,
      introduction: this.$data.selectedItem.introduction,
      file: this.$data.file,
      oldPath: this.$data.selectedItem.img_path
    };
    try {
      await this.updateCategory(params).then((message: any) => {
        if (message === 'updated_category_info') {
          const parameters = {
            pageIndex: 0,
            pageSize: 10
          };
          this.categoryList(parameters);
          const resMess: any = this.$i18n.t('message.updateCateSuccessMessage');
          this.$message.success(resMess);
          this.$data.form = {};
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

  public async handleSaveChangeCateStatus() {
    const params = {
      categoryId: this.$data.selectedItem.id,
      cateStatus: this.$data.selectedItem.status
    };
    try {
      await this.changeCateStatus(params).then((message: any) => {
        if (message === 'updated_category_status') {
          const parameters = {
            pageIndex: 0,
            pageSize: 10
          };
          this.categoryList(parameters);
          const resMess: any = this.$i18n.t('message.updateCateStSuccessMessage');
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

  public async handleDelCate() {
    const params = {
      categoryId: this.$data.selectedItem.id,
      cateStatus: 2
    };
    try {
      await this.changeCateStatus(params).then((message: any) => {
        if (message === 'updated_category_status') {
          const parameters = {
            pageIndex: 0,
            pageSize: 10
          };
          this.categoryList(parameters);
          const resMess: any = this.$i18n.t('message.delCateSuccessMessage');
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
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>


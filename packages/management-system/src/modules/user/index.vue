<template>
  <div class="col-lg-12">
    <div class="card" v-loading="getLoading">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.mngCus') }}</h4>
      </div>
      <div class="card-body">
        <el-row>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="handleCreateCustomer"
          >{{ $t('button.newCus') }}</el-button>
        </el-row>
        <el-table :data="getUsers.user" style="width: 100%">
          <el-table-column :label="$t('label.numericalOrder')" width="50" type="index"></el-table-column>
          <el-table-column :label="$t('label.email')" prop="email" sortable></el-table-column>
          <el-table-column :label="$t('label.username')" prop="username" sortable></el-table-column>
          <el-table-column :label="$t('label.role')" prop="role" sortable></el-table-column>
          <el-table-column :label="$t('label.fullname')" prop="fullname" sortable></el-table-column>
          <el-table-column :label="$t('label.address')" prop="address" sortable></el-table-column>
          <el-table-column :label="$t('label.phoneNumber')" prop="phone_number" sortable></el-table-column>
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
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          layout="total, sizes, prev, pager, next"
          :total="getUsers.total"
        ></el-pagination>
      </div>
    </div>
    <!-- <el-dialog :title="$t('label.updateCate')" :visible.sync="editDialogFormVisible">
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
    </el-dialog> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';
import { SERVER_URL } from '@/core/constants';

@Component({
  methods: {
    ...mapActions('user', ['userList', 'updateUser'])
  },

  computed: {
    ...mapGetters('user', ['getUsers', 'getLoading'])
  },

  data() {
    return {
      search: '',
      pageIndex: 1,
      pageSize: 10,
      editDialogFormVisible: false,
      formLabelWidth: '200px',
      selectedItem: {},
      serverUrl: SERVER_URL,
      file: undefined
    };
  },

  watch: {
    // call again the method if the route changes
    // tslint:disable-next-line
    $route: 'initUserList'
  }
})
export default class Category extends Vue {
  public userList!: (data: any) => Promise<any>;
  public updateUser!: (data: any) => Promise<any>;

  public mounted() {
    this.initUserList();
  }

  public async initUserList() {
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    await this.userList(parameters);
  }

  public handleSizeChange(val: any) {
    this.$data.pageSize = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.userList(parameters);
  }

  public handleCurrentChange(val: any) {
    this.$data.pageIndex = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.userList(parameters);
  }

  public handleCreateCustomer() {
    this.$router.push('customer/create');
  }

  public handleEdit(index: any, row: any) {
    this.$data.editDialogFormVisible = true;
    this.$data.selectedItem = { ...row };
  }

  public selectedFile(event: any) {
    const fileInp = event.target.files[0];
    this.$data.file = fileInp;
  }

  // public async handleSaveUpdateCustomer() {
  //   const params = {
  //     categoryId: this.$data.selectedItem.id,
  //     name: this.$data.selectedItem.name,
  //     introduction: this.$data.selectedItem.introduction,
  //     file: this.$data.file,
  //     oldPath: this.$data.selectedItem.img_path
  //   };
  //   try {
  //     await this.updateCategory(params).then((message: any) => {
  //       if (message === 'updated_category_info') {
  //         const parameters = {
  //           pageIndex: 0,
  //           pageSize: 10
  //         };
  //         this.categoryList(parameters);
  //         const resMess: any = this.$i18n.t('message.updateCateSuccessMessage');
  //         this.$message.success(resMess);
  //         this.$data.form = {};
  //         this.$data.editDialogFormVisible = false;
  //       } else if (message === 'forbidden') {
  //         const error: any = this.$i18n.t('message.forbidden');
  //         this.$message.error(error);
  //       } else if (message === 'req_body_check_failed') {
  //         const error: any = this.$i18n.t('message.req_body_check_failed');
  //         this.$message.error(error);
  //       }
  //     });
  //   } catch (e) {
  //     throw e;
  //   }
  // }
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


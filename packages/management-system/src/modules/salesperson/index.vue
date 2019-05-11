<template>
  <div class="col-lg-12">
    <div class="card" v-loading="getLoading">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.mngSales') }}</h4>
      </div>
      <div class="card-body">
        <el-table :data="getSalesperson.user" style="width: 100%">
          <el-table-column :label="$t('label.numericalOrder')" width="50" type="index"></el-table-column>
          <el-table-column :label="$t('label.email')" prop="email" sortable></el-table-column>
          <el-table-column :label="$t('label.username')" prop="username" sortable></el-table-column>
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
          :total="getSalesperson.total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :title="$t('label.updateUser')" :visible.sync="editDialogFormVisible">
      <el-form :model="selectedItem" label-width="200px" label-position="left">
        <el-form-item :label="$t('label.fullname')" :label-width="formLabelWidth">
          <el-input v-model="selectedItem.fullname"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.email')" :label-width="formLabelWidth">
          <el-input v-model="selectedItem.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.address')" :label-width="formLabelWidth">
          <el-input v-model="selectedItem.address"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.phoneNumber')" :label-width="formLabelWidth">
          <el-input v-model="selectedItem.phone_number"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.role')" :label-width="formLabelWidth" v-if="roles">
          <el-select v-model="selectedItem.role" placeholder="Select">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="handleSaveUpdateUser">{{ $t('button.save') }}</el-button>
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
    ...mapActions('salesperson', ['salespersonList', 'updateSalesperson'])
  },

  computed: {
    ...mapGetters('salesperson', ['getSalesperson', 'getLoading']),
    ...mapState('salesperson', ['roles'])
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
    $route: 'initSalesPersonList'
  }
})
export default class Salesperson extends Vue {
  public salespersonList!: (data: any) => Promise<any>;
  public updateSalesperson!: (data: any) => Promise<any>;

  public mounted() {
    this.initSalesPersonList();
  }

  public async initSalesPersonList() {
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    await this.salespersonList(parameters);
  }

  public handleSizeChange(val: any) {
    this.$data.pageSize = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.salespersonList(parameters);
  }

  public handleCurrentChange(val: any) {
    this.$data.pageIndex = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.salespersonList(parameters);
  }

  public handleCreateSalesPerson() {
    this.$router.push('salesperson/create');
  }

  public handleEdit(index: any, row: any) {
    this.$data.editDialogFormVisible = true;
    this.$data.selectedItem = { ...row };
  }

  public selectedFile(event: any) {
    const fileInp = event.target.files[0];
    this.$data.file = fileInp;
  }

  public async handleSaveUpdateUser() {
    const params = {
      usrId: this.$data.selectedItem.id,
      email: this.$data.selectedItem.email,
      username: this.$data.selectedItem.username,
      fullname: this.$data.selectedItem.fullname,
      address: this.$data.selectedItem.address,
      phoneNumber: this.$data.selectedItem.phone_number,
      usrRole: this.$data.selectedItem.role
    };
    try {
      await this.updateSalesperson(params).then((message: any) => {
        if (message === 'adm_updated_user_info') {
          const parameters = {
            pageIndex: 0,
            pageSize: 10
          };
          this.salespersonList(parameters);
          const resMess: any = this.$i18n.t('message.updateUserSuccessMessage');
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


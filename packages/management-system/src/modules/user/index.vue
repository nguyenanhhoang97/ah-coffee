<template>
  <div class="col-lg-12">
    <div class="card" v-loading="getLoading">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.mngUser') }}</h4>
      </div>
      <div class="card-body">
        <el-row>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="handleCreateUser"
          >{{ $t('button.newUser') }}</el-button>
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
              <el-tooltip class="item" effect="dark" content="Update User Info" placement="top">
                <el-button
                  size="medium"
                  icon="el-icon-edit"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="dark" content="Reset User Password" placement="top">
                <el-button
                  size="medium"
                  icon="el-icon-refresh"
                  type="danger"
                  @click="handleRsPsw(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip> -->
              <el-tooltip class="item" effect="dark" content="Remove User" placement="top">
                <el-button
                  size="medium"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
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
    <!-- <el-dialog :title="$t('label.warning')" :visible.sync="rsPswDialogVisible" width="30%">
      <span>{{ $t('message.admRsPswNoti') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rsPswDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="rsPswDialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="New Password"
      :visible.sync="newPswdialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>New Password of This Account: {{ newPsw }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newPswdialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSaveRsPsw">Confirm</el-button>
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
    ...mapGetters('user', ['getUsers', 'getLoading']),
    ...mapState('user', ['roles', 'newPsw'])
  },

  data() {
    return {
      search: '',
      pageIndex: 1,
      pageSize: 10,
      editDialogFormVisible: false,
      rsPswDialogVisible: false,
      newPswdialogVisible: false,
      formLabelWidth: '200px',
      selectedItem: {},
      serverUrl: SERVER_URL
    };
  },

  watch: {
    // call again the method if the route changes
    // tslint:disable-next-line
    $route: 'initUserList'
  }
})
export default class User extends Vue {
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

  public handleCreateUser() {
    this.$router.push('user/create');
  }

  public handleEdit(index: any, row: any) {
    this.$data.editDialogFormVisible = true;
    this.$data.selectedItem = { ...row };
  }

  public handleRsPsw(index: any, row: any) {
    this.$data.rsPswDialogVisible = true;
    this.$data.selectedItem = { ...row };
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
      await this.updateUser(params).then((message: any) => {
        if (message === 'adm_updated_user_info') {
          const parameters = {
            pageIndex: 0,
            pageSize: 10
          };
          this.userList(parameters);
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

  // public async handleSaveRsPsw() {
  //   const params = {
  //     usrId: this.$data.selectedItem.id
  //   };
  //   try {
  //     await this.updateUser(params).then((new_password: any) => {
  //       this.$data.rsPswDialogVisible = true;
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


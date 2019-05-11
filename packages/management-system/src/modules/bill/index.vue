<template>
  <div class="col-lg-12">
    <div class="card" v-loading="getLoading">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.mngBill') }}</h4>
      </div>
      <div class="card-body">
        <el-table :data="getBills.bill" style="width: 100%" v-if="getBills">
          <el-table-column :label="$t('label.numericalOrder')" width="50" type="index"></el-table-column>
          <el-table-column :label="$t('label.customerName')" prop="customer_id.fullname" sortable></el-table-column>
          <el-table-column :label="$t('label.staffName')" prop="salesperson_id.fullname" sortable></el-table-column>
          <el-table-column :label="$t('label.totalPrice')" prop="total_price" sortable></el-table-column>
          <el-table-column :label="$t('label.createdAt')" prop="created_date" sortable></el-table-column>
          <el-table-column :label="$t('label.paymentMethod')" sortable>
            <template slot-scope="scope">
              <div class="cell" v-if="scope.row.payment_method === 0">
                <el-tag type="info">{{$t('tag.cash')}}</el-tag>
              </div>
              <div class="cell" v-else>
                <el-tag type="success">{{$t('tag.cc')}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.ccRC')" sortable>
            <template slot-scope="scope">
              <div class="cell" v-if="scope.row.cc_receipt_code === ''">
                <b>N/A</b>
              </div>
              <div class="cell" v-else>
                <b>{{ scope.row.cc_receipt_code }}</b>
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
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          layout="total, sizes, prev, pager, next"
          :total="getBills.total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :title="$t('label.billDetails')" :visible.sync="detailDialogVisible">
      <el-form label-width="200px" class="billDetails" label-position="left" v-if="selectedItem">
        <el-form-item :label="$t('label.customerName')" v-if="selectedItem.customer_id">{{ selectedItem.customer_id.fullname }}</el-form-item>
        <el-form-item :label="$t('label.staffName')" v-if="selectedItem.salesperson_id">{{ selectedItem.salesperson_id.fullname }}</el-form-item>
        <el-form-item :label="$t('label.totalPrice')">$ {{ selectedItem.total_price }}</el-form-item>
        <el-form-item :label="$t('label.paymentMethod')">
          <el-tag type="info" v-if="selectedItem.payment_method === 0">{{$t('tag.cash')}}</el-tag>
          <el-tag type="success" v-else>{{$t('tag.cc')}}</el-tag>
        </el-form-item>
        <el-form-item :label="$t('label.ccRC')">
          <b v-if="selectedItem.cc_receipt_code === ''">N/A</b>
          <b v-else>{{ selectedItem.cc_receipt_code }}</b>
        </el-form-item>
        <el-table :data="selectedItem.items" style="width: 100%" v-if="selectedItem.items">
          <el-table-column :label="$t('label.numericalOrder')" width="50" type="index"></el-table-column>
          <el-table-column :label="$t('label.productName')" prop="product_name" sortable></el-table-column>
          <el-table-column :label="$t('label.quantity')" prop="quantity" sortable></el-table-column>
          <el-table-column :label="$t('label.price')" prop="unit_price" sortable></el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailDialogVisible = false">{{$t('button.close')}}</el-button>
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
    ...mapActions('bill', [
      'billList'
    ])
  },

  computed: {
    ...mapGetters('bill', ['getBills', 'getLoading'])
  },

  data() {
    return {
      search: '',
      pageIndex: 1,
      pageSize: 10,
      detailDialogVisible: false,
      formLabelWidth: '200px',
      selectedItem: {},
      serverUrl: SERVER_URL,
    };
  },

  watch: {
    // call again the method if the route changes
    // tslint:disable-next-line
    $route: 'initBillList'
  }
})
export default class Product extends Vue {
  public loading: boolean = false;
  public tableData: any[] = [];

  public billList!: (data: any) => Promise<any>;

  public mounted() {
    this.initBillList();
  }

  public async initBillList() {
    if (this.loading) {
      return;
    }
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.billList(parameters);
  }

  public handleSizeChange(val: any) {
    this.$data.pageSize = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.billList(parameters);
  }

  public handleCurrentChange(val: any) {
    this.$data.pageIndex = val;
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.billList(parameters);
  }

  public handleViewDetail(index: any, row: any) {
    this.$data.detailDialogVisible = true;
    this.$data.selectedItem = { ...row };
  }
}
</script>

<template>
  <div class="row">
    <div class="col-lg-7">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{ $t('label.orderBoard') }}</h4>
        </div>
        <div class="card-body">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="_id" :label="$t('label.productId')"></el-table-column>
            <el-table-column prop="name" :label="$t('label.productName')"></el-table-column>
            <el-table-column prop="quantity" :label="$t('label.quantity')"></el-table-column>
            <el-table-column prop="unitPrice" :label="$t('label.unitPrice')"></el-table-column>
            <el-table-column prop="price" :label="$t('label.totalPrice')"></el-table-column>
            <el-table-column :label="$t('label.action')" width="250">
              <template slot-scope="scope">
                <el-button size="medium" icon="el-icon-plus" @click="plusOrderBoardItem(scope.row)"></el-button>
                <el-button
                  size="medium"
                  icon="el-icon-minus"
                  @click="minusOrderBoardItem(scope.row)"
                ></el-button>
                <el-button
                  size="medium"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeOrderBoardItem(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <h4>Total: $ {{ ttPrice }}</h4>
          <el-button
            type="primary"
            v-if="ttPrice > 0"
            @click="dialogCheckOut = true"
          >{{ $t('button.checkout') }}</el-button>
        </div>
      </div>
    </div>
    <div class="col-lg-5" v-loading="getLoading">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{ $t('label.productList') }}</h4>
        </div>
        <div class="card-body" v-if="cateLst">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item
              v-for="item in cateLst"
              :key="item._id"
              :value="item._id"
              :title="item.name"
              :name="item.name"
            >
              <el-row v-if="item.products">
                <el-col
                  :span="8"
                  v-for="product in item.products"
                  :key="product._id"
                  style="margin-top: 1rem"
                >
                  <el-card :body-style="{ padding: '0px' }">
                    <div style="padding: 14px;">
                      <h4>
                        <b>{{ product.name }}</b>
                      </h4>
                      <span>{{ $t('label.price') }}: {{ product.price }}</span>
                      <div class="bottom clearfix">
                        <el-button
                          type="text"
                          class="button"
                          @click="handleSelectProduct(product)"
                        >{{ $t('label.addToOrderBoard') }}</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>

    <el-dialog :title="$t('label.billInfo')" :visible.sync="dialogCheckOut">
      <el-form :model="form">
        <el-form-item :label="$t('label.customerId')" label-width="180px">
          <el-input
            v-model="customerId"
            autocomplete="off"
            :placeholder="$t('placeholder.customerIdOrderBoard')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.paymentMethod')" label-width="180px">
          <el-select v-model="selectedPaymentMethod" placeholder="Select">
            <el-option
              v-for="item in paymentMethod"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('label.ccRC')"
          label-width="180px"
          v-if="selectedPaymentMethod == 1"
        >
          <el-input v-model="ccRC" autocomplete="off" :placeholder="$t('placeholder.ccRC')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCheckOut = false">Cancel</el-button>
        <el-button type="primary" @click="handleSaveBill">{{ $t('button.save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions('global', ['setGlobalReady']),
    ...mapActions('category', ['categoryList']),
    ...mapActions('orderBoard', ['createBill'])
  },

  computed: {
    ...mapState('category', ['categories']),
    ...mapState('orderBoard', ['paymentMethod']),
    ...mapGetters('category', ['getLoading'])
  },

  data() {
    return {
      activeName: '',
      cateLst: {},
      tableData: [],
      ttPrice: 0,
      form: {},
      dialogCheckOut: false,
      selectedPaymentMethod: '',
      ccRC: '',
      customerId: ''
    };
  },

  watch: {
    // call again the method if the route changes
    // tslint:disable-next-line
    $route: 'initCateList'
  }
})
export default class OrderBoard extends Vue {
  public categoryList!: (data: any) => Promise<any>;
  public productList!: (data: any) => Promise<any>;
  public createBill!: (data: any) => Promise<any>;

  public mounted() {
    this.initCateList();
  }

  public async initCateList() {
    try {
      const parameters = {
        pageIndex: 0,
        pageSize: 0
      };
      await this.categoryList(parameters).then((res: any) => {
        const { category } = res;
        this.$data.cateLst = category;
        this.$data.activeName = category[0].name;
      });
    } catch (e) {
      throw e;
    }
  }

  public async handleSaveBill() {
    try {
      const {
        customerId,
        ccRC,
        tableData: productList,
        ttPrice: totalPrice,
        selectedPaymentMethod: paymentMethod
      } = this.$data;
      const params = {productList, customerId, totalPrice, paymentMethod, ccRC };
      await this.createBill(params).then((res: any) => {
        console.log(res);
      })
    } catch (e) {
      throw e;
    }
  }

  public handleSelectProduct(product: any) {
    if (this.$data.tableData.length === 0) {
      const pItm = {
        _id: product._id,
        name: product.name,
        quantity: 1,
        unitPrice: product.price,
        price: product.price
      };
      this.$data.tableData.push(pItm);
      this.$data.ttPrice = product.price;
    } else {
      // tslint:disable-next-line
      let pList = this.$data.tableData;
      let check = false;
      // tslint:disable-next-line
      for (let i = 0; i < pList.length; i++) {
        if (pList[i]._id === product._id) {
          pList[i].quantity++;
          pList[i].price = pList[i].unitPrice * pList[i].quantity;
          check = true;
          break;
        }
      }
      if (check === false) {
        const pItm = {
          _id: product._id,
          name: product.name,
          quantity: 1,
          unitPrice: product.price,
          price: product.price
        };
        this.$data.tableData.push(pItm);
      }
      let tempTotal = 0;
      pList.forEach((element: any) => {
        tempTotal = tempTotal + element.price;
      });
      this.$data.ttPrice = tempTotal;
    }
  }

  public removeOrderBoardItem(product: any) {
    const newPList = this.$data.tableData.filter(
      (element: any) => element._id.toString() !== product._id.toString()
    );
    this.$data.tableData = newPList;
    const pList = this.$data.tableData;
    let tempTotal = 0;
    pList.forEach((element: any) => {
      tempTotal = tempTotal + element.price;
    });
    this.$data.ttPrice = tempTotal;
  }

  public plusOrderBoardItem(product: any) {
    // tslint:disable-next-line
    let pList = this.$data.tableData;
    // tslint:disable-next-line
    for (let i = 0; i < pList.length; i++) {
      if (pList[i]._id === product._id) {
        pList[i].quantity++;
        pList[i].price = pList[i].unitPrice * pList[i].quantity;
        break;
      }
    }
    let tempTotal = 0;
    pList.forEach((element: any) => {
      tempTotal = tempTotal + element.price;
    });
    this.$data.ttPrice = tempTotal;
  }

  public minusOrderBoardItem(product: any) {
    // tslint:disable-next-line
    let pList = this.$data.tableData;
    // tslint:disable-next-line
    for (let i = 0; i < pList.length; i++) {
      if (pList[i]._id === product._id) {
        if (pList[i].quantity === 1) {
          const newPList = this.$data.tableData.filter(
            (element: any) => element._id.toString() !== product._id.toString()
          );
          this.$data.tableData = newPList;
        } else {
          pList[i].quantity--;
          pList[i].price = pList[i].unitPrice * pList[i].quantity;
          break;
        }
      }
    }
    pList = this.$data.tableData;
    let tempTotal = 0;
    pList.forEach((element: any) => {
      tempTotal = tempTotal + element.price;
    });
    this.$data.ttPrice = tempTotal;
  }
}
</script>

<style lang="scss" scoped>
</style>

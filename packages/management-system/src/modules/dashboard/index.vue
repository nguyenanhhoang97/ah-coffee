<template>
  <layout main-css="dashboard">
    <div class="dashboard">
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="card card-stats">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="info-icon text-center icon-warning">
                    <i class="tim-icons icon-atom"></i>
                  </div>
                </div>
                <div class="col-7">
                  <div class="numbers">
                    <p class="card-category">{{ $t('label.products') }}</p>
                    <h3 class="card-title">{{ getStatistics.totalProduct }}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <!-- <hr>
              <div class="stats">
                <i class="tim-icons icon-refresh-01"></i>Update Now
              </div>-->
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card card-stats">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="info-icon text-center icon-primary">
                    <i class="tim-icons icon-notes"></i>
                  </div>
                </div>
                <div class="col-7">
                  <div class="numbers">
                    <p class="card-category">{{ $t('label.bills') }}</p>
                    <h3 class="card-title">{{ getStatistics.totalBill }}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <!-- <hr>
              <div class="stats">
                <i class="tim-icons icon-sound-wave"></i>Last Research
              </div>-->
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card card-stats">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="info-icon text-center icon-success">
                    <i class="tim-icons icon-single-02"></i>
                  </div>
                </div>
                <div class="col-7">
                  <div class="numbers">
                    <p class="card-category">{{ $t('label.users') }}</p>
                    <h3 class="card-title">{{ getStatistics.totalUser }}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <!-- <hr>
              <div class="stats">
                <i class="tim-icons icon-trophy"></i>Customers feedback
              </div>-->
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card card-stats">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="info-icon text-center icon-danger">
                    <i class="tim-icons icon-money-coins"></i>
                  </div>
                </div>
                <div class="col-7">
                  <div class="numbers">
                    <p class="card-category">{{ $t('label.categories') }}</p>
                    <h3 class="card-title">{{ getStatistics.totalCategory }}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <!-- <hr>
              <div class="stats">
                <i class="tim-icons icon-watch-time"></i>In the last hours
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-loading="getLoading">
        <div class="col-lg-5">
          <div class="card card-user">
            <div class="card-body" v-if="profile.user">
              <p class="card-text"></p>
              <div class="author">
                <div class="block block-one"></div>
                <div class="block block-two"></div>
                <div class="block block-three"></div>
                <div class="block block-four"></div>
                <img class="avatar" :src="serverUrl+'/'+profile.user.avatar" alt="...">
                <h5 class="title">{{ profile.user.fullname }}</h5>

                <el-tag v-if="profile.user.role === 'admin'">Administrator</el-tag>
                <el-tag v-if="profile.user.role === 'manager'">Manager</el-tag>
                <el-tag v-if="profile.user.role === 'salesperson'">Salesperson</el-tag>
              </div>
              <!-- <div
                class="card-description"
              >Hello World ( : Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.</div>-->
            </div>
            <!-- <div class="card-footer">
              <div class="button-container">
                <button href="javascript:void(0)" class="btn btn-icon btn-round btn-facebook">
                  <i class="fab fa-facebook"></i>
                </button>
                <button href="javascript:void(0)" class="btn btn-icon btn-round btn-twitter">
                  <i class="fab fa-twitter"></i>
                </button>
                <button href="javascript:void(0)" class="btn btn-icon btn-round btn-google">
                  <i class="fab fa-google-plus"></i>
                </button>
              </div>
            </div>-->
          </div>
          <div class="card">
            <div class="card-body" v-if="profile.user">
              <div>
                <h1>{{ time }}</h1>
                <h2>Welcome back, {{ profile.user.fullname }}!</h2>
                <p>Keep your good work</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Your 10 recent bills</h5>
            </div>
            <div class="card-body">
              <el-table :data="getBills.bill" style="width: 100%" v-if="getBills">
                <el-table-column :label="$t('label.numericalOrder')" width="50" type="index"></el-table-column>
                <el-table-column
                  :label="$t('label.customerName')"
                  prop="customer_id.fullname"
                  sortable
                ></el-table-column>
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
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState, mapGetters } from 'vuex';
import { Layout, AppFooter } from '@/components';
import { SERVER_URL } from '@/core/constants';

let timerID: any = null;

@Component({
  components: {
    Layout
  },

  computed: {
    ...mapGetters('dashboard', ['getStatistics']),
    ...mapGetters('profile', ['getProfile', 'getLoading']),
    ...mapState('profile', ['profile']),
    ...mapGetters('dashboard', ['getBills', 'getLoading'])
  },

  methods: {
    ...mapActions('profile', ['currentUser']),
    ...mapActions('dashboard', ['billList']),
    ...mapActions('dashboard', ['total'])
  },

  data() {
    return {
      serverUrl: SERVER_URL
    };
  },

  watch: {
    // call again the method if the route changes
    // tslint:disable-next-line
    $route: 'initCurrentProfile'
  }
})
export default class Dashboard extends Vue {
  public getSidebarStyle!: boolean;
  public time: string = '';

  public currentUser!: () => Promise<any>;
  public total!: () => Promise<any>;
  public billList!: () => Promise<any>;

  public created() {
    this.updateTime();
  }

  public mounted() {
    timerID = setInterval(this.updateTime, 1000);
    this.initCurrentProfile();
  }

  public updateTime() {
    const cd = new Date();
    const hours: string = this.zeroPadding(cd.getHours(), 2);
    const mins: string = this.zeroPadding(cd.getMinutes(), 2);
    // const secs: string = this.zeroPadding(cd.getSeconds(), 2);
    this.time = `${hours}:${mins}`;
    this.billList();
  }

  public async initCurrentProfile() {
    try {
      await this.currentUser();
      await this.total();
    } catch (e) {
      throw e;
    }
  }

  public zeroPadding(num: number, digit: number) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  public destroyed() {
    if (timerID) {
      clearInterval(timerID);
    }
  }
}
</script>

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
                    <h3 class="card-title">{{ getStatistics.products }}</h3>
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
                    <h3 class="card-title">{{ getStatistics.bills }}</h3>
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
                    <p class="card-category">{{ $t('label.customers') }}</p>
                    <h3 class="card-title">{{ getStatistics.customers }}</h3>
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
                    <p class="card-category">{{ $t('label.revenues') }}</p>
                    <h3 class="card-title">{{ getStatistics.revenues }}</h3>
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
      <div class="row">
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
              <h5 class="card-title">Management Table</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead class="text-primary">
                    <tr>
                      <th class="text-center">#</th>
                      <th>Name</th>
                      <th>Job Position</th>
                      <th>Milestone</th>
                      <th class="text-right">Salary</th>
                      <th class="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">
                        <div class="photo">
                          <img src="~@/assets/images/avatar/tania.jpg" alt="photo">
                        </div>
                      </td>
                      <td>Tania Mike</td>
                      <td>Develop</td>
                      <td class="text-center">
                        <div class="progress-container progress-sm">
                          <div class="progress">
                            <span class="progress-value">25%</span>
                            <div
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="60"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: 25%;"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">€ 99,225</td>
                      <td class="text-right">
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-success btn-link btn-icon btn-sm btn-neutral"
                          data-original-title="Tooltip on top"
                          title="Refresh"
                        >
                          <i class="tim-icons icon-refresh-01"></i>
                        </button>
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-danger btn-link btn-icon btn-sm btn-neutral"
                          data-original-title="Tooltip on top"
                          title="Delete"
                        >
                          <i class="tim-icons icon-simple-remove"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <div class="photo">
                          <img src="~@/assets/images/avatar/robi.jpg" alt="photo">
                        </div>
                      </td>
                      <td>John Doe</td>
                      <td>CEO</td>
                      <td class="text-center">
                        <div class="progress-container progress-sm">
                          <div class="progress">
                            <span class="progress-value">77%</span>
                            <div
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="60"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: 77%;"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">€ 89,241</td>
                      <td class="text-right">
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-success btn-link btn-sm btn-icon btn-neutral"
                          data-original-title="Tooltip on top"
                          title="Refresh"
                        >
                          <i class="tim-icons icon-refresh-01"></i>
                        </button>
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-danger btn-link btn-sm btn-icon btn-neutral"
                          data-original-title="Tooltip on top"
                          title="Delete"
                        >
                          <i class="tim-icons icon-simple-remove"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <div class="photo">
                          <img src="~@/assets/images/avatar/lora.jpg" alt="photo">
                        </div>
                      </td>
                      <td>Alexa Mike</td>
                      <td>Design</td>
                      <td class="text-center">
                        <div class="progress-container progress-sm">
                          <div class="progress">
                            <span class="progress-value">41%</span>
                            <div
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="60"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: 41%;"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">€ 92,144</td>
                      <td class="text-right">
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-success btn-link btn-icon btn-sm btn-neutral"
                          data-original-title="Tooltip on top"
                          title="Refresh"
                        >
                          <i class="tim-icons icon-refresh-01"></i>
                        </button>
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-danger btn-link btn-icon btn-sm btn-neutral"
                          data-original-title="Tooltip on top"
                          title="Delete"
                        >
                          <i class="tim-icons icon-simple-remove"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <div class="photo">
                          <img src="~@/assets/images/avatar/jana.jpg" alt="photo">
                        </div>
                      </td>
                      <td>Jana Monday</td>
                      <td>Marketing</td>
                      <td class="text-center">
                        <div class="progress-container progress-sm">
                          <div class="progress">
                            <span class="progress-value">50%</span>
                            <div
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="60"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: 50%;"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">€ 49,990</td>
                      <td class="text-right">
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-success btn-link btn-sm btn-icon"
                          data-original-title="Tooltip on top"
                          title="Refresh"
                        >
                          <i class="tim-icons icon-refresh-01"></i>
                        </button>
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-danger btn-link btn-sm btn-icon"
                          data-original-title="Tooltip on top"
                          title="Delete"
                        >
                          <i class="tim-icons icon-simple-remove"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <div class="photo">
                          <img src="~@/assets/images/avatar/mike.jpg" alt="photo">
                        </div>
                      </td>
                      <td>Paul Dickens</td>
                      <td>Develop</td>
                      <td class="text-center">
                        <div class="progress-container progress-sm">
                          <div class="progress">
                            <span class="progress-value">100%</span>
                            <div
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="60"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: 100%;"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">€ 69,201</td>
                      <td class="text-right">
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-success btn-link btn-sm btn-icon"
                          data-original-title="Tooltip on top"
                          title="Refresh"
                        >
                          <i class="tim-icons icon-refresh-01"></i>
                        </button>
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-danger btn-link btn-sm btn-icon"
                          data-original-title="Tooltip on top"
                          title="Delete"
                        >
                          <i class="tim-icons icon-simple-remove"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <div class="photo">
                          <img src="~@/assets/images/avatar/emilyz.jpg" alt="photo">
                        </div>
                      </td>
                      <td>Manuela Rico</td>
                      <td>Manager</td>
                      <td class="text-center">
                        <div class="progress-container progress-sm">
                          <div class="progress">
                            <span class="progress-value">15%</span>
                            <div
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="60"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: 15%;"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">€ 99,201</td>
                      <td class="text-right">
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-success btn-link btn-sm btn-icon"
                          data-original-title="Tooltip on top"
                          title="Refresh"
                        >
                          <i class="tim-icons icon-refresh-01"></i>
                        </button>
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-danger btn-link btn-sm btn-icon"
                          data-original-title="Tooltip on top"
                          title="Delete"
                        >
                          <i class="tim-icons icon-simple-remove"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
    ...mapState('profile', ['profile'])
  },

  methods: {
    ...mapActions('profile', ['currentUser'])
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
  }

  public async initCurrentProfile() {
    try {
      await this.currentUser();
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

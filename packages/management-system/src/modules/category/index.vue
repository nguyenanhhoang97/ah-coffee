<template>
  <div class="col-lg-12">
    <div class="card" v-loading="getLoading">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.manageCategory') }}</h4>
      </div>
      <div class="card-body">
        <el-row>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleCreateCategory">{{ $t('button.newCate') }}</el-button>
        </el-row>
        <el-table :data="getCategories.category" style="width: 100%">
          <el-table-column label="Name" prop="name" sortable></el-table-column>
          <el-table-column label="Introduction" prop="introduction" sortable></el-table-column>
          <el-table-column label="Status" prop="status" sortable></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="Type to search"/>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions } from 'vuex';
@Component({
  methods: {
    ...mapActions('category', ['categoryList'])
  },

  computed: {
    ...mapGetters('category', ['getCategories', 'getLoading'])
  },

  data() {
    return {
      search: '',
      pageIndex: 1,
      pageSize: 10
    };
  }
})
export default class Category extends Vue {
  mounted() {
    const parameters = {
      pageIndex: this.$data.pageIndex - 1,
      pageSize: this.$data.pageSize
    };
    this.categoryList(parameters);
  }

  public categoryList!: (data: any) => Promise<any>;

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


<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('label.manageCategory') }}</h4>
      </div>
      <div class="card-body">
        <el-row>
          <el-button type="primary" size="mini" icon="el-icon-plus">{{ $t('button.newCate') }}</el-button>
        </el-row>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column label="Date" prop="date" sortable></el-table-column>
          <el-table-column label="Name" prop="name" sortable></el-table-column>
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
          :current-page.sync="currentPage2"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'John',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Morgan',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Jessy',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ],
      search: ''
    };
  }
})
export default class Category extends Vue {
  public handleSizeChange(val: any) {
    console.log(`${val} items per page`);
  }
  public handleCurrentChange(val: any) {
    console.log(`current page: ${val}`);
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


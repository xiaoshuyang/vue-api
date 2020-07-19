<template>
  <div class="api_container">
    <!-- @focus="getKeywordList" -->
    <!-- <el-input clearable @clear="getUserList" placeholder="请输入内容" v-model="queryInfo.keyword"> -->
    <div class="top">
      <el-input  clearable  @clear="getUserList" @keyup.enter.native="getUserList" placeholder="请输入内容" v-model="queryInfo.keyword">
        <el-button @click="getUserList" slot="append" icon="el-icon-search">头条搜索</el-button>
      </el-input>
      <ul class="ul_container" v-show="status" @onmouseover="this.style.cursor='hand'">
        <li v-for="item in keyList" :key="item.id" @click="getData(item.keyword)">{{item.keyword}}
        </li>
      </ul>
    </div>
    <div class="middle" >
      <div v-show="status1" class="middle_top">头条为您检索到{{this.total}}条消息</div>
      <!-- <ul class="ul_container">
        <li v-for="item in keyList" :key="item.id" @click="getData(item.keyword)">{{item.keyword}}
        </li>
      </ul> -->
      <ul class="ul_container1">
        <li v-for="item in userlist" :key="item.id">
          <el-link :href ="item.link_url " target="_blank" type="primary">{{item.title}}</el-link>
          <p>{{item.description}}</p>
        </li>
        <el-pagination v-show="status1" background @current-change="handleCurrentChange" :current-page.sync="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </ul>
    </div>
  </div>
</template>

<script>
import globalfunction from '../assets/js/globalfunction.js'
export default {
  data () {
    return {
      queryInfo: {
        keyword: '',
        offset: 0
      },
      dataInfo: '',
      userlist: [],
      keyList: [],
      total: 0,
      status: true,
      status1: false
    }
  },
  watch: {
    'queryInfo.keyword' (newVal, oldVal) {
      // console.log(newVal, oldVal)
      // this.getKeywordList()
      if (newVal !== '' || oldVal !== '') {
        this.getKeywordList()
        this.status = true
        this.status1 = false
      }
      if (newVal === '' || oldVal === '') {
        this.status = false
        this.status1 = false
      }
      // console.log(newVal, oldVal)
    }
    // 'queryInfo.keyword': {
    //   handler: function (newVal, oldVal = '1') {
    //     console.log(newVal, oldVal)
    //     this.getKeywordList()
    //     if (newVal !== oldVal) {
    //       this.getKeywordList()
    //       this.status = true
    //       this.status1 = false
    //     }
    //     if (newVal === '' || oldVal === '') {
    //       this.status = false
    //       this.status1 = false
    //     }
    //     console.log(newVal, oldVal)
    //   },
    //   immediate: true
    // }
  },
  created () {
    // this.getUserList()
    // this.getKeywordList()
  },
  methods: {
    getUserList: globalfunction.debounce(async function () {
      const result = await this.$http.get('https://i.snssdk.com/search/api/study', { params: this.queryInfo })
      if (result.data.code !== 1) {
        this.status1 = true
        this.total = 0
      }
      this.userlist = result.data.data
      this.total = result.data.total
      this.status = false
      this.status1 = true
      console.log(this.userlist)
      if (this.userlist === undefined) {
        this.status1 = false
      }
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }, 500),
    getKeywordList: globalfunction.throttle(async function () {
      const result = await this.$http.get('https://i.snssdk.com/search/api/sug', { params: { keyword: this.queryInfo } })
      this.keyList = result.data.data
      console.log(this.keyList)
    }, 500),
    // async getUserList () {
    //   const result = await this.$http.get('https://i.snssdk.com/search/api/study', { params: this.queryInfo })
    //   // console.log(result)
    //   // if (result.data.code !== 0) return this.$message.error('未找到相关检索')
    //   this.userlist = result.data.data
    //   this.total = result.data.total
    //   this.status = false
    //   this.status1 = true
    //   console.log(this.userlist)
    //   if (this.userlist === undefined) {
    //     this.status1 = false
    //   }
    //   document.documentElement.scrollTop = document.body.scrollTop = 0
    // },
    // async getKeywordList () {
    //   const result = await this.$http.get('https://i.snssdk.com/search/api/sug', { params: { keyword: this.queryInfo } })
    //   this.keyList = result.data.data
    //   console.log(this.keyList)
    // },
    getData (listdata) {
      this.queryInfo.keyword = listdata
      this.getUserList()
      // console.log(listdata)
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPagesize) {
      console.log(newPagesize)
      this.queryInfo.offset = newPagesize
      this.getUserList()
    }
  }
}

</script>

<style lang="less" scoped>
  cursor:pointer
  .api_container {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    background-color: #2b4b6b;
    height: 100%;
    // text-align: center;
  }
  .top {
      position: fixed;
      top: 0;
      // left: 50px;
      width: 100%;
      height: 90px;
      background-color: #fff;
      z-index: 999;
  }
  .el-input {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      width: 500px;
      // text-align: center;
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 17px;
  }
  .middle {
    display: flex;
    // position: relative;
    justify-content: center;
    margin-top: 100px;
    .middle_top {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
    }
  }
  .ul_container {
    background-color: #2b4b6b;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 500px;
    // text-align: center;
    // margin: 0 auto;
    margin-left: -10px;
    margin-top: 90px;
    li {
      color: #ccc;
      text-align: left;
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 700;
    }
  }
  .ul_container1 {
    position: absolute;
    // top: 50%;
    left: 50%;
    transform: translate(-50%);
    // margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 17px;
    padding: 0;
    li {
      font-size: 20px;
      color: #ccc;
    }
  }
  .el-link {
    font-size: 18px;
  }
  li p {
     display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow : hidden;
      font-size: 15px;
  }
  .api_footer {
      position: fixed;
      bottom: 0;
      // left: 50px;
      width: 100%;
      height: 90px;
      background-color: #fff;
      z-index: 999;
  }
  span {
    .el-pagination__total .el-pagination__jump {
    color: #fff !important;
    }
  }

</style>

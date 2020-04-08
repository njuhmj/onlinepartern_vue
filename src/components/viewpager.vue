<template>
  <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in activityList" :key="item.id">
      <div @click="toActivityDetail(item)">
      <h6 class="medium">
        <font size="10">
          <strong>{{ item.active_event }}</strong>
        </font>
      </h6>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import http from "../http.js";

export default {
  name: "viewPager",
  data() {
    return {
      activityList:[],
    };
  },
  methods:{
    getData(){
      http
        .fetchPost("/activity/getActivities")
        .then(data => {
          this.parseData(data['data']);
        })
        .catch(err => console.log(err));
    },
    parseData(data) {
      console.log(data);
      if (data['header']['code'] == 101) {
        this.activityList = data['body']['data'];
      } else {
        this.$message({
          type: "error",
          message: data.header.code +" : "+ data.header.msg,
        });
      }
    },
    toActivityDetail(item){
      this.$router.push({path:'/activityDetail',query:{content:JSON.stringify(item)}});
    }
  },
  mounted() {
    // 调用请求数据的方法
    this.getData();
  }
};
</script>

<style>
.el-carousel__item h6 {
  text-align: center;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>


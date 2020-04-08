<template>
  <div class="main">
    <el-row v-for="(imgs,i1) in imgss" :key="i1">
      <el-col :span="24/wallWSize" v-for="(img,i2) in imgs" :key="i2">
        <div class="img-col" @click="toUserMain(i1*6+i2)">
          <el-card :body-style="{ padding: '0px' }" style="height:300px;" >
            <el-image :src="img.img" fit="fill" style="width:100%;height:180px;"/>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <p class="font-desc">{{img.desc}}</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import http from "../http.js";

export default {
  name: "imgWall",
  data() {
    return {
      wallWSize: 6,
      imgss: [
        [
          // {
          //   img:"",
          //   desc:"",
          // },
        ],
        [],[],[]
      ],
      users:[],
    };
  },
  methods: {
    getData() {
      http
        .fetchPost("/user/getRecommendUser")
        .then(data => {
          console.log(data);
          this.parseData(data.data);
        })
        .catch(err => console.log(err));
    },
    parseData(data) {
      if (data.header.code == 101) {
        var validData = data.body.data;
        this.users = validData
        var ri = 0;
        var index = 0;
        while (ri * this.wallWSize < validData.length) {
          for (var i = 0; i < this.wallWSize; i++) {
            this.imgss[ri].push({
              img: validData[index]["img"],
              desc: validData[index++]["note"]
            });
          }
          ri++;
        }
      } else {
        this.$message({
          type: "error",
          message: data.header.code + " : " + data.header.msg
        });
      }
    },
    toUserMain(index){
      console.log(this.users[index]);
      this.$router.push({path:"/userMain",query:{info:JSON.stringify(this.users[index])}});
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
.main{
  margin-left: 50px;
  margin-right: 50px;
}
.img-col {
  margin: 10px;
}
.font-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
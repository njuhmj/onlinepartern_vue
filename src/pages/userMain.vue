<template>
  <div class="main">

    <div>
      <div class="d-content">
        <div class="d-con-top">
          <div class="d-img">
            <div>
            <img fit="fill" :src="info.img"/>
            </div>
            <el-button type="danger" icon="el-icon-star-off" @click="like()" :disabled="like_btn_clickable" circle>喜欢{{info.like}}</el-button>
          </div>
          <div class="d-basic-info">
            <p>
              <span>
          <font size="6">
            <p><font size="6"><strong>{{info.nick}}</strong></font></p>
          </font>
        </span>
            </p>
            <el-divider></el-divider>
            <p>关注: {{info.count_concern}} &nbsp;&nbsp; 粉丝: {{info.count_fans}}</p>
            <div>
              <el-divider></el-divider>
              <p>性别:&nbsp;{{parseSex(info.sex)}}</p>
              <p>学历:&nbsp;{{parseEducate(info.phone)}}</p>
              <p>身高:&nbsp;{{info.height}} cm</p>
              <p>电话:&nbsp;{{info.phone}}</p>
              <p>交友宣言:&nbsp;{{info.note}}</p>
              <p></p>
              <p></p>
              <p></p>
              <!-- <el-button @click="getUserPhone()">测试</el-button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import photoAlbum from "@/components/photoalbum"
import parseUser  from "@/utils/parseUser.js"
import http from "../http.js";

export default {
  name: "userMain",
  data() {
    return{
      info:{},
      like_btn_clickable:false,
    }
  },
  methods:{
    //加载用户信息
    init(){
      this.info = JSON.parse(this.$route.query.info);
    },
    like(){
      this.info.like+=1
      this.addLike();
      this.like_btn_clickable = true;
    },
    addLike(){
      http
        .fetchPost("/user/updateLike", { phone: this.info.phone,like: this.info.like })
        .then(data => {
          console.log(data['data'])
        })
        .catch(err => console.log(err));
    },
    parseEducate(educate){
      return parseUser.parseEducate(educate);
    },
    parseSex(sex){
      return parseUser.parseSex(sex);
    },
  },
  mounted(){
    this.init();
  }
}
</script>

<style scoped>
.main{
  text-align: center;
}
.d-content {
  margin-top: 40px;
  text-align: left;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.d-con-top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.d-basic-info {
  margin-left: 20px;
}
.d-img{
  margin-top: 40px;
}

</style>
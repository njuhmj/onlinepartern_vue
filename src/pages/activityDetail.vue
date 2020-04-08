<template>
  <div class="main">
    <h2>{{content.active_event}}</h2>
<p class="one gray">发布时间:<em>{{content.active_time}}</em>&nbsp;&nbsp;地点:<em>{{content.active_location}}&nbsp;&nbsp;</em> 发布:<em>admin</em></p>
<hr/>
<p>6月6日下午，在学院会议室我院召开了参访活动暨推进转型工作研讨会。会议由副院长汪阳主持，院长助理董世平，教务处、实验实训中心、发展规划处、人事处、就业与创业办公室及各二级学院领导参加了研讨会。</p>
  </div>
</template>

<script>
export default {
  name: "activityDetail",
  data(){
    return{
      content:{
        active_event:"aaaa",
        active_time:"",
        active_location:"",
      },
    }
  },
  methods:{
    //加载活动数据
    init(){
      this.content = JSON.parse(this.$route.query.content);
      console.log(JSON.parse(this.$route.query.content));
    }
  },
  mounted(){
    this.init();
  }
};

</script>

<style scoped>
.main{
  text-align: center;
  margin-left: 100px;
  margin-right: 100px;
}
</style>
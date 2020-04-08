<template>
  <div id="main_page">
    <div class="main_top">
      <topbar />
    </div>
    <div class="main_body">
      <router-view/>
      <!-- <mainBody></mainBody> -->
    </div>
    <!-- <div class="main_footer">Footer</div> -->
  </div>
</template>

<script>
import topbar from "@/components/topbar";
import mainBody from "@/pages/mainBody";

export default {
  name: "mainPage",
  components: { topbar, mainBody }
};
</script>

<style>
#main_page {
  text-align: start;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
}
.main_top {
  height: 100%;
}
.main_body {
  padding-top: 10px;
  height: 100%;
  margin-bottom: 100px; 
}
.main_footer {
  height: 100%;
}
</style>

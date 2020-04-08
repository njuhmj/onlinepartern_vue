<template>
  <el-upload
    ref="upload"
    :action="serverPath+'/tool/uploadFile'"
    name="picture"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-success="onSuccessUpload"
    :value="imgUrl"
  >
    <img v-if="imageBase64Url" :src="imageBase64Url" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import http from "../http.js";

export default {
  name: "imgUpload",
  data() {
    return {
      serverPath: this.$serverPath,
      imageBase64Url: "",
      imgUrl:"",
      fileList: []
    };
  },
  methods: {
    //文件上传成功的钩子函数
    onSuccessUpload(res,file) {
      this.$message({
        type: "info",
        message: "图片上传成功",
        duration: 6000
      });
      console.log(res);
      if (res.header.code == 101) {
        this.imageBase64Url = URL.createObjectURL(file.raw);
        this.imgUrl = res.body.data;
      }
    },
    //删除文件之前的钩子函数
    handleRemove(file, fileList) {
      this.$message({
        type: "info",
        message: "已删除原有图片",
        duration: 6000
      });
    },

    //文件上传前的前的钩子函数
    //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    }
  }
};
</script>

<style>
.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<template>
  <el-card class="e-main">
    <div class="main">
      <div class="left">
        <p class="p-title">
          <font size="4">
            <strong>{{chat_title}}</strong>
          </font>
        </p>
        <div class="d-userlist"></div>
      </div>
      <div class="right">
        <div class="d-msg-show">
          <div v-for="(item,index) in msg_list" :key="index" class="d-msg-box">
            <div v-if="item.nick!=user_nick" class="msg-box-left">
              <p>
                <strong>{{item.nick}}</strong>
                &nbsp;&nbsp;{{item.time}}
              </p>
              <p>
                <font size="3">{{item.msg}}</font>
              </p>
            </div>
            <div v-else class="msg-box-right">
              <p>
                <strong>{{item.nick}}</strong>
                &nbsp;&nbsp;{{item.time}}
              </p>
              <p>
                <font size="3">{{item.msg}}</font>
              </p>
            </div>
          </div>
        </div>
        <div class="d-input-msg">
          <el-input
            class="e-input"
            v-model="input_msg"
            placeholder="快和大家聊聊吧"
            @keyup.enter.native="sendMsg()"
          ></el-input>
          <el-button type="primary" :disabled="!canSendMsg" @click="sendMsg()">发送</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "chatRoom",
  data() {
    return {
      input_msg: "",
      user_phone: "",
      user_nick: "",
      chat_title: "需登陆才能进行聊天",
      canSendMsg: false,
      ws: null,
      msg_list: [
        {
          nick: "马克",
          phone: "1234566788",
          time: "12:30",
          msg: "Good Afternoon EveryOne!"
        },
        {
          nick: "tom",
          phone: "12345661234",
          time: "12:30",
          msg: "Good Afternoon EveryOne!"
        }
      ]
    };
  },
  methods: {
    sendMsg() {
      if (this.input_msg.trim() == "") return;
      var current_msg = {
        type: "groupmsg",
        from: this.user_phone,
        to: "all",
        time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        payload: {
          nick: this.user_nick,
          msg: this.input_msg
        }
      };
      console.log(current_msg);
      this.showMsg(current_msg);
      //this.msg_list.push(current_msg);
      this.sendToServer(JSON.stringify(current_msg));
      this.input_msg = "";
    },
    showMsg(msg) {
      if (msg.type == "notify_history_msg"){
        this.$store.commit("newMsg",JSON.stringify(msg));
        return ;
      }
      if (msg.type != "groupmsg") return;
      var item =  {
        phone:msg.from,
        time:msg.time,
        nick:msg.payload.nick,
        msg:msg.payload.msg,
      }
      this.msg_list.push(item);
    },
    //消息发送到服务器
    sendToServer(current_msg) {
      this.ws.send(current_msg);
    },
    initChatRoom() {
      var user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      this.user_phone = user["phone"];
      if (user != null) {
        this.canSendMsg = true;
        this.chat_title = "聊天室";
        if(this.$websocket==null){
          this.$websocket = new WebSocket(this.$websocketPath+"?"+user.phone);
        };
        this.ws = this.$websocket;
      }
      if (user.nick == "") {
        this.user_nick = user["phone"];
      }
      this.user_nick = user["nick"];
      console.log(this.user_nick);
    },
    receiveMessage(event) {
      console.log(" Receive Message Is :" + event.data);
      var msg = JSON.parse(event.data);
      if (msg.from != this.user_phone) {
        this.showMsg(msg);
      }
    },
    receiveServiceMsg() {
      this.ws.onmessage = this.receiveMessage;
      this.ws.onopen = function(event) {
        console.log("Connection create!");
      };
      this.ws.onclose = function(event) {
        console.log("Connection close!");
      };
    }
  },
  watch: {
    msg_list: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".d-msg-show");
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  mounted() {
    this.initChatRoom();
    this.receiveServiceMsg();
  }
};
</script>

<style scoped>
.e-main {
  text-align: center;
  height: 500px;
  margin-left: 100px;
  margin-right: 100px;
  background-color: antiquewhite;
}
.main {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  widows: 100%;
  height: 100%;
}
.left {
  order: 1;
  flex-grow: 1;
  box-shadow: 0 0 1px 1px #ccc;
  padding-top: 0px;
}
.right {
  order: 2;
  flex-grow: 3;
  box-shadow: 0 0 1px 1px #ccc;
}
.p-title {
  box-shadow: 0 0 0px 0px #ccc;
}
.d-msg-show {
  height: 400px;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: inset 0 0 2px 2px #ccc;
  overflow: auto;
}
.d-msg-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.d-input-msg {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  padding: 2px;
}
.e-input {
  margin-right: 8px;
}
.msg-box-left {
  text-align: left;
  align-self: flex-start;
  padding-left: 20px;
}
.msg-box-right {
  text-align: right;
  align-self: flex-end;
  padding-right: 20px;
}
</style>
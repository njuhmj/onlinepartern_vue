import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const my_user_base_info = {
        nick: "",
        count_concern: "",
        count_fans: "",
        phone: "",
        sex: "",
        age: "",
        prof: "",
        income: "",
        note: "",
        marrage:"",
      }

const my_fans_list = [];
const my_concern_list = [];
const my_chat_list = [];
const chat_activeindex=0;
const my_unchecked_msg = null;
const my_unchecked_msg_count=0;

//创建Vuex实例
const store = new Vuex.Store({
    state:{
      my_user_base_info,
      my_fans_list,
      my_concern_list,
      my_chat_list,
      chat_activeindex,
      my_unchecked_msg,
      my_unchecked_msg_count,
    },
    mutations:{
      newMsg(state,msg){
        state.my_unchecked_msg = JSON.parse(msg);
        console.log(state.my_unchecked_msg.payload.object.length);
      }
    },
})

export default store;
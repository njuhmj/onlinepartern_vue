
export default function (type, val) {
  //type的值：qq-QQ号，mobile-手机号，phone-座机号，cardid-身份证号，integer-数字，moneynum-货币数字（带两位小数），...
  var result = false;

  //QQ
  var isQQ = function (val) {
    const reg = /^[1-9][0-9]{4,10}$/;
    return reg.test(val);
  }

  //邮箱
  var isEmail = function (val) {
    const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(val);
  }

  //手机号(目前只支持中国大陆的手机号码)
  var isMobile = function (val) {
    const reg = /^1[34578]\d{9}$/;
    return reg.test(val);
  }

  //座机号
  var isPhone = function (val) {
    const reg = /^0\d{2,3}-\d{7,8}$/;
    return reg.test(val);
  }

  //身份证号(15位和18位)
  var isCardID = function (val) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(val);
  }

  //车牌号(川B12345)
  var isPlateNumber = function (val) {
    const reg = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
    return reg.test(val);
  }

  //数字（正整数和0）
  var isInteger = function (val) {
    const reg = /^([1-9]\d*|[0]{1,1})$/;
    return reg.test(val);
  }

  //货币数字（最多带两位小数）
  var isMoneynum = function (val) {
    const reg = /^([1-9]\d+|0)(\.[\d]{1,2})?$/;
    return reg.test(val);
  }

  //昵称（长度:1-6个中文或1-12个英文）
  var isNick = function (val) {
    const reg = /(?:[a-zA-Z]{1,12})|(?:[\u4e00-\u9fa5]{1,6})/;
    return reg.test(val);
  }

  //校验密码：只能输入6-20个字母、数字、下划线  
  var isPasswd = function (val) {
    var reg = /^(\w){6,20}$/;
    return reg.test(val);
  }

  //校验身高 
  var isHeight = function (val) {
    var reg = /^(0{1}|[1-9]\d{0,3}|.{0})$/;
    return reg.test(val);
  }



  switch (type) {
    case 'qq':
      result = isQQ(val);
      break;
    case 'mobile':
      result = isMobile(val);
      break;
    case 'phone':
      result = isPhone(val);
      break;
    case 'cardid':
      result = isCardID(val);
      break;
    case 'platenumber':
      result = isPlateNumber(val);
      break;
    case 'integer':
      result = isInteger(val);
      break;
    case 'moneynum':
      result = isMoneynum(val);
      break;
    case 'nick':
      result = isNick(val);
      break;
    case 'password':
      result = isPasswd(val);
      break;
    case 'height':
      result = isHeight(val);
      break;
    default:
      break;
  }

  return result;

}
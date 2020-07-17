// 去除非法字符
export function stripscript(str) {
  let pattern = new RegExp("[`~!@#$^&*()%=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
  let res = "";
  for (let i = 0; i < str.length; i++) {
    res = res + str.substr(i, 1).replace(pattern, '');
  }
  return res;
}

// 验证码校验
export function validateCode(rule, value, callback) {
  let len = value.length;
  if (!value) {
    callback(new Error("验证码不能为空"));
  } else if (len < 6) {
    callback(new Error(`验证码格式错误`));
  } else {
    callback();
  }
}

// 密码校验
export function validatePwd(rule, value, callback) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  let len = value.length;
  let res = stripscript(value).length;
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (len < 6) {
    callback(new Error(`当前密码位数：${len},密码长度6-20位`));
  } else if (!reg.test(value)) {
    callback(new Error("密码必须包含数字和英文"));
  } else if (res !== len) {
    callback(new Error("存在无法识别的非法字符"));
  } else {
    callback();
  }
}


// 邮箱校验

export function validateEmail(rule, value, callback) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else if (!reg.test(value)) {
    callback(new Error("邮箱格式错误"));
  } else {
    callback();
  }
}

export function validateEmail2(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
/**
 * 表单常用自定义验证器
 */

/**
 * 判断是否是除字母、数字之外的字符，ch如果为字符串，则判断第一个字符
 *
 * @param      {string}   ch      { parameter_description }
 * @return     {boolean}  True if special character, False otherwise.
 */
function isSpecialCharacter(ch) {
  if (!ch) {
    return false;
  }
  let c = ch.charCodeAt();
  let rv = ((c - 'A'.charCodeAt()) > -1 && (c - 'Z'.charCodeAt()) < 1)
    || ((c - 'a'.charCodeAt()) > -1 && (c - 'z'.charCodeAt()) < 1)
    || ((c - '0'.charCodeAt()) > -1 && (c - '9'.charCodeAt()) < 1);
  if (!rv) {
    return true;
  }
  return false;
}

export default function (Vue) {
  /**
   * 注册用户名
   */
  Vue.validator('accountname', {
    message: '账号须为字母或数字',
    check: function (value) {
      return /^[a-zA-Z0-9]{0,}$/.test(value);
    }
  });

  /**
   * 与参数相同
   */
  Vue.validator('strogePwd', {
    message: `大写字母、小写字母、数字、特殊字符至少包含两种`,
    check: function (value) {
      /* 明日密码规则*/
      let valueArray = value.split("");
      let haveBigLetter = false;
      let haveLittleLetter = false;
      let haveNum = false;
      let haveSpecialsymbols = false;
      let haveIllegalsymbols = false;
      for (let i = 0; i < valueArray.length; i++) {
        if (/[a-z]/.test(valueArray[i])) {
          haveLittleLetter = true;
          continue;
        }
        if (/[A-Z]/.test(valueArray[i])) {
          haveBigLetter = true;
          continue;
        }
        if (/[0-9]/.test(valueArray[i])) {
          haveNum = true;
          continue;
        }
        if (/[~!@#$%^&*()_+|<>,.?\/:;'\[\]{}"]/.test(valueArray[i])) {
          haveSpecialsymbols = true;
          continue;
        }
        if (!/[a-zA-Z0-9~!@#$%^&*()_+|<>,.?\/:;'\[\]{}"]/.test(valueArray[i])) {
          haveIllegalsymbols = true;
          break;
        }
      }
      if (haveIllegalsymbols) {
        return false;
      }
      let flagArr = [haveBigLetter, haveLittleLetter, haveNum, haveSpecialsymbols];
      let flagPassCount = 0;
      for (let i = 0; i < flagArr.length; i++) {
        if (flagArr[i]) flagPassCount++;
      }
      return flagPassCount >= 2;
    }
  });

  /**
   * 不能有3个相同字符
   */
  Vue.validator('notThreeSameChar', {
    message: '不能有3个连续的字符,如aaA,111',
    check: function (val) {
      let newVal = val.toLowerCase();
      return !/(.)*(.)\2{2}(.)*/g.test(newVal);
    }
  });

  /**
   * 不能有3个连续的相同字符种类
   */
  Vue.validator('notCantainsThreeConsecutiveValue', {
    message: '不能有3个连续的字符,如abc,123',
    check: function (val) {
      let flag = true;
      let length = val.length;
      for (let i = 0; i < length - 2;) {
        let c2 = val.charAt(i + 1);
        if (!isSpecialCharacter(c2)) {
          let c1 = val.charAt(i);
          let c3 = val.charAt(i + 2);
          let mc1 = c1.charCodeAt(0);
          let mc2 = c2.charCodeAt(0);
          let mc3 = c3.charCodeAt(0);
          if ((mc2 * 2 === mc1 + mc3) && (mc2 !== mc1) && (mc2 === mc1 + 1)) {
            flag = false;
            break;
          } else if ((mc2 === mc3 - 1) || (mc2 === mc3 + 1)) {
            i = i + 1;
          } else {
            i = i + 1;
          }
        } else {
          i = i + 2;
        }
      }
      return flag;
    }
  });

  /**
   * 与参数相同
   */
  Vue.validator('sameas', {
    message: '需要与上一个自动相同',
    check: function (val, sameParam) {
      return val === sameParam;
    }
  });

  /**
   * 与参数不相同
   */
  Vue.validator('notSameas', {
    message: '需要与上一个不相同',
    check: function (val, sameParam) {
      return val !== sameParam;
    }
  });

  /**
   * 不能全是字母
   */
  Vue.validator('notAllLetter', {
    message: '不能全是字母',
    check: function (val) {
      return !(/^([a-zA-Z])+$/.test(val));
    }
  });

  /**
   * 不能全是数字
   */
  Vue.validator('notAllDigit', {
    message: '不能全是数字',
    check: function (val) {
      return !(/^([0-9])+$/.test(val));
    }
  });

  /**
   * 不能有3个连续相同的字符
   */
  Vue.validator('notContainsThreeConsecutiveIdentical', {
    message: '不能有3个连续相同的字符',
    check: function (val) {
      let flag = true;
      let length = val.length;
      for (let i = 0; i < length - 2;) {
        let c1 = val.charAt(i);
        let c2 = val.charAt(i + 1);
        let c3 = val.charAt(i + 2);
        if (c3 !== c2) {
          i = i + 2;
        } else if (c1 !== c2) {
          i = i + 1;
        } else {
          flag = false;
          break;
        }
      }
      return flag;
    }
  });

  /**
   * 邮箱验证
   */
  let emailValitor = function (val) {
    if (val === null || val === undefined || val === '')  return true;
    let emailArr = val.split(";");
    for (let i = emailArr.length - 1; i >= 0; i--) {
      let isEmailValid = /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(emailArr[i]);
      if (i === emailArr.length - 1) {
        if (emailArr[i] === '')  break;
      }
      if (!isEmailValid) {
        return false;
      }
    }
    return true;
  };
  Vue.validator('email', {
    message: '请输入合法邮箱',
    check: emailValitor
  });

  /**
   * 邮箱长度不能超过100位
   */
  let emailLenValitor = function (val) {
    return val.length <= 100;
  };
  Vue.validator('emailLen', {
    message: '邮箱长度不能超过100位',
    check: emailLenValitor
  });

  /**
   * 手机验证
   */
  let mobileValitor = function (val) {
    return (val === null || val === undefined || val === '') ? true : /^\d{11}$/.test(val);
  };
  Vue.validator('mobile', {
    message: '请输入合法手机号',
    check: mobileValitor
  });
  /**
   * 日期验证
   */
  let dateValitor = function (val) {
    return val !== '' ? /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(val) : true;
  };
  Vue.validator('date', {
    message: '请输入合法日期',
    check: dateValitor
  });
  // 不是必填的日期
  Vue.validator('dateno', {
    message: '请输入合法日期',
    check: function (val) {
      let boolean =
        (val === null || val === undefined || val === '') ? true : dateValitor(val);
      return boolean;
    }
  });
  /**
   * 信用卡验证  模10算法
   */
  let isLuhn = function (strNum) {
    let oddSum = 0;
    let evenSum = 0;
    let isOdd = true;
    for (let i = strNum.length - 1; i >= 0; i--) {
      let cNum = strNum[i];
      let num = Number(cNum);

      if (isOdd) {
        oddSum += num;
      } else {
        num = num * 2;
        if (num > 9) {
          num = num % 10 + 1;
        }
        evenSum = evenSum + num;
      }
      isOdd = !isOdd;
    }
    return ((evenSum + oddSum) % 10 === 0);
  };
  /**
   * 信用卡验证, 卡种验证不全, 改为只验证长度, 判断模10
   * isShowUp : 是否国内银联通过验证
   */
  let creditValitor = function (val, isShowUp) {
    // let visa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/; // Visa: length 16, prefix 4, dashes optional.
    // let mc = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/; // Mastercard: length 16, prefix 51-55, dashes optional.
    // let disc = /^6011-?\d{4}-?\d{4}-?\d{4}$/; // Discover: length 16, prefix 6011, dashes optional.
    // let amex = /^3[4,7]\d{13}$/; // American Express: length 15, prefix 34 or 37.
    // let diners = /^3[0,6,8]\d{12}$/; // Diners: length 14, prefix 30, 36, or 38.
    // let enroute = /^2[014,149]\d{11}$/; // enRoute: length 15, prefix 2014,2149
    // let jcb = /^3[088,096,112,158,337,528]\d{12}$/; // JCB: length 16, prefix 3088,3096,3112,3158,3337,3528
    // // test credit card length
    // let reCard = visa.test(val) | mc.test(val) || disc.test(val) || amex.test(val) || diners.test(val) || enroute.test(val) || jcb.test(val);

    // 验证VISA卡，万事达卡，Discover卡，美国运通卡
    // let reCard = /^((?:4\d{3})|(?:5[1-5]\d{2})|(?:6011)|(?:3[68]\d{2})|(?:30[012345]\d))[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{4}|3[4,7]\d{13})$/.test(val);
    let reCard = val.length >= 12 && val.length <= 19;
    let type = reCard;
    if (reCard) {
      type = isLuhn(val);
    }
    if (!isShowUp && val.indexOf('62') === 0)  return false;
    return type;
  };
  Vue.validator('credit', {
    message: '请输入合法的卡号',
    check: creditValitor
  });

  /**
   * 18位身份证验证
   */
  let idCardValitor = function (val) {
    return /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/.test(val) || !val;
  };
  Vue.validator('idcard', {
    message: '请输入合法身份证号',
    check: idCardValitor
  });

  /**
   * 根据需求已将规则改变
   * 护照验证
   P:P开头的是因公普通护照
   D:外交护照是D开头
   E: 有电子芯片的普通护照为“E”字开头，
   S: 后接8位阿拉伯数字公务护照
   G:因私护照G开头
   14：
   15：
   H:香港特区护照和香港公民所持回乡卡H开头,后接10位数字
   M:澳门特区护照和澳门公民所持回乡卡M开头,后接10位数字
   */
  let passportValitor = function (val) {
    return /^[0-9a-zA-Z]{0,}$/.test(val);
    // return /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8,10})$/.test(val)|| !val;
  };
  Vue.validator('passport', {
    message: '请输入合法护照',
    check: passportValitor
  });

  /**
   * 根据类型验证证件号码
   */
  Vue.validator('certnoByType', {
    message: '请输入合法证件号码',
    check: function (val, certType) {
      if (`${certType}` === '1') {
        return idCardValitor(val);
      } else if (`${certType}` === '2') {
        return passportValitor(val);
      }
      return true;
    }
  });

  /**
   * 中文字符
   * 验证临客姓名
   */
  let chValitor = function (val) {
    return /[\u4e00-\u9fa5]/.test(val) || !val;
  };
  Vue.validator('ch', {
    message: '请输入合法临客姓名',
    check: chValitor
  });
  /**
   * 酒店电话号
   */
  let hoteltelValitor = function (val) {
    return /[0-9-()（）]{7,18}/.test(val) || !val;
  };
  Vue.validator('hoteltel', {
    message: '请输入酒店电话',
    check: hoteltelValitor
  });
  /**
   * 英文字符
   * 验证临客姓名
   */
  let enValitor = function (val) {
    return /[a-zA-Z]/.test(val) || !val;
  };
  Vue.validator('en', {
    message: '请输入英文',
    check: enValitor
  });
  /**
   * 常客卡号 part1- 航空公司编码 两位大写字母或数字
   */
  let aircodeValitor = function (val) {
    return /^[A-Z0-9]{2}$/.test(val) || !val;
  };
  Vue.validator('aircode', {
    message: '请输入合法航空公司编码',
    check: aircodeValitor
  });

  /**
   * 常客卡号 part2 - 至少一位数字
   */
  let psgcardValitor = function (val) {
    return /^[0-9]{1,}$/.test(val) || !val;
  };
  Vue.validator('psgcard', {
    message: '请输入合法常客卡号',
    check: psgcardValitor
  });

  /**
   * 时间00:00
   */
  let timeValitor = function (val) {
    return /^[0-9]{2}[:][0-9]{2}$/.test(val) || !val;
  };
  Vue.validator('time', {
    message: '请输入合法常客卡号',
    check: timeValitor
  });

  /**
   * 主机姓名
   */
  let hostnameValitor = function (val) {
    return val !== '' ? /^([a-zA-Z])+\/([a-zA-Z])+$/.test(val) : true;
  };
  Vue.validator('hostname', {
    message: '请按照XX/XX格式输入英文主机姓名',
    check: hostnameValitor
  });

  /**
   * 只能>=0整数
   */
  let numberOnlyValitor = function (val) {
    return /^\d*$/.test(val);
  };
  Vue.validator('numberonly', {
    message: '只能输入数字',
    check: numberOnlyValitor
  });

  /**
   * 只能正数
   */
  let positiveNumberValitor = function (val) {
    if (isNaN(val))  return false;
    return Number(val) > 0;
  };
  Vue.validator('positivenumber', {
    message: '只能输入正数数字',
    check: positiveNumberValitor
  });

  /**
   * 只能汉字或英文或空格
   */
  let chEnSpace = function (val) {
    if (!/^[a-zA-Z \u4e00-\u9fa5\/]{0,}$/.test(val))  return false;
    if (/[\u4e00-\u9fa5]/.test(val))  return true;
    if (/[a-zA-Z]\/[a-zA-Z]/g.test(val) && val.split('/').length === 2) return true;
    return false;
  };
  Vue.validator('chEnSpace', {
    message: '只能输入纯汉字或者英文与“/”组合',
    check: chEnSpace
  });

  /**
   * 不能是sql注入字符
   */
  let notInjectValitor = function (val) {
    return !/[%'!]+/.test(val);
  };
  Vue.validator('notinject', {
    message: '不能输入%、\'、!',
    check: notInjectValitor
  });
  /**
   * 酒店到店时间比对验证
   */
  Vue.validator('timeCompareEarly', {
    message: '最早到店时间需小于最晚到店时间',
    check: function (value, latetime) {
      if (value.split(':')[0] > latetime.split(':')[0]) {
        return false;
      }
      if (value.split(':')[0] === latetime.split(':')[0] && value.split(':')[1] > latetime.split(':')[1]) {
        return false;
      }
      return true;
    }
  });
  Vue.validator('timeCompareLate', {
    message: '最早到店时间需小于最晚到店时间',
    check: function (value, earlytime) {
      if (earlytime.split(':')[0] > value.split(':')[0]) {
        return false;
      }
      if (earlytime.split(':')[0] === value.split(':')[0] && earlytime.split(':')[1] > value.split(':')[1]) {
        return false;
      }
      return true;
    }
  });

  // 添加验证的js方法
  let ValidatorPlugin = {};

  ValidatorPlugin.install = function (Vuevm) {
    /**
     * 验证并跳转到指定位置
     */
    Vuevm.prototype.$validate2 = function (...args) {
      this.$validate.apply(this, args);
      this.$nextTick(() => {
        let scrollOffset = $('.validate.tip:visible').first().offset();
        scrollOffset && $("body,html").animate({
          scrollTop: (scrollOffset.top - 200)
        }, 0);
      });
    };
    /**
     * 串行验证参数方法
     */
    Vuevm.prototype.$validateByParams = function (text, funArr) {
      for (let i = funArr.length - 1; i >= 0; i--) {
        if (!funArr[i](text))  return false;
      }
      return true;
    };
    /**
     * js邮箱验证
     */
    Vuevm.prototype.$jsValidateEmail = emailValitor;
    /**
     * js邮箱长度验证
     */
    Vuevm.prototype.$jsValidateEmailLen = emailLenValitor;
    /**
     * js手机验证
     */
    Vuevm.prototype.$jsValidateMobile = mobileValitor;
    /**
     * js日期验证
     */
    Vuevm.prototype.$jsValidateDate = dateValitor;
    /**
     *  js信用卡验证
     */
    Vuevm.prototype.$jsValidateCredit = creditValitor;
    /**
     * js必填验证
     */
    Vuevm.prototype.$jsValidateRequired = function (val) {
      if (typeof val === 'undefined' || val === null)  return false;
      return val !== '';
    };
    /**
     * js时间验证
     */
    Vuevm.prototype.$jsValidateTime = timeValitor;

    /**
     * js常客卡号验证
     */
    Vuevm.prototype.$jsValidatePsgcard = psgcardValitor;

    /**
     * js航空公司编码验证
     */
    Vuevm.prototype.$jsValidateAircode = aircodeValitor;

    /**
     * js证件号码验证 护照
     */
    Vuevm.prototype.$jsValidatePassport = passportValitor;

    /**
     * js证件号码验证 身份证
     */
    Vuevm.prototype.$jsValidateIdCard = idCardValitor;

    /**
     * js纯英文验证
     */
    Vuevm.prototype.$jsValidateEn = enValitor;

    /**
     * js英文主机姓名验证
     */
    Vuevm.prototype.$jsValidateHostname = hostnameValitor;


    /**
     * js中文或英文或空格
     */
    Vuevm.prototype.$jsValidateChEnSpace = chEnSpace;

    Vuevm.prototype.$jsValidateHotelTel = hoteltelValitor;
  };

  Vue.use(ValidatorPlugin);
}

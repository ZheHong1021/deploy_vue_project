

const requiredRules = (v) => !!v || '此欄位必須填寫!';

const emailRules = v => {
  const pattern = /.+@.+/
  return pattern.test(v) || '必須為信箱格式';
};

const phoneRules = v => {
    const pattern = /^\d{10}$/;
    return !v || pattern.test(v) || '手機號碼必須為10碼';
};

const usernameRules = (v) =>  !v || v.length >= 4 || '帳號必須超過4個字元'

const passwordRules = (v) =>  !v || v.length >= 8 || '密碼必須超過8個字元'

const confirmPasswordRules = (password) => (v) => v === password || '密碼必須一致'

const minLengthRules = min => (v) => v && v.length >= min || `最小字元長度: ${min}`;

const maxLengthRules = max => (v) => v && v.length <= max || `最大字元長度: ${max}`;

const limitNumberRangeRules = (min, max) => (v) => !isNaN(parseFloat(v)) && v >= min && v <= max || `請填入${min}~${max}的數字`

const isNumbericRules = v => /^[-+]?\d+(\.\d+)?$/.test(v) || '請確認填入的是否為數字';

export {
    requiredRules,
    emailRules,
    phoneRules,
    usernameRules,
    passwordRules,
    confirmPasswordRules,
    minLengthRules,
    maxLengthRules,
    limitNumberRangeRules,
    isNumbericRules,
}



export const FIELD_REQUIRED_MESSAGE = 'This field is required.'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid. (example@nexus.com)'
export const ACCOUNT_ID_RULE = /^[a-zA-Z0-9]+$/
export const ACCOUNT_ID_RULE_MESSAGE = 'Account ID is invalid. (only accept letters and numbers)'
export const OTP_RULE = /^\d{6}$/
export const OTP_RULE_MESSAGE = 'OTP is invalid. (only accept 6 numbers)'
export const PASSWORD_RULE = /^\d{6}$/
export const PASSWORD_RULE_MESSAGE = 'Mật khẩu phải chính xác 6 ký tự số.'
export const PASSWORD_CONFIRMATION_MESSAGE = 'Password Confirmation does not match!'


export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return 'File cannot be blank.'
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size exceeded. (10MB)'
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return 'File type is invalid. Only accept jpg, jpeg and png'
  }
  return null
}

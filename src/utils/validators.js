export const FIELD_REQUIRED_MESSAGE = 'This field is required.'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid. (example@nexus.com)'
export const PASSWORD_RULE = /^\d{6}$/
export const PASSWORD_RULE_MESSAGE = 'Mật khẩu phải chính xác 6 ký tự số.'
export const PASSWORD_CONFIRMATION_MESSAGE = 'Password Confirmation does not match!'
export const SALARY_RULE_MESSAGE = 'Salary must be greater than 0'
export const GENDER_RULE_MESSAGE = 'Gender is required.'
export const DOB_RULE_MESSAGE = 'Date of Birth is invalid.'
export const DOB_RULE = (value) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(value)) return false

  const inputDate = new Date(value)
  const currentDate = new Date()

  return inputDate <= currentDate
}

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

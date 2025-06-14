import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/employeeSlice.js'
import { accountReducer } from './user/accountSlice.js'
import { planReducer } from './plans/planSlice.js'
//config redux-persist
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


//config persist
const rootPersistConfig = {
  key: 'root', //key của cái persist do chúng ta chỉ định, chứ để mặc định là root
  storage: storage, //biến storage ở trên - lưu vào localstorage
  whitelist: ['user', 'account', 'plan'], //định nghĩa các slice dữ liệu được phép duy trì qua mỗi lần f5 trình duyệt
  blacklist: [] //định nghĩa các slice dữ liệu không được phép duy trì qua mỗi lần f5 trình duyệt
}

//combine các reducer trong dự án của chúng ta ở đây
const rootReducer = combineReducers({
  user: userReducer,
  account: accountReducer,
  plan: planReducer
})

//persist các reducer trong dự án của chúng ta ở đây
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

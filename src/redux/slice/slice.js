import { createSlice } from '@reduxjs/toolkit'
import { getFormDataLS } from '../../utils/getFormDataLS'
import { AuthStatus } from '../types'

const { LSdata } = getFormDataLS()

const initialState = {
  usersName: LSdata.name,
  password_: LSdata.password,
  isPasswordVisible: LSdata.isVisible,
  phoneNumber_: LSdata.number,
  saveUserData: LSdata.isSave,
  avatarFile: '',
  code: '',
  isAuth: AuthStatus.OFF,
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUsersName(state, action) {
      state.usersName = action.payload
    },
    setPassword(state, action) {
      state.password_ = action.payload
    },
    changePasswordVisibility(state, action) {
      state.isPasswordVisible = action.payload
    },
    setPhoneNumber(state, action) {
      state.phoneNumber_ = action.payload
    },
    setAvatarFile(state, action) {
      state.avatarFile = action.payload
    },
    changeSaveUser(state, action) {
      state.saveUserData = action.payload
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload
    },
  },
})

export const {
  setUsersName,
  setPassword,
  changePasswordVisibility,
  setPhoneNumber,
  changeSaveUser,
  setAvatarFile,
  setIsAuth,
} = userDataSlice.actions

export default userDataSlice.reducer

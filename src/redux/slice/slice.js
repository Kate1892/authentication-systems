import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersName: '',
  password: '',
  isPasswordVisible: false,
  phoneNumber: '',
  saveUserData: false,
  avatarFile: '',
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUsersName(state, action) {
      state.usersName = action.payload
    },
    setPassword(state, action) {
      state.password = action.payload
    },
    changePasswordVisibility(state, action) {
      state.isPasswordVisible = !state.isPasswordVisible
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload
    },
    changeSaveUser(state, action) {
      state.saveUserData = !state.saveUserData
    },
  },
})

export const {
  setUsersName,
  setPassword,
  changePasswordVisibility,
  setPhoneNumber,
  changeSaveUser,
} = logSlice.actions

export default logSlice.reducer

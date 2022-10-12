import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFormDataLS } from '../../utils/getFormDataLS'
import { AuthStatus } from '../types'
import { fetchAuth, fetchRegister, fetchAuthMe } from './asyncAction'

const { LSdata } = getFormDataLS()

const initialState = {
  // LSdata
  data: null,
  status: '',
  isPasswordVisible: LSdata.isVisible,
  code: '',

  usersName: LSdata.name,
  password_: LSdata.password,
  phoneNumber_: LSdata.number,

  saveUserData: LSdata.isSave,
  code: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.data = null
    },
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
    changeSaveUser(state, action) {
      state.saveUserData = action.payload
    },
  },
  extraReducers: {
    //auth
    [fetchAuth.pending]: state => {
      state.data = null
      state.status = 'loading'
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = 'success'
    },
    [fetchAuth.rejected]: state => {
      state.data = null
      state.status = 'error'
    },
    //me
    [fetchAuthMe.pending]: state => {
      state.data = null
      state.status = 'loading'
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = 'success'
    },
    [fetchAuthMe.rejected]: state => {
      state.data = null
      state.status = 'error'
    },
    //register
    [fetchRegister.pending]: state => {
      state.data = null
      state.status = 'loading'
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = 'success'
    },
    [fetchRegister.rejected]: state => {
      state.data = null
      state.status = 'error'
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
  logout,
} = authSlice.actions

export const selectIsAuth = state => Boolean(state.auth.data)

export default authSlice.reducer

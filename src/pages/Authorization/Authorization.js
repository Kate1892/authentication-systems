import { NavLink } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsersData } from '../../redux/slices/selectors'
import {
  setPassword,
  setPhoneNumber,
  changePasswordVisibility,
  changeSaveUser,
  setIsAuth,
} from '../../redux/slices/slice'
import { useInput } from '../../hooks/hooks'
import {
  PasswordInput,
  PasswordVisabInput,
  PhoneNumberInput,
} from '../../components/Inputs/Inputs'
import styles from '../forms.module.scss'
import { useGetDataLS } from '../../hooks/hooks'
import { AuthStatus } from '../../redux/types'

import { selectIsAuth } from '../../redux/slices/slice'
import { fetchAuth } from '../../redux/slices/asyncAction'

export const Authorization = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  const { phoneNumber_, isPasswordVisible, password_, saveUserData } =
    useSelector(selectUsersData)

  const phoneNumber = useInput(
    phoneNumber_,
    setPhoneNumber,
    { isEmpty: true },
    true
  )
  const password = useInput(password_, setPassword, { isEmpty: true })

  // const handleSubmit = () => {
  //   e.preventDefault()
  //   console.log(e.target[0].value)
  //   console.log(e.target[1].value)
  // }

  const handleSubmit = async e => {
    e.preventDefault()
    const dataObj = {
      phoneNumber: e.target[0].value,
      password: e.target[1].value,
    }
    console.log(dataObj)

    const data = await dispatch(fetchAuth(dataObj))
    if (!data.payload) {
      return alert('Ошибка авторизации')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  const setPasswordVisibility = e => {
    if (e.target.checked) {
      dispatch(changePasswordVisibility(true))
    } else {
      dispatch(changePasswordVisibility(false))
    }
  }

  const setSaveUserData = e => {
    if (e.target.checked) {
      dispatch(changeSaveUser(true))
    } else {
      dispatch(changeSaveUser(false))
    }
  }

  useGetDataLS({
    phoneNumber_,
    password_,
    isPasswordVisible,
    saveUserData,
  })

  if (isAuth) {
    return <Navigate to='/personal-area' />
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.authorizationBox}>
        <h2>Авторизация</h2>
        <div className={styles.inputBox}>
          <PhoneNumberInput
            cn={styles.inputItem}
            labelStyle={styles.label}
            errorStyle={styles.errors}
            onChange={phoneNumber.onChange}
            onBlur={phoneNumber.onBlur}
            onKeyDown={phoneNumber.onKeyDown}
            onPaste={phoneNumber.onPaste}
            value={phoneNumber.value}
            isDirty={phoneNumber.isDirty}
            isEmpty={phoneNumber.isEmpty}
            minLengthError={phoneNumber.minLengthError}
            errorMessage={phoneNumber.errorMessage}
          />
        </div>
        <div className={styles.inputBox}>
          <PasswordInput
            cn={styles.inputItem}
            labelStyle={styles.label}
            errorStyle={styles.errors}
            onChange={password.onChange}
            onBlur={password.onBlur}
            isPasswordVisible={isPasswordVisible}
            value={password.value}
            isDirty={password.isDirty}
            isEmpty={password.isEmpty}
            errorMessage={password.errorMessage}
          />
          <div className={styles.checkboxes}>
            <div>
              <PasswordVisabInput
                cn={styles.checkItem}
                isPasswordVisible={isPasswordVisible}
                setPasswordVisibility={setPasswordVisibility}
              />
            </div>
            <div>
              <label className={styles.checkItem}>
                <input
                  checked={saveUserData}
                  onChange={e => setSaveUserData(e)}
                  type='checkbox'
                />
                Запомнить меня
              </label>
            </div>
          </div>
        </div>
        <div className={styles.buttonBlock}>
          <button
            className={styles.submitButton}
            disabled={!phoneNumber.isInputValid || !password.isInputValid}
            type='submit'
          >
            войти
          </button>
          <div className={styles.formLinks}>
            <NavLink className={styles.link} to='/password-recovery'>
              Забыли пароль?
            </NavLink>
            <NavLink className={styles.link} to='/registration'>
              Регистрация
            </NavLink>
          </div>
        </div>
      </form>
    </>
  )
}

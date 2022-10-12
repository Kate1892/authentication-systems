import React, { useState, useRef } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { selectUsersData } from '../../redux/slices/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from '../../hooks/hooks'
import {
  PhoneNumberInput,
  PasswordVisabInput,
  PasswordInput,
  NameInput,
} from '../../components/Inputs/Inputs'
import {
  setPhoneNumber,
  setPassword,
  changePasswordVisibility,
  setUsersName,
} from '../../redux/slices/slice'
import styles from '../forms.module.scss'
import { useGetDataLS } from '../../hooks/hooks'
import axios from '../../axios'
import { selectIsAuth } from '../../redux/slices/slice'
import { fetchRegister } from '../../redux/slices/asyncAction'

export const Registration = () => {
  const dispatch = useDispatch()
  const [avatarUrl, setAvatarUrl] = useState('')
  const fileInputRef = useRef(null)
  const isAuth = useSelector(selectIsAuth)

  const setPasswordVisibility = e => {
    if (e.target.checked) {
      dispatch(changePasswordVisibility(true))
    } else {
      dispatch(changePasswordVisibility(false))
    }
  }

  const { phoneNumber_, password_, isPasswordVisible, avatarFile, usersName } =
    useSelector(selectUsersData)

  const phoneNumber = useInput(
    phoneNumber_,
    setPhoneNumber,
    { isEmpty: true },
    true
  )
  const password = useInput(password_, setPassword, { isEmpty: true })
  const name = useInput(usersName, setUsersName, { isEmpty: true })

  const handleImageChange = async e => {
    try {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      const { data } = await axios.post('/upload', formData)
      setAvatarUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('Ошибка загрузки файла')
    }
  }

  const imageUploadButtonClick = e => {
    e.preventDefault()
    fileInputRef.current.click()
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const dataObj = {
      fullName: e.target[0].value,
      phoneNumber: e.target[1].value,
      password: e.target[2].value,
      avatarUrl,
    }
    console.log(dataObj)
    const data = await dispatch(fetchRegister(dataObj))
    if (!data.payload) {
      return alert('Ошибка регистрации')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  useGetDataLS({
    phoneNumber_,
    password_,
    isPasswordVisible,
    usersName,
  })

  if (isAuth) {
    return <Navigate to='/personal-area' />
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.authorizationBox}>
        <h2>Регистрация</h2>
        <div className={styles.inputBox}>
          <NameInput
            cn={styles.inputItem}
            labelStyle={styles.label}
            errorStyle={styles.errors}
            onChange={name.onChange}
            onBlur={name.onBlur}
            value={name.value}
            isDirty={name.isDirty}
            isEmpty={name.isEmpty}
            errorMessage={name.errorMessage}
          />
        </div>
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
          </div>
        </div>
        <div className={styles.inputBox}>
          <input
            type='file'
            style={{ display: 'none' }}
            onChange={e => handleImageChange(e)}
            ref={fileInputRef}
          />
          <button
            className={styles.imageUpload}
            onClick={e => imageUploadButtonClick(e)}
          >
            Выбрать изображение
          </button>
        </div>
        <div
          className={
            avatarUrl
              ? styles.imagePreviewBox
              : styles.imagePreviewBox + styles.display
          }
        >
          {avatarUrl && (
            <img
              src={`https://shelygina-forms.herokuapp.com${avatarUrl}`}
              alt='avatar'
              height={100}
            />
          )}
        </div>
        <div className={styles.buttonBlock}>
          <button className={styles.submitButton} type='submit'>
            зарегистрироваться
          </button>
          <div className={styles.formLinks}>
            <NavLink className={styles.link} to='/authorization'>
              Авторизация
            </NavLink>
          </div>
        </div>
      </form>
    </>
  )
}

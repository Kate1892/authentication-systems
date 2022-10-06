import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { selectUsersData } from '../../redux/slice/selectors'
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
  setAvatarFile,
  setUsersName,
} from '../../redux/slice/slice'
import styles from '../forms.module.scss'
import { useGetDataLS } from '../../hooks/hooks'

export const Registration = () => {
  const dispatch = useDispatch()

  const setPasswordVisibility = e => {
    if (e.target.checked) {
      dispatch(changePasswordVisibility(true))
    } else {
      dispatch(changePasswordVisibility(false))
    }
  }

  const {
    phoneNumber_,
    code,
    password_,
    isPasswordVisible,
    avatarFile,
    usersName,
  } = useSelector(selectUsersData)

  const phoneNumber = useInput(
    phoneNumber_,
    setPhoneNumber,
    { isEmpty: true },
    true
  )
  const password = useInput(password_, setPassword, { isEmpty: true })
  const name = useInput(usersName, setUsersName, { isEmpty: true })

  const handleImageChange = e => {
    if (e.target.files.length) {
      dispatch(setAvatarFile(URL.createObjectURL(e.target.files[0])))
    }
  }
  const handleImageUpload = () => {}

  const imageUploadButtonClick = e => {
    e.preventDefault()
    fileInputRef.current.click()
  }

  const fileInputRef = useRef(null)

  useGetDataLS({
    phoneNumber_,
    password_,
    isPasswordVisible,
    usersName,
    avatarFile,
  })

  return (
    <>
      <form className={styles.authorizationBox}>
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
            avatarFile
              ? styles.imagePreviewBox
              : styles.imagePreviewBox + styles.display
          }
        >
          {avatarFile && <img src={avatarFile} alt='avatar' height={100} />}
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

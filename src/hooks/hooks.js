import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { onChangePN, onKeyDownPN, onPastePN } from '../utils/functions'

export const useInput = (
  value,
  setValue,
  validations,
  isPhoneNumber = false
) => {
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)
  const dispatch = useDispatch()

  const onBlur = () => {
    setDirty(true)
  }

  if (isPhoneNumber) {
    const onChange = e => {
      let curValue = onChangePN(e)
      dispatch(setValue(curValue))
    }
    const onKeyDown = e => {
      let curValue = onKeyDownPN(e)
      dispatch(setValue(curValue))
    }
    const onPaste = e => {
      let curValue = onPastePN(e)
      dispatch(setValue(curValue))
    }
    return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid,
      onKeyDown,
      onPaste,
    }
  }

  const onChange = e => {
    dispatch(setValue(e.target.value.trim()))
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  }
}

export const useValidation = (value, validations) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  const [isEmpty, setEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [isInputValid, setInputValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [withSpace, setWithSpace] = useState(false)

  useEffect(() => {
    console.log(value)
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (value) {
            setEmpty(false)
            setErrorMessage('')
          } else {
            setEmpty(true)
            setErrorMessage('Обязательное поле!')
          }
          break
        case 'minLength':
          if (value.length > 0 && value.length < validations[validation]) {
            setMinLengthError(true)
            setErrorMessage(
              `Минимальная длинна ${validations[validation]} символов!`
            )
          } else if (!value.length) {
            setMinLengthError(false)
            setEmpty(true)
            setErrorMessage('Обязательное поле!')
          } else {
            setMinLengthError(false)
            setErrorMessage('')
          }
          break
        case 'isEmail':
          EMAIL_REGEXP.test(value) ? setEmailError(false) : setEmailError(true)
          break

        case 'withSpaces':
          const reg = /[^\s]/gim
          if (reg.test(value)) {
            setWithSpace(false)
            setErrorMessage('')
          } else {
            setWithSpace(true)
            setErrorMessage('Пароль не должен содержать пробелы')
          }
          break
      }
    }
  }, [value])

  useEffect(() => {
    if (isEmpty || minLengthError || emailError || withSpace) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, minLengthError, emailError, withSpace])
  return {
    isEmpty,
    minLengthError,
    emailError,
    isInputValid,
    errorMessage,
    withSpace,
  }
}

export const useGetDataLS = ({
  phoneNumber_,
  password_ = '',
  isPasswordVisible = false,
  saveUserData = false,
  usersName = '',
  avatarFile = '',
}) => {
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current === true) {
      const json = JSON.stringify({
        number: phoneNumber_,
        password: password_,
        isVisible: isPasswordVisible,
        name: usersName,
        avatar: avatarFile,
        isSave: saveUserData,
      })
      localStorage.setItem('formsData', json)
    }
    isMounted.current = true
  }, [
    phoneNumber_,
    password_,
    isPasswordVisible,
    usersName,
    avatarFile,
    saveUserData,
  ])
}

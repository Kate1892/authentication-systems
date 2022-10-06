import React from 'react'

const HandleLabels = ({
  title,
  labelStyle,
  errorStyle,
  isDirty,
  isEmpty,
  minLengthError,
  errorMessage,
}) => {
  return (
    <>
      <label className={labelStyle}>
        {isDirty && (isEmpty || minLengthError) ? (
          <span>
            {title} | <span className={errorStyle}>{errorMessage}</span>
          </span>
        ) : (
          <span>{title}</span>
        )}
      </label>
    </>
  )
}

export const PhoneNumberInput = ({
  cn,
  labelStyle,
  errorStyle,
  onChange,
  onBlur,
  onKeyDown,
  onPaste,
  value,
  isDirty,
  isEmpty,
  minLengthError,
  errorMessage,
}) => {
  return (
    <>
      <input
        className={cn}
        value={value}
        onChange={e => onChange(e)}
        onBlur={e => onBlur(e)}
        onKeyDown={e => onKeyDown(e)}
        onPaste={e => onPaste(e)}
        maxLength={18}
        name='phoneNumber'
        type='tel'
      ></input>
      <HandleLabels
        title={'Номер'}
        labelStyle={labelStyle}
        errorStyle={errorStyle}
        isDirty={isDirty}
        isEmpty={isEmpty}
        minLengthError={minLengthError}
        errorMessage={errorMessage}
      />
    </>
  )
}

export const PasswordInput = ({
  cn,
  labelStyle,
  errorStyle,
  onChange,
  onBlur,
  isPasswordVisible,
  value,
  isDirty,
  isEmpty,
  errorMessage,
}) => {
  return (
    <>
      <input
        className={cn}
        value={value}
        onChange={e => onChange(e)}
        onBlur={e => onBlur(e)}
        name='password'
        type={isPasswordVisible ? 'text' : 'password'}
      ></input>
      <HandleLabels
        title={'Пароль'}
        labelStyle={labelStyle}
        errorStyle={errorStyle}
        isDirty={isDirty}
        isEmpty={isEmpty}
        errorMessage={errorMessage}
      />
    </>
  )
}

export const PasswordVisabInput = ({
  cn,
  isPasswordVisible,
  setPasswordVisibility,
}) => {
  return (
    <label className={cn}>
      <input
        checked={isPasswordVisible}
        onChange={e => setPasswordVisibility(e)}
        type='checkbox'
      />
      Показать пароль
    </label>
  )
}

export const CodeInput = () => {
  return <div>code</div>
}

export const NameInput = ({
  cn,
  labelStyle,
  errorStyle,
  onChange,
  onBlur,
  value,
  isDirty,
  isEmpty,
  errorMessage,
}) => {
  return (
    <>
      <input
        className={cn}
        type='text'
        name='name'
        value={value}
        onChange={e => onChange(e)}
        onBlur={e => onBlur(e)}
      ></input>
      <HandleLabels
        title={'Имя'}
        labelStyle={labelStyle}
        errorStyle={errorStyle}
        isDirty={isDirty}
        isEmpty={isEmpty}
        errorMessage={errorMessage}
      />
    </>
  )
}

export const AvatarInput = () => {
  return <div>avatar</div>
}

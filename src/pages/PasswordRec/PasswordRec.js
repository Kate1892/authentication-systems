import { NavLink } from 'react-router-dom'
import { selectUsersData } from '../../redux/slices/selectors'
import { useSelector } from 'react-redux'
import { useInput } from '../../hooks/hooks'
import { PhoneNumberInput } from '../../components/Inputs/Inputs'
import { setPhoneNumber } from '../../redux/slices/slice'
import styles from '../forms.module.scss'
import { useGetDataLS } from '../../hooks/hooks'

export const PasswordRec = () => {
  const { phoneNumber_ } = useSelector(selectUsersData)
  const phoneNumber = useInput(
    phoneNumber_,
    setPhoneNumber,
    { isEmpty: true },
    true
  )
  useGetDataLS({ phoneNumber_ })

  return (
    <>
      <form className={styles.authorizationBox}>
        <h2>Восстановление пароля</h2>
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
          <input
            className={styles.inputItem}
            type='tel'
            // placeholder='Введите код из смс'
          ></input>
          <label className={styles.label}>Код</label>
        </div>
        <div className={styles.buttonBlock}>
          <button className={styles.submitButton} type='submit'>
            восстановить
          </button>
          <div className={styles.formLinks}>
            <NavLink className={styles.link} to='/authorization'>
              Вспомнил пароль!
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

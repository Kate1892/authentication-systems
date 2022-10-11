import React from 'react'
import styles from '../forms.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsersData } from '../../redux/slices/selectors'
import { logout } from '../../redux/slices/slice'
import { useNavigate } from 'react-router-dom'

export const PersonalArea = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickLogout = e => {
    e.preventDefault()
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
      navigate('/authorization')
    }
  }

  const { data } = useSelector(selectUsersData)
  return (
    <>
      <form className={styles.authorizationBox}>
        {!!data && (
          <>
            <h2>Hello, {data.userData.fullName}</h2>

            <div className={styles.buttonBlock}>
              <button
                onClick={e => onClickLogout(e)}
                className={styles.submitButton}
              >
                выход
              </button>
            </div>
          </>
        )}
      </form>
    </>
  )
}

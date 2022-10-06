import React from 'react'
import styles from '../forms.module.scss'
import { useSelector } from 'react-redux'
import { selectUsersData } from '../../redux/slice/selectors'

export const PersonalArea = () => {
  const { usersName } = useSelector(selectUsersData)
  return (
    <>
      <form className={styles.authorizationBox}>
        {!!usersName.length && (
          <>
            <h2>Hello, {usersName}</h2>

            <div className={styles.buttonBlock}>
              <button className={styles.submitButton}>выход</button>
            </div>
          </>
        )}
      </form>
    </>
  )
}

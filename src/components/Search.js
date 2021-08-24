import React, {useContext, useState} from 'react'
import {AlertContext} from "../context/alert/alertContext";
import {GithubContext} from "../context/github/githubContext";

export const Search = () => {
  const {show, hide} = useContext(AlertContext)
  const {search, clearUsers} = useContext(GithubContext)
  const [value, setValue] = useState('')

  const onSubmit = e => {
    if (e.key === 'Enter') {
      if (value.trim()) {
        search(value.trim())
        hide()
      } else {
        show('Поле не может быть пустым')
        clearUsers()
      }
    }
  }

  return (
    <div className="form-group">
      <input
        type="text"
        className='form-control'
        placeholder='Введите ник пользователя...'
        onKeyPress={onSubmit}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}
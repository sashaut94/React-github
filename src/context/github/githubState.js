import React, {useReducer} from 'react'
import {GithubContext} from "./githubContext";
import {GithubReducer} from "./githubReducer";
import {CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING} from "../types";
import axios from "axios";

export const GithubState = ({children}) => {
  const initialState = {
    loading: false,
    user: {},
    users: [],
    repos: []
  }

  const clientId = process.env.REACT_APP_CLIENT_ID
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET

  const withCreds = (url) => {
    return `${url}client_id=${clientId}&client_secret=${clientSecret}`
  }

  const search = async value => {
    try {
      setLoading()
      const response = await axios.get(withCreds(`https://api.github.com/search/users?q=${value}&`))
      dispatch({type: SEARCH_USERS, payload: response.data.items})
    } catch (e) {
      console.log(e)
    }
  }

  const getUser = async name => {
    try {
      setLoading()
      const response = await axios.get(withCreds(`https://api.github.com/users/${name}?`))
      dispatch({type: GET_USER, payload: response.data})
    } catch (e) {
      console.log(e)
    }
  }

  const getRepos = async name => {
    try {
      const response = await axios.get(withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`))
      dispatch({type: GET_REPOS, payload: response.data})
    } catch (e) {
      console.log(e)
    }
  }

  const setLoading = () => dispatch({type: SET_LOADING})

  const clearUsers = () => dispatch({type: CLEAR_USERS})

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  const {loading, user, users, repos} = state

  return (
    <GithubContext.Provider value={{search, getUser, getRepos, clearUsers, loading, user, users, repos}}>
      {children}
    </GithubContext.Provider>
  )
}
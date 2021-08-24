import React, {useContext} from 'react'
import {Search} from "../../components/Search"
import {Card} from "../../components/Card"
import './Home.scss'
import {GithubContext} from "../../context/github/githubContext";
import {Loader} from "../../components/Loader/Loader";

export const Home = () => {
  const {users, loading} = useContext(GithubContext)
  return (
    <>
      <Search/>
      {loading
        ? <Loader/>
        : <div className="row">
          {users.map((user) => (
            <div
              className="col-sm-4 mb-4"
              key={user.id}
            >
              <Card user={user}/>
            </div>
          ))}
        </div>
      }
    </>
  )
}
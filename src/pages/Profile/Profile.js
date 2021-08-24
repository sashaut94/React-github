import React, {useContext, useEffect} from 'react'
import {GithubContext} from "../../context/github/githubContext"
import {Link} from "react-router-dom"
import {Loader} from "../../components/Loader/Loader"
import {Repos} from "../../components/Repos/Repos"
import './Profile.scss'

export const Profile = ({match}) => {
  const {loading, getUser, getRepos, user, repos} = useContext(GithubContext)

  const {name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists} = user

  useEffect(() => {
    getUser(match.params.name)
    getRepos(match.params.name)
    // eslint-disable-next-line
  }, [])

  return (
    loading
      ? <Loader/>
      : <>
        <Link to='/' className="btn btn-link">На главную</Link>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 text-center">
                <img
                  className='card-img-top'
                  src={avatar_url}
                  alt="name"/>
                <h1 className="card-title">{name}</h1>
                {location && <p>Местоположение: {location}</p>}
              </div>
              <div className="col">
                {
                  bio && <>
                    <h3>BIO</h3>
                    <p>{bio}</p>
                  </>
                }
                <a
                  href={html_url}
                  className='btn btn-dark'
                  target='_blank'
                  rel="noreferrer"
                >Открыть профиль</a>
                <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
                  {login && <li>
                    <strong>UserName: </strong> {login}
                  </li>}

                  {company && <li>
                    <strong>Компания: </strong> {company}
                  </li>}

                  {blog && <li>
                    <strong>Website: </strong> {blog}
                  </li>}
                </ul>

                <div className='my-wrapper'>
                  <div className="badge bg-primary">Подписчики {followers}</div>
                  <div className="badge bg-success">Подписан {following}</div>
                  <div className="badge bg-info">Репозитории {public_repos}</div>
                  <div className="badge bg-dark">Gists {public_gists}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Repos repos={repos}/>
      </>
  )
}
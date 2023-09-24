import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"

function Header(){
    const {setUserInfo,userInfo} = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials : 'include',
        }).then(response => {
            response.json().then(userInfo => {
            setUserInfo(userInfo)
            })
        })
    }, [])

     function logout(){
        fetch("http://localhost:4000/logout",{
            credentials : 'include',
            method : 'POST',
        })
        setUserInfo({})
     }
    return(
        <header>
        <Link to ="/" className = "logo">V.R. Blogs</Link>
        <nav>
            {userInfo.username && (
                <>
                <Link to='/create'>Create your Post</Link>
                <a onClick={logout}>Logout {userInfo.username}</a>
                </>
            )}
            {!userInfo.username && (
                <>
                <Link to ="/login">Login</Link>
                <Link to ="/register">Register</Link>
                </>
            )}
        </nav>
      </header>
    )
}

export default Header
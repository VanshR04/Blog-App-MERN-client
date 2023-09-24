import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function RegisterPage(){
    const [username,setUsername] = useState('')
    const [pw,setpw] = useState('')
    const [redirect,setRedirect] = useState(false)

    async function register(ev){
        ev.preventDefault()
        const response = await fetch('http://localhost:4000/register', {
            method:'POST',
            body :JSON.stringify({username,pw}),
            headers:{
                'Content-type' : 'application/json'
            },
        })
        console.log(response)
        if(response.ok){
            setRedirect(true)
        }

        if(redirect){
            return <Navigate to={'/login'} />
        }
    }

    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
                <input 
                type="text" 
                placeholder="Username" 
                name="Username"
                value={username} 
                onChange={ev => setUsername(ev.target.value)}
                />
                <input 
                type="password" 
                placeholder="Password"
                name="pw"
                required
                value={pw}
                onChange={ev => setpw(ev.target.value)}
                />
                <button type="submit">Register</button>
            </form>
    )
}
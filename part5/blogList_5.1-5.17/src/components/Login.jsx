import { useState } from 'react'
import PageTitle from "./PageTitle"
import LoginInput from "./InputField"
import loginService from '../services/login'
import PropTypes from 'prop-types'

const Login = ({ setUserLoggedIn, showNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            localStorage.setItem('loggedUser', JSON.stringify(user))
            setUserLoggedIn(true)
            showNotification('success', `Welcome ${user.name || user.username}`)
            setUsername('')
            setPassword('')
        } catch (error) {
            setUsername('')
            setPassword('')
            showNotification('error', error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Login failed')
        }
    }

    return (
        <div>
            <PageTitle title="log in to application" />
            <form onSubmit={onSubmitLogin}>
                <LoginInput label="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                <LoginInput label="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    setUserLoggedIn: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default Login
import LogoutButton from './LogoutButton'

const LoggedInUser = () => {
    const user = JSON.parse(localStorage.getItem('loggedUser'))
    return (
        <div>
            {user && `${user.name} logged in`}
            <LogoutButton />
        </div>
    )
}

export default LoggedInUser
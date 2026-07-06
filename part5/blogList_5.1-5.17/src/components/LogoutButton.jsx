const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton
import { useState } from 'react'
import Notifications from './Notifications'
import Login from './Login'
import ListOfBlogs from './ListOfBlogs'

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem('loggedUser') !== null)
  const [notification, setNotification] = useState({ type: null, message: null })

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification({ type: null, message: null })
    }, 5000)
  }

  if (userLoggedIn) {
    return (
      <div>
        <Notifications type={notification.type} message={notification.message} />
        <ListOfBlogs
          blogs={blogs}
          setBlogs={setBlogs}
          showNotification={showNotification}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Notifications type={notification.type} message={notification.message} />
        <Login
          setUserLoggedIn={setUserLoggedIn}
          showNotification={showNotification}
        />
      </div>
    )
  }
}

export default BlogPage
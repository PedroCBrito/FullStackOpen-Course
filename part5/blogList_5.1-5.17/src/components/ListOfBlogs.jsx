import PageTitle from './PageTitle'
import Blog from './Blog'
import LoggedInUser from './LoggedInUser'
import { useEffect } from 'react'
import blogService from '../services/blogs'
import CreateBlogForm from './CreateBlogForm'
import PropTypes from 'prop-types'
import Togglable from './Togglable'


const ListOfBlogs = ({ blogs, setBlogs, showNotification }) => {

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [setBlogs])

    return (
        <div>
            <PageTitle title="blogs" />
            <LoggedInUser />
            <br />
            <Togglable buttonLabel="create new blog">
                <CreateBlogForm setBlogs={setBlogs} showNotification={showNotification} />
            </Togglable>
            <br />
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blogList={blogs} setBlogList={setBlogs} blog={blog} showNotification={showNotification} />
            )}
        </div>
    )
}

ListOfBlogs.propTypes = {
    blogs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            likes: PropTypes.number.isRequired
        })
    ).isRequired,
    setBlogs: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}



export default ListOfBlogs
import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogDetails = ({ blogList, setBlogList, blog, showNotification }) => {
    const [blogLikes, setBlogLikes] = useState(blog.likes)
    const [isLiked, setIsLiked] = useState(false)

    const toggleLike = () => {
        const newLikesCount = isLiked ? blogLikes - 1 : blogLikes + 1
        
        const updatedBlog = {
            ...blog,
            likes: newLikesCount
        }
        
        blogService.update(blog.id, updatedBlog)
            .then(returnedBlog => {
                setBlogLikes(returnedBlog.likes)
                setIsLiked(!isLiked)
                const action = !isLiked ? 'liked' : 'unliked'
                showNotification('success', `you ${action} ${returnedBlog.title} by ${returnedBlog.author}`)
            })
            .catch(error => {
                showNotification('error', 'Failed to update blog')
            })
    }

    const isUserTheOwner = () => {
        const loggedUserJSON = localStorage.getItem('loggedUser')
        if (!loggedUserJSON) return false
        const loggedUser = JSON.parse(loggedUserJSON)
        return blog.user && blog.user === loggedUser.id
    }

    const toggleRemove = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            blogService.remove(blog.id)
                .then(() => {
                    setBlogList(blogs => blogs.filter(b => b.id !== blog.id))
                    showNotification('success', `Blog ${blog.title} removed successfully`)
                })
                .catch(error => {
                    showNotification('error', 'Failed to remove blog')
                })
        }
    }

    return (
        <div>
            <div>{blog.title} </div>
            <div>{blog.url}</div>
            <div>
                {blogLikes} likes 
                <button onClick={toggleLike}>{isLiked ? 'unlike' : 'like'}</button>
            </div>
            <div>Author: {blog.author}</div>
            {isUserTheOwner() && (
                <button onClick={toggleRemove} style={{ backgroundColor: 'lightcoral', marginBottom: '10px' }}>
                    remove
                </button>
            )}
        </div>
    )
}

export default BlogDetails
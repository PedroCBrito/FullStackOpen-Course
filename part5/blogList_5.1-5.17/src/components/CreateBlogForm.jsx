import { useState } from 'react'
import InputField from "./InputField"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateBlogForm = ( { setBlogs, showNotification }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onSubmitBlog = (event) => {
        event.preventDefault()
        const newBlog = { title, author, url }
        blogService.create(newBlog)
            .then(createdBlog => {
                console.log('blog created', createdBlog)
                setTitle('')
                setAuthor('')
                setUrl('')
                setBlogs(prevBlogs => prevBlogs.concat(createdBlog))
                showNotification('success', `A new blog "${createdBlog.title}" was added`)
            })
            .catch(error => {
                console.error('error creating blog', error)
                showNotification('error', error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Failed to create blog')
                setTitle('')
                setAuthor('')
                setUrl('')
            })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={onSubmitBlog}>
                <InputField label="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                <InputField label="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
                <InputField label="url" value={url} onChange={(event) => setUrl(event.target.value)} />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

CreateBlogForm.propTypes = {
    setBlogs: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default CreateBlogForm
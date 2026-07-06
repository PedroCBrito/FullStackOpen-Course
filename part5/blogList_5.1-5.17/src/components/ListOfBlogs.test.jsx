import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'
import ListOfBlogs from './ListOfBlogs'

const blogs = [
    {
        id: '1',
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 5,
        user: {
            username: 'testuser',
            name: 'Test User'
        }
    },
    {
        id: '2',
        title: 'Another Blog Title',
        author: 'Another Author',
        url: 'http://anotherblog.com',
        likes: 3,
        user: {
            username: 'anotheruser',
            name: 'Another User'
        }
    }
]

vi.mock('../services/blogs', () => {
    const { vi } = globalThis
    return {
        default: {
            getAll: vi.fn().mockImplementation(() => Promise.resolve(blogs)),
            update: vi.fn().mockImplementation((id, updated) => Promise.resolve(updated)),
            create: vi.fn().mockImplementation((newBlog) => Promise.resolve({ ...newBlog, id: 'new' })),
            remove: vi.fn()
        }
    }
})

import blogService from '../services/blogs'

test('When rendering a blog, displays only the title and author', () => {
    render(<ListOfBlogs blogs={blogs} setBlogs={() => { }} showNotification={() => { }} />)

    const blogElement = screen.getByText('Test Blog Title Test Author')
    expect(blogElement).toBeDefined()
})

test('When click blog details button, displays all blog information', () => {
    render(<ListOfBlogs blogs={blogs} setBlogs={() => { }} showNotification={() => { }} />)

    const detailsButtons = screen.getAllByText('view')
    expect(detailsButtons).toHaveLength(2)

    for (let index = 0; index < detailsButtons.length; index++) {
        const button = detailsButtons[index]
        fireEvent.click(button)
        const blog = blogs[index]
        expect(screen.getByText(blog.url)).toBeDefined()
        expect(screen.getByText(`${blog.likes} likes`)).toBeDefined()
        expect(screen.getByText(`Author: ${blog.author}`)).toBeDefined()
    }
})

test('When click like button, calls blogService.update', () => {
    render(<ListOfBlogs blogs={blogs} setBlogs={() => { }} showNotification={() => { }} />)

    const viewButtons = screen.getAllByText('view')
    fireEvent.click(viewButtons[0])

    const likeButtons = screen.getAllByText('like')
    expect(likeButtons).toHaveLength(2)

    fireEvent.click(likeButtons[0])
    expect(blogService.update).toHaveBeenCalledTimes(1)
})

test('When creating a blog, calls blogService.create', () => {
    const setBlogs = vi.fn()
    render(<ListOfBlogs blogs={blogs} setBlogs={setBlogs} showNotification={() => { }} />)

    const createToggle = screen.getByText('create new blog')
    fireEvent.click(createToggle)

    // fill form - inputs are plain inputs without <label for=...>, select by role
    const inputs = screen.getAllByRole('textbox')
    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]

    fireEvent.change(titleInput, { target: { value: 'New Blog' } })
    fireEvent.change(authorInput, { target: { value: 'New Author' } })
    fireEvent.change(urlInput, { target: { value: 'http://newblog.com' } })

    const createButton = screen.getByText('create')
    fireEvent.click(createButton)

    expect(blogService.create).toHaveBeenCalledTimes(1)
})

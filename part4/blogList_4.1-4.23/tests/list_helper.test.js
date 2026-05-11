const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


// Total Likes Tests
describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs, equals the total likes of all blogs', () => {
        const listWithMultipleBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f9',
                title: 'Python for Data Analysis',
                author: 'Wes McKinney',
                url: 'https://wesmckinney.com/blog/python-for-data-analysis/',
                likes: 10,
                __v: 0
            }
        ]
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(15)
    })

    test('when list is empty, equals zero', () => {
        const emptyList = []
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })
})

// Favorite Blog Tests
describe('favorite blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, returns that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('when list has multiple blogs, returns the blog with most likes', () => {
        const listWithMultipleBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f9',
                title: 'Python for Data Analysis',
                author: 'Wes McKinney',
                url: 'https://wesmckinney.com/blog/python-for-data-analysis/',
                likes: 10,
                __v: 0
            }
        ]
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        expect(result).toEqual({
            title: 'Python for Data Analysis',
            author: 'Wes McKinney',
            likes: 10
        })
    })
})

//Most Blogs Tests
describe('most blogs', () => {
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Python for Data Analysis',
            author: 'Wes McKinney',
            url: 'https://wesmckinney.com/blog/python-for-data-analysis/',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fa',
            title: 'Clean Code',
            author: 'Robert C. Martin',
            url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Engineering/dp/0132350882',
            likes: 15,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Python for Data Analysis 2',
            author: 'Wes McKinney',
            url: 'https://wesmckinney.com/blog/python-for-data-analysis/',
            likes: 10,
            __v: 0
        }
    ]

    test('when list has multiple blogs, returns the author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(result).toEqual({
            author: 'Wes McKinney',
            blogs: 2
        })
    })
})

//Most Likes Tests
describe('most likes', () => {
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Python for Data Analysis',
            author: 'Wes McKinney',
            url: 'https://wesmckinney.com/blog/python-for-data-analysis/',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fa',
            title: 'Clean Code',
            author: 'Robert C. Martin',
            url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Engineering/dp/0132350882',
            likes: 15,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Python for Data Analysis 2',
            author: 'Wes McKinney',
            url: 'https://wesmckinney.com/blog/python-for-data-analysis/',
            likes: 10,
            __v: 0
        }
    ]

    test('when list has multiple blogs, returns the author with most likes', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs)
        expect(result).toEqual({
            mostLikedAuthor: 'Wes McKinney',
            likes: 20
        })
    })
})
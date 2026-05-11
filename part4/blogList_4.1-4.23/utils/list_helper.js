const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return {
        title: favorite.title,  
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1
        return counts
    }, {})

    const mostProlificAuthor = Object.keys(authorCounts).reduce((a, b) => authorCounts[a] > authorCounts[b] ? a : b)
    
    return {
        author: mostProlificAuthor,
        blogs: authorCounts[mostProlificAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorLikes = blogs.reduce((likes, blog) => {
        likes[blog.author] = (likes[blog.author] || 0) + blog.likes
        return likes
    }, {})

    const mostLikedAuthor = Object.keys(authorLikes).reduce((a, b) => authorLikes[a] > authorLikes[b] ? a : b)
    
    return {
        mostLikedAuthor,
        likes: authorLikes[mostLikedAuthor]
    }
}

const dummy = (blogs) => {
    return 1
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    dummy
}
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

const Blog = ({ blogList, setBlogList, blog, showNotification }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <span>{blog.title} {blog.author}</span>
    <div style={{ flexBasis: '100%', marginBottom: '50px' }}>
      <Togglable buttonLabel="view">
        <BlogDetails blogList={blogList} setBlogList={setBlogList} blog={blog} showNotification={showNotification} />
      </Togglable>
    </div>
  </div>  
)

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  setBlogList: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
}

export default Blog
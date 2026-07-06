import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/blogs'

const getAll = () => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('loggedUser') ? `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` : null
  const request = axios.get(baseUrl)
  return request.then(response =>
    Array.isArray(response.data) ? response.data : []
  )
}

const create = async (newBlog) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('loggedUser') ? `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` : null
  const response = await axios.post(baseUrl, newBlog)
  return response.data
}

const update = async (id, updatedBlog) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('loggedUser') ? `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` : null
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = async (id) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('loggedUser') ? `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` : null
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
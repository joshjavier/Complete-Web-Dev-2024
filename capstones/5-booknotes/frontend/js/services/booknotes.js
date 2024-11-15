import axios from 'axios'

const apiUrl = 'http://localhost:3000/api/booknotes'

export async function getBooknoteById(id) {
  const { data } = await axios.get(`${apiUrl}/${id}`)
  return data
}

export async function deleteBooknote(id) {
  const { data } = await axios.delete(`${apiUrl}/${id}`)
  return data
}

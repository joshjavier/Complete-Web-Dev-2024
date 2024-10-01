import fetch from 'node-fetch'

export const userCollection = new Map()
export const postCollection = new Map()

async function fetchPosts() {
  const response = await fetch('https://dummyjson.com/posts?limit=10&select=title,body,userId')
  const { posts } = await response.json()

  posts.forEach(post => postCollection.set(post.id, post))
}

async function fetchUsers() {
  for await (const post of postCollection.values()) {
    if (userCollection.has(post.userId)) {
      console.log('User is already in the database')
    } else {
      const response = await fetch(`https://dummyjson.com/users/filter?key=id&value=${post.userId}&select=firstName,lastName`)
      const { users } = await response.json()
      const id = users[0].id
      const name = users[0].firstName + ' ' + users[0].lastName

      userCollection.set(id, name)
    }
  }
}

// Initialize the in-memory data store with dummy data
await fetchPosts()
await fetchUsers()

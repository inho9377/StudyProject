//@ts-check

//타입 정의
/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */


/**
 * Post
 *
 * Get /posts
 * Get /posts/:id
 * POST /posts
 */

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method //GET, POST 스트링만 받음
 * @property {(matches: string[], body: Object.<string, *>  | undefined) => Promise<APIResponse>} callback
 */

//{(values: Object) => Promise<*>}

const fs = require('fs')
const DB_JSON_FILENAME='database.json'

/** @returns {Promise<Post[]>} */
async function getPosts() {
  const json = await fs.promises.readFile(DB_JSON_FILENAME, 'utf-8')
  return JSON.parse(json).posts
}

/**
 * @param {Post[]} posts
 */
async function savePosts(posts) {
  const content = {
    posts,
  }

  return fs.promises.writeFile(DB_JSON_FILENAME, JSON.stringify(content), 'utf-8')
}

/**@type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => {
      return {
        statusCode: 200,
        body: await getPosts(),
      }
    },
  },

  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/, //Todo: RegExp로 고쳐야 함
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'NOT FOUND',
        }
      }

      const posts = await getPosts()
      const post = posts.find((_post) => _post.id === postId)

      if (!post) {
        return {
          statusCode: 404,
          body: 'NOT FOUND',
        }
      }

      return {
        statusCode: 200,
        body: post,
      }
    },
  },

  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      if (!body) {
        return {
          statusCode: 400,
          body: 'Ill-formed request',
        }
      }

      /** @type {string} */
      /* eslint-disable-next-line prefer destructureing */
      const title = body.title
      const newPost = {
        id: title.replace(/\s/g, '_'),
        title,
        content: body.content,
      }

      const posts = await getPosts()
      posts.push(newPost)

      savePosts(posts)


      return {
        statusCode: 200,
        body: newPost,
      }
    },
  },
]

module.exports = {
  routes,
}

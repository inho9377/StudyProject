//@ts-check

//타입 정의
/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post} */
const examplePost = {
  id: 'abc',
  title: 'abc',
  content: 'abc',
}

/** @type {Post[]} */
const posts = [
  {
    id: 'my_first_post',
    title: 'My First Post',
    content: 'Hello!',
  },
  {
    id: 'my_second_post',
    title: '나의 두 번째 포스트',
    content: 'Second Post!',
  },
]

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

/**@type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => {
      return {
        statusCode: 200,
        body: posts,
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

      posts.push(newPost)

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

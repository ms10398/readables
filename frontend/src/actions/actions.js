import * as Type from './actionTypes'
import * as API from '../utils/API'

export const fetchPosts = () => dispatch => (
  API.getAllPosts()
    .then(posts => {
      posts.map(post => {
        API.getComments(post.id)
          .then(comments => {
            dispatch({
              type: Type.GET_POSTS,
              post,
              comments
            })
          })
      })
    })
)

export const fetchPost = (id) => dispatch => (
  API.getPost(id)
    .then(post => {
      API.getComments(post.id)
        .then(comments => {
          dispatch({
            type: Type.GET_POST,
            post,
            comments
          })
        })
    })
)

export const addNewPost = (post) => dispatch => (
  API.addNewPost(post)
    .then(post => {
      dispatch({
        type: Type.ADD_NEW_POST,
        post
      })
    })
)

export const editPost = (id, post) => dispatch => (
  API.editPost(id, post)
    .then((post) => {
      dispatch({
        type: Type.EDIT_POST,
        id,
        post
      })
    })
)

export const deletePost = (id) => dispatch => (
  API.deletePost(id)
    .then(() => {
      dispatch({
        type: Type.DELETE_POST,
        id
      })
    })
)

export const removePost = (id) => dispatch => {
  return API.deletePost(id)
    .then(() => {
      dispatch({
        type: Type.REMOVE_POST,
        id
      })
    })
}

export const getAllPostsCategory = (category) => dispatch => (
  API.getAllPostsForCategory(category)
    .then((posts) => {
      dispatch({
        type: Type.GET_POST_CATEGORY,
        posts
      })
    })
)

export const downvote = (id) => dispatch => (
  API.votePost(id, "downVote")
    .then(() => {
      dispatch({
        type: Type.DOWN_VOTE,
        id
      })
    })
)

export const upvote = (id) => dispatch => (
  API.votePost(id, "upVote")
    .then(() => {
      dispatch({
        type: Type.UP_VOTE,
        id
      })
    })
)

export const downvotePost = (id) => dispatch => (
  API.votePost(id, "downVote")
    .then((comment) => {
      dispatch({
        type: Type.VOTE_POST,
        voteScore: comment.voteScore
      })
    })
)

export const upvotePost = (id) => dispatch => (
  API.votePost(id, "upVote")
    .then((comment) => {
      dispatch({
        type: Type.VOTE_POST,
        voteScore: comment.voteScore
      })
    })
)

export const getCategories = (categories) => ({
    type: Type.GET_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
  API.getAllCategories()
    .then(categories => dispatch(getCategories(categories)))
)

export const deletePosts = () => ({
  type: Type.DELETE_POSTS
})

export const changeSort = (value) => {
  return {
    type: Type.CHANGE_SORT,
    value: value
  }
}

export const addComment = (comment) => dispatch => {
  return API.addComment(comment)
    .then(comment => {
      dispatch({
        type: Type.ADD_COMMENT,
        comment
      })
    })
}

export const deleteComment = (id) => dispatch => {
  return API.deleteComment(id)
    .then(() => {
      dispatch({
        type: Type.DELETE_COMMENT,
        id
      })
    })
}

export const editComment = (id, comment) => dispatch => {
  return API.editComment(id, comment)
    .then((comment) => {
      dispatch({
        type: Type.EDIT_COMMENT,
        id,
        comment
      })
    })
}

export const upvoteComment = (id) => dispatch => (
  API.voteComment(id, "upVote")
    .then((comment) => {
      dispatch({
        type: Type.UPVOTE_COMMENT,
        id: comment.id,
        parentId: comment.parentId,
        voteScore: comment.voteScore
      })
    })
)

export const downvoteComment = (id) => dispatch => (
  API.voteComment(id, "downVote")
    .then((comment) => {
      dispatch({
        type: Type.DOWNVOTE_COMMENT,
        id: comment.id,
        parentId: comment.parentId,
        voteScore: comment.voteScore
      })
    })
)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, addComment } from '../../actions/actions'
import { Link, Redirect  } from 'react-router-dom'
import PostInfo from './PostInfo'
import { CommentForm } from './CommentForm'
import CommentList from './CommentList'

import './Single.css'

class PostDetail extends Component {

  state = {
    txtComment: ''
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getPost(id)
  }

  onInputChange = (e) => {
    this.setState({
      txtComment: e.target.value
    })
  }

  onCommentSubmit = (e) => {
    e.preventDefault();
    if (this.state.txtComment) {
      const newComment = {
        id: new Date().valueOf(),
        timestamp: Date.now(),
        body: this.state.txtComment,
        author: this.props.post.post.author,
        parentId: this.props.post.post.id
      }

      this.props.addComment(newComment)
        .then(() => {
          this.setState({
            txtComment: ''
          })
        })
    }
  }

  render() {
    const { post } = this.props.post
    const { comments } = this.props.post.post
    return(
      <div className="Container">
        <PostInfo post={post} />
        <CommentForm
          txtComment={this.state.txtComment}
          onCommentSubmit={this.onCommentSubmit}
          onInputChange={this.onInputChange} />
        <CommentList comments={comments} />
      </div>
    )
}
}

const mapStateToProps = ({ post }) => {
  return {
    post: post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(fetchPost(id)),
    addComment: (comment) => dispatch(addComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)

import React , { Component } from 'react'
import CommentEdit from './CommentEdit'
import CommentDelete from './CommentDelete'

class Comment extends Component {
  state = {
    comment: ''
  }

  // Edit Comment
  onEdit = (id, editId) => {
    this.props.onEdit(id, editId, this.state.comment)
  }

  // Delete Comment
  onDelete = (id) => {
    this.props.onDelete(id)
  }

  componentDidMount() {
    const { body } = this.props
    this.setState({
      comment: body
    })
  }

  onChangeComment = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  render() {
    if(this.props.editId === this.props.id) {
      return(
        <div>
          <div>
            <textarea
              rows="5"
              onChange={this.onChangeComment}
              value={this.state.comment}
              type="text" />
          </div>
          <div>
            <CommentEdit
              id={this.props.id}
              edit={this.props.edit}
              editId={this.props.editId}
              onEdit={this.onEdit} />
            <CommentDelete
              id={this.props.id}
              onDelete={this.onDelete} />
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <div>
            {this.state.comment}
          </div>
          <div>
            <CommentEdit
              id={this.props.id}
              editId={this.props.editId}
              onEdit={this.props.onEdit}/>
            <CommentDelete
              id={this.props.id}
              onDelete={this.props.onDelete}/>
          </div>
        </div>
      )
    }
  }

}

export default Comment

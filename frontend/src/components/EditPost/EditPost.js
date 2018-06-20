import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchPost, fetchCategories, editPost } from '../../actions/actions'
import { Input, InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap'
import '../New/Post.css'

class EditPost extends Component {

  state = {
    id: this.props.location.state?this.props.location.state.post.id : this.props.match.params.id,
    title: this.props.location.state?this.props.location.state.post.title:'',
    author: this.props.location.state?this.props.location.state.post.author:'',
    body: this.props.location.state?this.props.location.state.post.body:'',
    category: this.props.location.state?this.props.location.state.category:'',
    notValid: false,
    success: false,
    edited: false
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  onBodyChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  onAuthorChange = (e) => {
    this.setState({
      author: e.target.value
    })
  }

  onCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  onEditClick = () => {
    const { id, title, category, body, author } = this.state
    this.props.editPost(id, {
      title,
      category,
      body,
      author
    })
    .then(() => {
        this.setState({
          success: true
        })
    })
  }

  render() {
    const { categories } = this.props.categories
    const { id, category } = this.state
      const categoryList = categories.map(category => {
      return (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      )
    })

    return(
      <div className="Container">
        <div>
          {this.state.success && (
            <Redirect
              from={`/edit/${category}/${id}`}
              to={`/`}  />
          )}
        </div>
        <div>
          {this.state.notValid && (
            <h3>Please enter all values...</h3>
          )}
        </div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">          <InputGroupText>Title</InputGroupText>

          </InputGroupAddon>
            <Input
              type="text"
              onChange={(e) => this.onTitleChange(e)}
              value={this.state.title} />
        </InputGroup>

        <InputGroup>
          <select
            onChange={this.onCategoryChange}
            value={this.state.category}>
            {categoryList}
          </select>
        </InputGroup>

        <InputGroup>
          <textarea
            value={this.state.body}
            onChange={(e) => this.onBodyChange(e)}
            name="comments"
            id=""
            cols="30"
            rows="8" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon addonType="prepend">          <InputGroupText>Author</InputGroupText>

          </InputGroupAddon>
          <Input
            type="text"
            onChange={(e) => this.onAuthorChange(e)}
            value={this.state.author} />
        </InputGroup>
        <InputGroup>
          <Input
            outline
            style={{ background: 'green',
            borderRadius: '5px'}}
            type="button"
            className="Post-Button"
            onClick={this.onEditClick}
            value="Edit" />
        </InputGroup>
    </div>
    )
  }
}

const mapStateToProps = ({ post, categories }) => {
  return {
    post,
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (id, post) => dispatch(editPost(id, post)),
    getPost: (id) => dispatch(fetchPost(id)),
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)

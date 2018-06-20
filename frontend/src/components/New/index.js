import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, addNewPost } from '../../actions/actions'
import { Input, InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap'
import './Post.css'

class NewPost extends Component {
  state = {
    title: '',
    category: '',
    author: '',
    body: '',
    notValid: false,
    success: false
  }

  componentDidMount() {
    this.props.getCategories();
  }

  onPostClick() {
    const { title, category, author, body } = this.state

    if (title && category && author && body) {
      const newPost = {
        id: new Date().valueOf(),
        timestamp: Date.now(),
        title,
        category,
        author,
        body
      }
      this.props.addPost(newPost)
        .then(() => this.setState({
          success: true,
          title: '',
          category: '',
          author: '',
          body: '',
          notValid: false
        }))
    } else {
      this.setState({
        notValid: true,
        success: false
      })
    }
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value })
  }

  onBodyChange(e) {
    this.setState({ body: e.target.value })
  }

  onCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })

  }

  render() {
    const { categories } = this.props
    const optionList = categories.map(category => (
        <option
          key={category.name}
          value={category.name}>{category.name}</option>
      ))

    return(
      <div className="Container">
        <div>
          {this.state.success && (
            <h3>New Post added...</h3>
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
            placeholder="Select Category"
            onChange={this.onCategoryChange}
            value={this.state.category}>
            {optionList}
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
            onClick={this.onPostClick.bind(this)}
            value="Post" />
        </InputGroup>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories()),
    addPost: (post) => dispatch(addNewPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)

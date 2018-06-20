import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deletePost, upvote, downvote} from '../../actions/actions'

import Vote from '../Vote/'
import {Title} from '../PostHelper/Title'
import {Author} from '../PostHelper/Author'
import {Count} from '../PostHelper/Count'
import {Edit} from '../PostHelper/Edit'
import {Delete} from '../PostHelper/Delete'
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Badge
} from 'reactstrap'

class Post extends Component {
  state = {
    score: 0
  }

  onDeleteClick = (id) => {
    this.props.deletePost(id)
  }

  onClickUpVote = (id) => {
    this.props.upVote(id)
    this.setState({
      score: this.state.score + 1
    })
  }

  onClickDownVote = (id) => {
    this.props.downVote(id)
    this.setState({
      score: this.state.score - 1
    })
  }

  componentDidMount() {
    const {voteScore} = this.props.post
    this.setState({score: voteScore})
  }

  render() {

    const {body, title, author, id} = this.props.post
    const {score} = this.state
    const posts = this.props.posts
    const index = posts.findIndex(post => post.id === id)
    const count = posts[index].comments
      ? posts[index].comments.length
      : '&'
    return (<Row>
      <Card body="body" inverse="inverse" style={{
          backgroundColor: '#333',
          borderColor: '#333',
          padding: '55px',
          margin: '10px'
        }}>
        <CardTitle>
          <Title post={this.props.post}/>
        </CardTitle>
        <CardText>

          <Vote id={id} score={score} onClickDownVote={this.onClickDownVote} onClickUpVote={this.onClickUpVote}/> {body}
        </CardText>
        <CardText>
          <Author author={author}/>
          <Badge color="dark" pill="pill"><Count count={count}/></Badge>
        </CardText>
        <Col>
          <Button color="info" style={{
              margin: '10px'
            }}>
            <Edit id={id} post={this.props.post}/>
          </Button>
          <Button color="warning">
            <Delete style={{
                margin: '10px'
              }}
              id={id} onDeleteClick={this.onDeleteClick}/>
          </Button>
        </Col>
      </Card>
    </Row>)
  }
}

const mapStateToProps = ({posts}) => {
  return {posts: posts.posts}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => dispatch(deletePost(id)),
    upVote: (id) => dispatch(upvote(id)),
    downVote: (id) => dispatch(downvote(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

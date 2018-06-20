import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect  } from 'react-router-dom'
import Vote from '../Vote'
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
  Badge,
} from 'reactstrap'

import {
  upvotePost,
  downvotePost,
  removePost
} from '../../actions/actions'

class PostInfo extends Component {

  state = {
    deleted: false
  }

  onDelete = (id) => {
    this.props.removePost(id)
      .then(() => {
        this.setState({
          deleted: true
        })
      })
  }

  onClickDownVote = (id) => {
    this.props.downVote(id)
  }

  onClickUpVote = (id) => {
    this.props.upVote(id)
  }

  render() {
    const { id, author, body, category, title, voteScore, timestamp } = this.props.post

    if (this.state.deleted) {
      return (<Redirect to='/' />)
    } else {
      return(
        <Row>
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

              <Vote id={id} score={voteScore} onClickDownVote={this.onClickDownVote} onClickUpVote={this.onClickUpVote}/> {body}
            </CardText>
            <CardText>
              Category: {category}
            </CardText>
            <CardText>
              <Author author={author}/>
            </CardText>
            <Col>
              <Button color="info" style={{
                  margin: '10px'
                }}>
                <Edit id={id} post={this.props.post}/>
              </Button>
              <Button color="warning">
                <div
                  onClick={() => this.onDelete(id)}>
                  Delete
                </div>
              </Button>
            </Col>
          </Card>
        </Row>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upVote: (id) => dispatch(upvotePost(id)),
    downVote: (id) => dispatch(downvotePost(id)),
    removePost: (id) => dispatch(removePost(id))

  }
}

export default connect(null, mapDispatchToProps)(PostInfo)

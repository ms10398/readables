import React, { Component } from 'react'
import {
  InputGroup,
  Input
} from 'reactstrap'
export class CommentForm extends Component {

  render() {
    return(
      <div>
        <form
          onSubmit={this.props.onCommentSubmit}>
          <InputGroup>
            <textarea
                placeholder="Enter your comments..."
                onChange={this.props.onInputChange}
                value={this.props.txtComment}
                name="comments"
                id=""
                cols="30"
                rows="5" />
            </InputGroup>
            <Input
              style={{ background: 'blue',
              color: 'white',
              borderRadius: '5px'}}
              className="Comment-Button"
              value="Add Comment"
              type="submit"/>
        </form>
      </div>
    )
  }
}

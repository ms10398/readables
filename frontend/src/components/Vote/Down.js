import React from 'react'
import FontAwesome from 'react-fontawesome'

const Down = (props) => {
  return(
    <span
      onClick={() => props.onClickDownVote(props.id)}>
      <FontAwesome name='arrow-down' />
    </span>
  )
}

export default Down

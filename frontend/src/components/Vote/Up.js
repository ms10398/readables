import React from 'react'
import FontAwesome from 'react-fontawesome'

const Up = (props) => {
  return(
    <span
      onClick={() => props.onClickUpVote(props.id)}>
      <FontAwesome name='arrow-up' />
    </span>
  )
}

export default Up

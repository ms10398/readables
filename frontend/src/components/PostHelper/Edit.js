import React from 'react'
import { Link } from 'react-router-dom'

export const Edit = (props) => {
  return(
    <div className="Edit">
      <Link to={{pathname: `/edit/${props.id}`, state: {post: props.post}}}>Edit</Link>
    </div>
  )
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export const Title = (props) => {
    const { id, title, category } = props.post
    return(
        <Link to={`/${category}/${id}`}>{title}</Link>
    )
}

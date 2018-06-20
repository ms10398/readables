import React, {Component} from 'react'

export const Count = (props) => {
    const { count } = props
    return (<span>
      Comments: {count}
    </span>)
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Fab, FabButton } from 'react-fab'

import './App.css'

export default class MyComponent extends Component {
  render() {
    return (
      <Link to='/new'>
        <Fab>
          <FabButton>
            +
          </FabButton>
        </Fab>
      </Link>
    );
  }
}

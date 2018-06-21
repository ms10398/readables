import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import Categories from './Categories'
import Posts from './Posts/'
import PostDetail from './SinglePost/'
import NewPost from './New/'
import EditPost from './EditPost/EditPost'
import AddButton from './AddButton'
import NotFound from './NotFound'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

class App extends Component {

  render() {
    return(
        <div className="outer-container App">
          <Menu id="slide" pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            <nav className="bm-item-list">
              <Categories />
            </nav>
          </Menu>
          <div id="page-wrap">
            <Switch>
              <Route exact path ='/' component={Posts} />
              <Route exact path ='/new' component={NewPost} />
              <Route exact path ='/404' component={NotFound} />
              <Route exact path ='/edit/:id' component={EditPost} />
              <Route exact path ='/:category' component={Posts} />
              <Route exact path ='/:category/:id' component={PostDetail} />
            </Switch>
            <AddButton />
          </div>
        </div>
    )
  }
}

export default App

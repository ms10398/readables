import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/actions'
import './App.css'

class Categories extends Component {

  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const { categories } = this.props
    const list = categories.map((item, index) => {
      return (
        <Link key={index} className="bm-item" to={`/${item.name}`}>
          {item.name}
        </Link>
      )
    })

    return(
      <div className="bm-item-list">
        <Link key='all' to='/'>All</Link>
        {list}
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

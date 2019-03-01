import React, { PureComponent } from 'react'
import Header from './Header'
import styles from 'styles/Layout.scss'

export default class Layout extends PureComponent {
  render () {
    return (
      <div className='layout'>
        <Header />
        { this.props.children }
        <style jsx>{styles}</style>
      </div>
    )
  }
}

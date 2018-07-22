
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import classnames from 'classnames'

import styles from './FramebufferTabs.css'
import { framebufIndexMergeProps }  from '../redux/utils'
import { Framebuffer } from '../redux/editor'
import { Toolbar } from '../redux/toolbar'
import * as framebufList from '../redux/framebufList'
import * as selectors from '../redux/selectors'

class FramebufferTabs_ extends Component {
  handleActiveClick = (idx) => (e) => {
    e.preventDefault()
    this.props.Toolbar.setFramebufIndex(idx)
  }

  handleNewTab = () => {
    this.props.Framebufs.addFramebuf()
    this.props.Toolbar.setFramebufIndex(-1)
  }

  handleRemoveTab = (idx) => {
    this.props.Framebufs.removeFramebuf(idx)
    this.props.Toolbar.setFramebufIndex(-1)
  }

  render () {
    const disableRemove = this.props.framebufList.length == 1
    const lis = this.props.framebufList.map((t, i) => {
      const key = t.id
      const name = `Tab ${t.id}`
      const cls = classnames(i === this.props.framebufIndex ? styles.active : null)
      return (
        <li key={key} className={cls}>
          <a href='/#' onClick={this.handleActiveClick(i)}>{name}</a>
          &nbsp;
          {disableRemove ?
            null
            :
            <i onClick={() => this.handleRemoveTab(i)} className='fa fa-times-circle'></i>}
        </li>
      )
    })
    return (
      <div className={styles.tabHeadings}>
        <ul className={styles.tabs}>
          {lis}
          <li><i onClick={this.handleNewTab} className='fa fa-plus'></i></li>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    Toolbar: Toolbar.bindDispatch(dispatch),
    Framebuffer: Framebuffer.bindDispatch(dispatch),
    Framebufs: bindActionCreators(framebufList.actions, dispatch)
  }
}

const mapStateToProps = state => {
  const framebuf = selectors.getCurrentFramebuf(state)
  return {
    framebufIndex: selectors.getCurrentFramebufIndex(state),
    framebufList: selectors.getFramebufs(state)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  framebufIndexMergeProps
)(FramebufferTabs_)

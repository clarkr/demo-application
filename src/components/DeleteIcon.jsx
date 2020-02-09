import React from 'react';

import { FaTrashAlt } from 'react-icons/fa'

class DeleteIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize() {
    this.setState({ mobile: window.innerWidth <= 760 });
  }

  render() {
    let className = "hidden";

    if(this.props.isHidden && !this.state.mobile) {
      className = "hidden";
    } else {
      className = "";
    }

    return <FaTrashAlt className={className} onClick={this.props.handleClick}/>;
  }
}

export default DeleteIcon;

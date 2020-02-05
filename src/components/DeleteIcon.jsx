import React from 'react';

import { FaTrashAlt } from 'react-icons/fa'

class DeleteIcon extends React.Component {
  render() {
    let className = "hidden";

    if(this.props.isHidden) {
      className = "hidden";
    } else {
      className = "";
    }

    return <FaTrashAlt className={className} onClick={this.props.handleClick}/>;
  }
}

export default DeleteIcon;

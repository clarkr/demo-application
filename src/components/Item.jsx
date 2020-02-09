import React from 'react';

import _ from 'lodash';

import DeleteIcon from './DeleteIcon'
import ItemValue from './ItemValue'

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hideDeleteIcon: true };

    this.handleMouse = this.handleMouse.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
    this.resize = this.resize.bind(this);
  }

  handleDeleteClick() {
    this.props.item.destroy().then(this.props.onItemRemoved);
  }

  handleMouse() {
    this.setState({ hideDeleteIcon: !this.state.hideDeleteIcon });
  }

  handleValueClick(field) {
    this.setState({ editing: field });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize() {
    this.setState({ mobile: window.innerWidth <= 760 });
  }

  render() {
    const item = this.props.item;
    return (
      <tr
        onMouseEnter={this.handleMouse}
        onMouseLeave={this.handleMouse}
      >
        {item.constructor.fields.map((field) =>
          <ItemValue
            item={item}
            field={field}
            onClick={this.handleValueClick}
            editing={_.get(this.state, 'editing.key') === field.key}
            key={item.fieldKey(field)}
          />
        )}
        <td>
          <DeleteIcon
            isHidden={this.state.hideDeleteIcon}
            handleClick={this.handleDeleteClick}
          />
        </td>
      </tr>
    );
  }
}

export default Item;

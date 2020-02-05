import React from 'react';

import { Form, Input } from 'reactstrap';

class ItemValue extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: props.item[props.field.key] };

    this._updateItem = this._updateItem.bind(this);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.field);
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.setState(
        { value: this.props.item[this.props.field.key] },
        () => this._updateItem()
      );
    }
  }

  handleBlur(e) {
    this.handleSubmit(e);
  }

  handleSubmit(e) {
    e.preventDefault();
    this._updateItem();
  }

  _updateItem() {
    const value = this.state.value;
    const item = this.props.item;
    const key = this.props.field.key;

    if (value !== item[key]) {
      const params = {}
      params[key] = value;
      item.update(params).then(() => this.setState({ value }));
    }

    this.props.onClick(undefined);
  }

  render() {
    if(
      this.props.field.editable &&
      this.props.editing
    ) {
      return (
        <td>
          <Form onSubmit={this.handleSubmit}>
            <Input
              autoFocus
              value={this.state.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
            />
          </Form>
        </td>
      );
    } else {
      return (
        <td onClick={this.handleClick}>
            {this.state.value}
        </td>
      );
    }
  }
}

export default ItemValue;

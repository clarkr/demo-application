import React from 'react';

import { Button } from 'reactstrap';

import AddItemModal from './modals/AddItemModal';

class AddItemButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { displayModal: false };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ displayModal: !this.state.displayModal });
  }

  render() {
    return (
      <>
        <Button onClick={this.toggleModal} color="primary">Add Item</Button>
        <AddItemModal
          display={this.state.displayModal}
          toggle={this.toggleModal}
          onItemAdded={this.props.onItemAdded}
        />
      </>
    );
  }
}

export default AddItemButton;

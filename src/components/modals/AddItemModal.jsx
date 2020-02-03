import React from 'react';

import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import ItemModel from  '../../api/ItemModel';

class AddItemButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { titleValue: '', contentValue: '' };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(event) {
    event.preventDefault();

    const onItemAdded = this.props.onItemAdded;
    const toggle = this.props.toggle;
    ItemModel.create({
      title: this.state.titleValue,
      content: this.state.contentValue,
    }).then(() => {
      toggle();
      onItemAdded();
    });
  }

  handleTitleChange(event) {
    this.setState({ titleValue: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ contentValue: event.target.value });
  }

  render() {
    return (
      <Modal isOpen={this.props.display} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Add an item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title-value">Title</Label>
              <Input
                type="title"
                name="title"
                id="title-value"
                placeholder="title"
                value={this.state.titleValue}
                onChange={this.handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content-value">Content</Label>
              <Input
                type="content"
                name="content"
                id="content-value"
                placeholder="content"
                value={this.state.contentValue}
                onChange={this.handleContentChange}
              />
            </FormGroup>
            <Button onClick={this.handleSave} type="submit">Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddItemButton;

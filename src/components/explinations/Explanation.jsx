import React from 'react';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FaQuestionCircle } from 'react-icons/fa'

class Explanation extends React.Component {
  render() {
    return (
      <Modal size="lg" isOpen={this.props.display} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Explanation Icons</ModalHeader>
        <ModalBody>
          <p>
            Look for the <FaQuestionCircle /> icon throughout the app for deatils about the piece of
            functionality.
          </p>
        </ModalBody>
      </Modal>
    );
  }
}

export default Explanation;

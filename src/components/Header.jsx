import React from 'react';

import { Col, Container, Jumbotron, Row } from 'reactstrap';
import { FaQuestionCircle } from 'react-icons/fa'

import Explanation from './explinations/Explanation';

class Header extends React.Component {
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
        <Jumbotron tag="section" className="text-center">
          <Container>
            <Row>
              <Col>
                <h1>Sample Application</h1>
                <p>
                  A sample application that demonstrates compentency across multiple parts of a web
                  application. It is designed to provide trivial functionality. The intent is to
                  demonstrate a solid base on top of which an enterprise grade web application could
                  evolve. <FaQuestionCircle onClick={this.toggleModal} />
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Explanation display={this.state.displayModal} toggle={this.toggleModal} />
      </>
    );
  }
}

export default Header;

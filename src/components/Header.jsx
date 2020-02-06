import React from 'react';

import { Col, Container, Jumbotron, Row } from 'reactstrap';

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
                <p className="lead">
                  A demo app which provides a safe, low risk space to try out new tools and
                  techniques.
                </p>
                <p className="lead">
                 Read <a href="http://robertclark.info/demo.html">this</a> for more
                 information.
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </>
    );
  }
}

export default Header;

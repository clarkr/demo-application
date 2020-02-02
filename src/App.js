import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { withAuthenticator } from 'aws-amplify-react';
import { Container } from 'reactstrap';

import Header from './components/Header';
import Items from './components/Items';

class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <Container className="application-content">
          <Items />
        </Container>
      </>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });

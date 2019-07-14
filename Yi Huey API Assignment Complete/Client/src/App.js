//https://client-joei.herokuapp.com/

import React, { Component } from 'react';
import './App.css';
import CharacterCard from './CharacterCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import Carousal_Header from './Carousal_Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      successAlert: false,
      deleteAlert: false,
      name: '',
      character_id: '',
      characters: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
    this.setState({ successAlert: false });
    this.setState({ deleteAlert: false });
  }

  getAllCharacters = () => {
    axios
      .get('https://server-joei.herokuapp.com/characterGetAll')
      .then(result => {
        this.setState({ characters: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllCharacters();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://server-joei.herokuapp.com/characterAdd?name=${
      this.state.name
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        } else {
          this.setState({ successAlert: true });
          setTimeout(() => {
            this.setState({ successAlert: false });
          }, 2000);
        }

        this.getAllCharacters();
      })
      .catch(error => {
        // alert('Error: ', error);
        this.setState({ alertVisible: true });
        setTimeout(() => {
          this.setState({ alertVisible: false });
        }, 2000);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeCharacter(character_id) {
    this.setState({
      characters: this.state.characters.filter(character => {
        if (character.character_id !== character_id) return character;
      })
    });
    const query = `https://server-joei.herokuapp.com/characterDelete?character_id=${character_id}`;

    axios
      .get(query)
      .then(result => {
        this.setState({ deleteAlert: true });
        setTimeout(() => {
          this.setState({ deleteAlert: false });
        }, 2000);

        this.getAllCharacters();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let characterCards = this.state.characters.map(character => {
      return (
        <Col sm="12" key={character.character_id}>
          <CharacterCard
            removeCharacter={this.removeCharacter.bind(this)}
            character={character}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container>
          <h1 style={{ padding: '20px', color: '#BFBE9F' }}>Games Of Throne</h1>
          <Carousal_Header />
          <Row>
            <Col>
              <Alert
                color="warning"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Character not found
              </Alert>

              <Alert
                color="success"
                isOpen={this.state.successAlert}
                toggle={this.onDismiss}
              >
                New Character Added
              </Alert>

              <Alert
                color="danger"
                isOpen={this.state.deleteAlert}
                toggle={this.onDismiss}
              >
                Character Deleted
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter character name..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="success">Add</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{characterCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;

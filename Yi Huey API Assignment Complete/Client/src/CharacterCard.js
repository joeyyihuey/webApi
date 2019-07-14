//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

export class CharacterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let {
      character_id,
      name,
      gender,
      culture,
      born,
      aliases,
      character_img_url,
      quote
    } = this.props.character;
    return (
      <div>
        <Table
          striped
          bordered
          size="sm"
          style={{ backgroundColor: '#F5F5DC' }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Character Profile</th>
              <th>Gender</th>
              <th>Culture</th>
              <th>Born</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: '20px' }}>{character_id}</td>
              <td style={{ width: '200px' }}>
                <Card style={{ width: '200px', height: '90%' }}>
                  <CardImg top width="100%" src={character_img_url} />
                  <CardBody>
                    <CardTitle style={{ color: 'black' }}>{name}</CardTitle>

                    <Button color="warning" onClick={this.toggle}>
                      Aliases/Quote
                    </Button>

                    

                    <Modal
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                      className={this.props.className}
                    >
                      <ModalHeader toggle={this.toggle}>
                        <span style={{ color: 'orange' }}>{name}</span> Aliases
                      </ModalHeader>
                      <ModalBody>
                        <div class="row">
                          <Col sm="6">
                            <img
                              style={{ marginRight: '10px' }}
                              width="250px"
                              height="300px"
                              src={character_img_url}
                            />
                          </Col>

                          <Col sm="6">
                            <ListGroup style={{ marginLeft: '10px' }}>
                              <ListGroupItem>
                                <b>Aliases</b>
                              </ListGroupItem>
                              <ListGroupItem
                                style={{
                                  fontSize: '12px',
                                  textAlign: 'left',
                                  height: '125px'
                                }}
                              >
                                {aliases}
                              </ListGroupItem>

                              <ListGroupItem>
                                <b>Quotes</b>
                              </ListGroupItem>
                              <ListGroupItem
                                style={{
                                  fontSize: '12px',
                                  textAlign: 'left',
                                  height: '125px'
                                }}
                              >
                                {quote}
                              </ListGroupItem>

                            </ListGroup>
                          </Col>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>
                          Back
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </CardBody>
                </Card>
              </td>
              <td style={{ width: '180px' }}>{gender}</td>
              <td style={{ width: '180px' }}>{culture}</td>
              <td style={{ width: '180px' }}>{born}</td>

              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.removeCharacter(character_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CharacterCard;

import React from "react";
import "./BookItem.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class BookItem extends React.Component {
  render() {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Book Name: {this.props.item.title}</Card.Title>
            <Card.Text>Description: {this.props.item.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Status: {this.props.item.status}</ListGroupItem>
          </ListGroup>
          <button onClick={() => this.props.deleteBook(this.props.item._id)}>
            Delete
          </button>
        </Card>
      </>
    );
  }
}

export default BookItem;

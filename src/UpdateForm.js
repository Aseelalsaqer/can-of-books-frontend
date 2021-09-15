import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
class UpdateForm extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.props.updateBook}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Book Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  defaultValue={this.props.title}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  defaultValue={this.props.description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Select
                  aria-label="Default select example"
                  name="status"
                  defaultValue={this.props.status}
                >
                  <option value="In stock">In stock</option>
                  <option value="Out of stock">Out of stock</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default UpdateForm;

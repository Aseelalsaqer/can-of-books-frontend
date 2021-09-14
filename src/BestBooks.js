import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import BookItem from "./BookItem";

import BookFormModal from "./BookFormModal";
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestBooksArr: [],
      showClick: false,
    };
  }
  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .get(`http://localhost:3222/mybooks?email=${email}`)
      .then((result) => {
        this.setState({
          bestBooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log("error");
      });
  };
  addBook = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const email = user.email;
    const bookObj = {
      bookName: event.target.bookName.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: email,
    };
    axios
      .post(`http://localhost:3222/addBook`, bookObj)
      .then((result) => {
        this.setState({
          bestBooksArr: result.data,
        });
        console.log(result.data);
      })
      .catch((err) => {
        console.log("Error on adding data");
      });
  };
  deleteBook = (id) => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .delete(`http://localhost:3222/deletebook/${id}?email=${email}`)
      .then((result) => {
        this.setState({
          bestBooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log("error in deleting Book");
      });
  };
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <button
          onClick={() => {
            this.setState({
              showClick: true,
            });
          }}
        >
          Add Book
        </button>
        {this.state.showClick && <BookFormModal addBook={this.addBook}  />}
        {isAuthenticated &&
          this.state.bestBooksArr.map((item) => {
            return <BookItem item={item} 
            deleteBook={this.deleteBook}/>;
          })}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);

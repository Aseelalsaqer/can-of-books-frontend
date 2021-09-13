import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestBooksArr: [],
    };
  }
  componentDidMount = () => {
    axios
      .get(`http://localhost:3222/mybooks`)
      .then((result) => {
        this.setState({
          bestBooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log("error");
      });
  };

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <Carousel fade>
          {isAuthenticated &&
            this.state.bestBooksArr.map((item) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={item.url}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h2>Book Name: {item.title} </h2>
                    <h2>Status: {item.status}</h2>
                    <h2>Description: {item.description}</h2>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import BookItem from "./BookItem";
import UpdateForm from "./UpdateForm";
import BookFormModal from "./BookFormModal";
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestBooksArr: [],
      showClick: false,
      showModal:false,
    };
  }
  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .get(`https://aseel-books.herokuapp.com/mybooks?email=${email}`)
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
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: email,
    };
    axios
      .post(`https://aseel-books.herokuapp.com/addBook`, bookObj)
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
      .delete(`https://aseel-books.herokuapp.com/deletebook/${id}?email=${email}`)
      .then((result) => {
        this.setState({
          bestBooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log("error in deleting Book");
      });
  };
  updateBook=async(event)=>{
    event.preventDefault();
    const{user}=this.props.auth0;
    const email=user.email;
    const obj={
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: email,
    }
    await axios
    .put(`https://aseel-books.herokuapp.com/updatebook/${this.state.id}`,obj)
    .then(result=>{
      this.setState({
        BookArray:result.data,
        showFlag:false
      })
    })
    .catch(err=>{
      console.log("Error on updating");
    })
  }
  
  handleClose = ()=> {
    this.setState({
      showModal: false
    })
  }
  showUpdateForm = (item)=>{
    this.setState({
      showModal:true,
      title:item.title,
      description:item.description,
      status:item.status,
      id:item._id,
      
    })
  }
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
            deleteBook={this.deleteBook}
            showUpdateForm = {this.showUpdateForm}
            />
           
          })}
          <UpdateForm
          show = {this.state.showModal}
          handleClose = {this.handleClose}
          />
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);

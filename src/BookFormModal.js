import React from "react";

class BookFormModal extends React.Component{
    render(){
        return(
            <>
<form onSubmit={this.props.addBook} >
  <fieldset>
    <legend>Add A Book:</legend>
    
    <input type="text" id="bookName" name="bookName" placeholder="Book Name"/>
    
    <input type="text" id="description" name="description" placeholder="Description"/>
    
    <input type="text" id="status" name="status" placeholder="Status"/>

    <input type="submit" value="Add Book"/>
  </fieldset>
</form>
            </>
        )
   } 
}

export default BookFormModal;
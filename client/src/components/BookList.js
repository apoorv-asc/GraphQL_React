import React, { Component } from "react";
import { graphql } from "react-apollo";

// Importing Queries
import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  displayBooks() {
    var data = this.props.data;
    if (data.loading) return <div>Loading books...</div>;
    else
      return data.books.map((book) => {
        return <li key={book.id}>{book.name}</li>;
      });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

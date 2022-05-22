import React, { Component } from "react";
import { graphql } from "react-apollo";

// Importing Queries
import { getAuthorsQuery } from "../queries/queries";

export class AddBook extends Component {
  displayAuthors() {
    var data = this.props.data;
    if(data.loading){
        return (<option disabled>Loading Authors...</option>)
    }else{
        return data.authors.map((author)=>{
            return (<option key={author.id} value={author.id}>{author.name}</option>)
        })
    }

  }
  render() {
    return (
      <div>
        <form id="add-book">
          <div className="field">
            <label>Book Name</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Genre</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Author</label>
            <select>
              {this.displayAuthors()}
            </select>
          </div>

          <button>+ </button>
        </form>
      </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);

import React, { Component } from 'react';
import BookService from "./BookService.js";
import ReactDOM from "react-dom"
import "./SearchComponent.css"

class SearchComponent extends Component {
    constructor(){
        super()
        this.state = {
            UserInput : "", 
            BooksAvailable : BookService.BooksAvailable,
        }
        this.TempUserInput = "",
        this.CurrentlySearchingBooks = []
    }

    renderOutput(){
        const MapRows = this.CurrentlySearchingBooks.map(item => {
            return <p>{item.title}</p>
        })
        ReactDOM.render(MapRows,document.getElementById("searchdisplay"))
    }

    UpdateCurrentlySearchingBooks(){
        if(this.TempUserInput == "")
            this.CurrentlySearchingBooks = []
        this.state.BooksAvailable.map(item => {
            let BookTitle = item.title.split(" ")
            BookTitle.map(word => {
                if(word == this.TempUserInput)
                    this.CurrentlySearchingBooks = [...this.CurrentlySearchingBooks, item] 
            })
            let BookAuthorArray = item.authors
            BookAuthorArray.map(author => {
                let BookAuthorName = author.split(" ")
                BookAuthorName.map(name => {
                    if(name == this.TempUserInput)
                        this.CurrentlySearchingBooks = [...this.CurrentlySearchingBooks,item]
                })
            })
        })
        this.renderOutput()
    }

    OnChangeInputSearchHandler = (event) => {
        this.setState ({ UserInput : event.target.value})
        this.TempUserInput = event.target.value;
        this.UpdateCurrentlySearchingBooks();
    }

    render() {
        return (
            <div className = "searchcontainer">
                <input className = "searchbar" type = "text" value = {this.state.UserInput} placeholder = "Search by Title or Author " onChange = {this.OnChangeInputSearchHandler}/>
                <div id = "searchdisplay"></div>
            </div>
        );
    }
}

export default SearchComponent;
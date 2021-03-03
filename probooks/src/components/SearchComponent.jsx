import React, { Component } from 'react';
import BookService from "./BookService.js"
import BookComponent from "./BookComponent.jsx";
import "./SearchComponent.css"

class SearchComponent extends Component {
    constructor(){
        super()
        this.state = {
            UserInput : "", 
            BooksAvailable : BookService.BooksAvailable,
            BooksFoundCount : 0,
            SearchedBooks : []
        }
        this.TempUserInput = "",
        this.CurrentlySearchingBooks = []
    }

    ShouldLaunchHomeComponent = () => {
        this.props.ShouldReLaunchHomeComponent()
    } 

    renderOutput(){
        const MapRows = this.CurrentlySearchingBooks.map(item => {
            return <BookComponent Book = {item} key = {item.title} ShouldLaunchHomeComponent = {this.ShouldLaunchHomeComponent.bind(this)} ></BookComponent>
        })
        this.setState ( {BooksFoundCount : this.CurrentlySearchingBooks.length} )
        this.state.SearchedBooks = MapRows
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
                <input className = "searchbar" type = "text" value = {this.state.UserInput} placeholder = "Search by Title or Author " onChange = {this.OnChangeInputSearchHandler} autoFocus/>
                <div id = "searchdisplaycount"><p>{this.state.BooksFoundCount} Books Found!</p> </div>
                <div id = "searchdisplay">
                    {this.state.SearchedBooks.map(book => {
                        return book
                    })}
                </div>
            </div>
        );
    }
}

export default SearchComponent;
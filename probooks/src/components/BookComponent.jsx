import React, { Component } from 'react';
import "./BookComponent.css";
import BookService from "./BookService.js"

class BookComponent extends Component {
    constructor(){
        super()
        this.state = {
            DropDownList : ""
        }
    }

    renderAuthorOutput(){
        if (this.props.Book.authors.length == 1)
            return this.props.Book.authors[0]
        else{
            let AuthorsName = " "
            this.props.Book.authors.map(authorname => {
                AuthorsName = AuthorsName + authorname + " , "
            })
            return AuthorsName.substr(0 , AuthorsName.length-2)
        }
    }

    OnClickMoveToHandler = (event) => {
        let MoveTo = event.target.value
        if (MoveTo == "Reading")
            BookService.CurrentlyReadingBooks.push(this.props.Book)
        else if (MoveTo == "Like")
            BookService.LikedBooks.push(this.props.Book)
        else if (MoveTo == "DisLike")
            BookService.DisLikedBooks.push(this.props.Book)
        else if (MoveTo == "Delete" && this.props.group != undefined){
            BookService.DeletedBookCount = BookService.DeletedBookCount + 1;
            if(this.props.group == "Reading")
                BookService.CurrentlyReadingBooks.pop(this.props.Book)
            else if(this.props.group == "Like")
                BookService.LikedBooks.pop(this.props.Book)
            else
                BookService.DisLikedBooks.pop(this.props.Book)
        }
        if(MoveTo != "Move To")
            this.props.ShouldLaunchHomeComponent()
    }

    OnClickButtonDisplayHandler = () => {
        const DropDown = <select className = "dropdown" key = {this.props.Book.title} onClick = {this.OnClickMoveToHandler}>
            <option>Move To</option>
            <option value = "Reading">Reading</option>
            <option value = "Like">Like</option>
            <option value = "DisLike">DisLike</option>
            <option value = "Delete">Delete</option>
        </select>
        this.setState ( { DropDownList : DropDown } )
    }

    render() {
        return (
            <div className = "bookcontainer">
                <div>
                <div className = "booksubconatiner">
                    <img className = "image" src={this.props.Book.imageLinks.smallThumbnail} alt = {this.props.Book.title}></img>
                    <button className = "arrowdownbutton" onClick = {this.OnClickButtonDisplayHandler}> 
                        <div className = "arrowdown" id = {this.props.Book.title}>{this.state.DropDownList}</div> 
                    </button>
                </div>
                <p className = "booktitle">{this.props.Book.title}</p>
                <p>{this.renderAuthorOutput()}</p>
                </div>
            </div>
        );
    }
}

export default BookComponent;
import React, { Component } from 'react';
import BookService from "./BookService.js"
import SearchComponent from "./SearchComponent.jsx";
import "./HomeComponent.css"

class HomeComponent extends Component {
    constructor(){
        super();
        this.state = {
            ReadingBooks : BookService.CurrentlyReadingBooks,
            LikedBooks : BookService.LikedBooks,
            DisLikedBooks : BookService.DisLikedBooks,
            LaunchSearchComponent : false
        }
    }

    OnClickSearchHandler = () =>{
        this.setState ({ LaunchSearchComponent : true })
    }

    render() {
        if(this.state.LaunchSearchComponent) {
            return (<SearchComponent></SearchComponent>)
        }
        else{
            return(
                    <div className="container">
                        <div className="read">
                            <p className="subheading">Reading</p>
                                { this.state.ReadingBooks.map((item) => {
                                    return <p key = {item.title}> {item.title} </p>
                                })}
                            <hr/>
                        </div>
                        <div className="like">
                            <p className="subheading">Like</p> 
                                { this.state.LikedBooks.map((item) => {
                                    return <p key = {item.title}> {item.title} </p>
                                })}
                            <hr/>
                        </div>
                        <div className="dislike">
                            <p className="subheading">Dislike</p> 
                                { this.state.DisLikedBooks.map((item) => {
                                    return <p key = {item.title}> {item.title} </p>
                                })}
                            <hr/>
                        </div>
                        <div className="buttondiv">
                            <button className="addbutton" onClick = {this.OnClickSearchHandler}> + </button>
                        </div>
                    </div>
            );
        }
    }
}

export default HomeComponent;
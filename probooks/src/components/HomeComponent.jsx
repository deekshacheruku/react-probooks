import React, { Component } from 'react';
import BookService from "./BookService.js"
import SearchComponent from "./SearchComponent.jsx";
import "./HomeComponent.css"
import BookComponent from './BookComponent.jsx';

class HomeComponent extends Component {
    constructor(){
        super();
        this.state = {
            ReadingBooks : BookService.CurrentlyReadingBooks,
            LikedBooks : BookService.LikedBooks,
            DisLikedBooks : BookService.DisLikedBooks,
            LaunchSearchComponent : false,
            ReadBooksCount : BookService.CurrentlyReadingBooks.length,
            LikedBooksCount : BookService.LikedBooks.length,
            DisLikedBooksCount : BookService.DisLikedBooks.length,
            DeletedBooksCount : BookService.DeletedBookCount
        }
    }

    ReLaunchHomeComponent = () => {
        this.setState ( { ReadBooksCount : BookService.CurrentlyReadingBooks.length , LikedBooksCount : BookService.LikedBooks.length,
                          DisLikedBooksCount : BookService.DisLikedBooks.length , DeletedBooksCount : BookService.DeletedBookCount} )
        this.setState ( { LaunchSearchComponent : false})
    }

    OnClickSearchHandler = () =>{
        this.setState ({ LaunchSearchComponent : true })
    }

    render() {
        if(this.state.LaunchSearchComponent) {
            return (<SearchComponent ShouldReLaunchHomeComponent = {this.ReLaunchHomeComponent.bind(this)}></SearchComponent>)
        }
        else{
            return(
                    <div className ="container">
                        <div className ="read">
                            <p className ="subheading">Reading</p>
                            <div className ="subcontainer">
                                { this.state.ReadingBooks.map((item) => {
                                    return <BookComponent key = {item.title + "Reading"} group = {"Reading"} ShouldLaunchHomeComponent = {this.ReLaunchHomeComponent.bind(this)} Book = {item}></BookComponent>
                                })}
                            </div>
                            <hr/>
                        </div>
                        <div className ="like">
                            <p className ="subheading">Like</p>
                            <div className ="subcontainer"> 
                                { this.state.LikedBooks.map((item) => {
                                    return <BookComponent key = {item.title + "Like"} group = {"Like"} ShouldLaunchHomeComponent = {this.ReLaunchHomeComponent.bind(this)} Book = {item}></BookComponent>
                                })}
                            </div>
                            <hr/>
                        </div>
                        <div className ="dislike">
                            <p className ="subheading">Dislike</p> 
                            <div className ="subcontainer">
                                { this.state.DisLikedBooks.map((item) => {
                                    return <BookComponent key = {item.title + "DisLike"} group = {"DisLike"} ShouldLaunchHomeComponent = {this.ReLaunchHomeComponent.bind(this)} Book = {item}></BookComponent>
                                })}
                            </div>
                            <hr/>
                        </div>
                        <div className ="buttondiv">
                            <button className ="addbutton" onClick = {this.OnClickSearchHandler}> + </button>
                        </div>
                        <div className = "infodiv">
                                <p className = "countinfo">No of Books read : {this.state.ReadBooksCount}</p>
                                <p className = "countinfo">No of Books Liked : {this.state.LikedBooksCount}</p>
                                <p className = "countinfo">No of Books DisLiked : {this.state.DisLikedBooksCount}</p>
                                <p className = "countinfo">No of Books Deleted : {this.state.DeletedBooksCount}</p>
                        </div>
                    </div>
            );
        }
    }
}

export default HomeComponent;
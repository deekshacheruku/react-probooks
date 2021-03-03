import HeaderComponent from "./components/HeaderComponent.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
import React, { Component } from 'react';
import BookService from "./components/BookService.js"
import axios from "axios"
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      isDataLoaded : false
    }
    let token =  localStorage.token = Math.random().toString(36).substr(-8)
    axios.get("https://reactnd-books-api.udacity.com/books",{
      headers : {
        'Accept': 'application/json',
        'Authorization': token
      }
    })
    .then(response =>{
      BookService.BooksAvailable = response.data.books 
      this.setState ({ isDataLoaded : true })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <div id = "home">
         {this.state.isDataLoaded && <HomeComponent></HomeComponent>}
        </div>
      </div>
    );
  }
}

export default App;
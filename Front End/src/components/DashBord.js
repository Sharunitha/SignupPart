import React,{Component} from "react";



export default class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            userData:"",
        };
    }
    componentDidMount(){
      fetch("http://localhost:5000/userData", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
             Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
        if(data.data==="token expired"){
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href="./sign-in";
        }
      });
  }
  logOut=()=>{
    alert("logout Successfully")
    window.localStorage.clear();
    window.location.href="./sign-in";
   
  }
  render(){
    return(
        <div className="main">
            
            <header>
             <h2>RJ Travels</h2>
              <h2>Home Page</h2>
              <div className="search-bar">
              <input type="search" placeholder="Search here"/>
              </div>
              <div className="user-wrapper">
              <h2>{this.state.userData.fname} {""} 
              {this.state.userData.lname}</h2>
              </div>
              <button onClick={this.logOut}>Log Out</button>
            </header>
            <div className="front">
                Welcome {this.state.userData.fname}
               <p className="join">Thank you for joining our website</p> 
            </div>
            <p className="contact">Contact Us:0778457896</p>
          
           
        </div>
    )

  }
}
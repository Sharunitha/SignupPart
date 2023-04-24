import React,{Component} from "react";

export default class SignIn extends Component{
    constructor(props){
        super(props);
            this.state={
                email:"",
                password:"",
            };
            this.handleSubmit=this.handleSubmit.bind(this);
        }
        handleSubmit(e){
            e.preventDefault();
            const{email,password}=this.state;
            console.log(email,password);
            fetch("http://localhost:5000/login-user",{
                method: "POST",
                crossDomain: true,
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*", 
                },
                body:JSON.stringify({
                     email,
                    password,
                }),
            })
                .then((res)=>res.json())
                .then((data)=>{
                    console.log(data,"userRegister");
                    if(data.status==="ok"){
                        alert("login successful")
                        window.localStorage.setItem("token", data.data);
                        window.localStorage.setItem("loggedIn", true);
                        window.location.href = "./userDetails";
                    }
                    else{
                        alert("invaid login,try again");
                        window.location.href = "./sign-in";
                        
                    }
                });
        }
    
    render(){
    return(
        <div className="signinform">
            
        <form onSubmit={this.handleSubmit}>
            <h1>Sign In</h1>
            <div className="input">
                <label>Email Address</label>
                <input type="email" className="textlabel" placeholder="Enter email" required autoComplete="email"
                onChange={(e)=>this.setState({email:e.target.value})}
                />
            </div>
            <div className="input">
                <label>Password</label>
                <input type="password" className="textlabel" placeholder="Enter Password" required
                 onChange={(e)=>this.setState({password:e.target.value})}
                />
            </div>
            <div className="btn">
                <button type="submit" className="">Sign In</button>
            </div>
            <p className="para"> Don't have an Account? <a href="/Sign-up">Sign Up</a></p>
        </form>
        </div>

    );
    }
}
import React,{Component} from "react";
export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            fname:"",
            lname:"",
            email:"",
            password:"",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const{fname,lname,email,password}=this.state;
        console.log(fname,lname,email,password);
        fetch("http://localhost:5000/register",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type": "application/json",
                 Accept: "application/json",
                "Access-Control-Allow-Origin": "*", 
            },
            body:JSON.stringify({
                fname,
                email,
                lname,
                password
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userRegister");
            if(data.status==="ok"){
                alert("Register successful")
                 window.location.href = "./Sign-in";
            }
        });
    }
    render(){
    return(
        <div className="regform">
            
        <form onSubmit={this.handleSubmit}>
            <h1>Sign Up</h1>
            <div className="input">
                <label>First Name</label>
                <input type="text" className="textlabel" placeholder="First Name" required maxLength={20} minLength={4}
                onChange={(e)=>this.setState({fname:e.target.value})}
                />
                
            </div>
            <div className="input">
                <label>Last Name</label>
                <input type="text" className="textlabel" placeholder="Last Name" required maxLength={20} minLength={4}
                 onChange={(e)=>this.setState({lname:e.target.value})}
                />
            </div>
            <div className="input">
                <label>Email Address</label>
                <input type="email" className="textlabel" placeholder="Enter email" required
                 onChange={(e)=>this.setState({email:e.target.value})}
                />
            </div>
            <div className="input">
                <label>Password</label>
                <input type="password" className="textlabel" placeholder="Enter Password" required minLength={7}
                 onChange={(e)=>this.setState({password:e.target.value})}
                />
            </div>
            <div className="btn">
                <button type="submit">Sign Up</button>
            </div>
            <p>Already registered <a href="/Sign-in">Sign in?</a></p>
        </form>
        </div>
        
    );
    }
}
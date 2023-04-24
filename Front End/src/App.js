import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import UserDetails from "./components/DashBord";
function App(){
     const isLoggedIn=window.localStorage.getItem("loggedIn");
    return(
        <Router>
            <div className="App">
                <div className="">
                    <div className="">
                        <Routes>
                            <Route exact path="/" element={isLoggedIn==="true"?<UserDetails/>:<SignIn/>}/>
                            <Route path="/Sign-in" element={<SignIn/>}/>
                            <Route path="/Sign-up" element={<SignUp/>}/>
                            <Route path="/userDetails" element={<UserDetails/>}/>
                        </Routes>
                    </div>
                </div>
        </div>

        </Router>
        

    );
}
export default App;
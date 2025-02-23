
import { auth, logInWithEmailAndPassword } from "../firebase.config";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
function Login() {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
      const navigate = useNavigate();
   useEffect(() => {
        if (loading) {
          return;
        }
        if (user) navigate("/Home");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [user,loading]);
    useEffect(() => {
        if(user) navigate("/Home");
    }, [user, loading, navigate]);
  return (
    <html lang="en">

  <head>
  <link href="assets/css/sb-admin-2.min.css" rel="stylesheet"/>
  <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet"/>

  </head>
  <body class="bg-gradient-primary">

<div class="container">

    <div class="row justify-content-center">

        <div class="col-xl-10 col-lg-12 col-md-9">

            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <div class="row">
                        <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        <div class="col-lg-6">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                </div>
                                <form class="user" onSubmit={(event) => event.preventDefault()}>
                                    <div class="form-group">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control form-control-user"
                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                            placeholder="Enter Email Address..."/>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password"/>
                                    </div>
                                    
                               <button onClick={() => logInWithEmailAndPassword(email, password)} class="btn btn-primary btn-user btn-block">Login</button>
                                    <hr/>
                                    
                                    
                                </form>
                                <hr/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>



</body>
    </html>
  

  );
}
export default Login;
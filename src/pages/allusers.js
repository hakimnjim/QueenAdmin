import React from "react";
import { db2 } from "../firebase.config";
import {  collection,deleteDoc,doc  } from "firebase/firestore";
import { useState, useEffect } from "react";
import { query, onSnapshot } from "firebase/firestore";
function Allusers() {
   

 //get all products
 const [users, setUsers] = useState([]);

 useEffect(() => {
   const q = query(collection(db2, "users"));
   onSnapshot(q, (querySnapshot) => {
    setUsers(
       querySnapshot.docs.map((doc) => ({
         id: doc.id,
         data: doc.data(),
       }))
     );
   });
 }, []);
  //delete by product
  const deleteUsers = async (id) => {
    await deleteDoc(doc(db2, "users", id));
  };





  
  
  
  return (
    <html lang="en">
      <head>
        <link href="assets/css/sb-admin-2.min.css" rel="stylesheet" />
        <link
          href="assets/vendor/datatables/dataTables.bootstrap4.min.css"
          rel="stylesheet"
        />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"></link>
      
      </head>
      <body>
        <h1 class="h3 mb-2 text-gray-800">List Users</h1>

        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">List Users</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>

                    
                  </tr>
                </thead>
                <tbody>
                {users.map((e) => {
                    return (
                      <tr>
                        <td>{e.data.userName}</td>
                        <td>{e.data.email}</td>
                    
                       
                        {console.log(e.data)}
                        <td> <button class="btn btn-danger " onClick={()=>deleteUsers(e.id)} > <i class="bi bi-trash3" ></i></button> 
                       </td>
                      </tr>
                      
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
export default Allusers;
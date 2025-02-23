import React from "react";
import { db2 } from "../firebase.config";
import {  collection,deleteDoc,doc  } from "firebase/firestore";
import { useState, useEffect } from "react";
import { query, onSnapshot ,orderBy} from "firebase/firestore";
function Contacts() {
   

 //get all products
 const [contacts, setContacts] = useState([]);

 useEffect(() => {
   const q = query(collection(db2, "contacts"),orderBy("timestamp", "desc"))
   onSnapshot(q, (querySnapshot) => {
    setContacts(
       querySnapshot.docs.map((doc) => ({
         id: doc.id,
         data: doc.data(),
         
       }))
     );
   });
 }, []);
  //delete by product
  const deleteUsers = async (id) => {
    await deleteDoc(doc(db2, "contacts", id));
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
        <h1 class="h3 mb-2 text-gray-800">List Contacts</h1>

        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">List Contacts</h6>
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
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>

                    <th>Action</th>



                    
                  </tr>
                </thead>
                <tbody>
                {contacts.map((e) => {
                    return (
                      <tr>
                        <td>{e.data.name}</td>
                        <td>{e.data.email}</td>
                        <td>{e.data.subject}</td>
                        <td>{e.data.message}</td>
                        <td>{e.data.timestamp.toDate().toDateString()}</td>


                       

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
export default Contacts;
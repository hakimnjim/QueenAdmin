import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { collection } from "firebase/firestore";
import useFetchDocument from "../../components/customHooks/useFetchDocument";
import { db2 } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import {query, onSnapshot, doc, deleteDoc, where, getDoc, updateDoc} from "firebase/firestore";
const OrderDetail = () => {
   
     const Location = useLocation(); 
     var idOrder = Location.state.id;
     const [order, setOrder] = useState(null);
     const [user, setUser] = useState({})
     const {document} = useFetchDocument("orders", idOrder);
     const [uid, setUid] = useState("");
     const [state_order, setState] = useState({ changeState: 0 });
     //get the user

     
     useEffect(() => {
       setOrder(document);
       if(document&&document.userId){
        setUid(document.userId)
       }
    }, [document]);
    
    useEffect(() => {
      if(uid!=""){
        const docRef = doc(db2, "users", uid);
        getDoc(docRef).then(docSnap => {
          if (docSnap.exists()) {
            setUser(docSnap.data())
        }
        })
      }   
},[uid])
    function handleStateChange(event) {
      setState({
        state_order: event.target.value,
        changeState: 1,
      });
    }
    const updateOrder = async (e) => {
      if (state_order.changeState === 1) {
        const washingtonRef = doc(db2, "orders", idOrder);
        await updateDoc(washingtonRef, {
          state: state_order.state_order,
        });
      }
      
    };
    return(
     <html lang="en">
     <head>
       <link href="assets/css/sb-admin-2.min.css" rel="stylesheet" />
       <link
         href="assets/vendor/datatables/dataTables.bootstrap4.min.css"
         rel="stylesheet"
       />
       <link
         rel="stylesheet"
         href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
       ></link>
     </head>
     <body>
     <section>
      <div >
        <h2>Détails De la commande</h2>
        
        <br />
        {order === null ? (
          <p>Oops Quelque chose s'est mal passé</p>
        ) : (
          <>
            <p><b>Identifiant : </b> {order.id}</p>
            <p><b>Prix : </b> €{order.totalAmount}</p>
            <p> <b>Etat de la commande : </b> {order.state}</p>
            <br />
            <div class="table-responsive">
            <h3>Détails du chariot:</h3>
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Produit</th>
                  <th>Libellé</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Prix Total</th>
                </tr>
              </thead>
              <tbody>
              { order.items.map((cart, index) =>{
               const {id, name, price, photo, cartQuantity,weight , userId, category} = cart
               return(
               <tr key={id}>
                    <td ><h6>{index+1}</h6></td>
                    <td ><img src={photo} style={{maxWidth:"50px"}} alt="product"/></td>
                    <td><h6>{name}</h6></td>
                    <td ><h6>{category}</h6></td>
                    <td ><h6>€{price}<small>/{weight}</small></h6></td>
                    <td ><h6>{cartQuantity}</h6></td>
                    <td ><h6>€{(price * cartQuantity).toFixed(2)}</h6></td>
               </tr>
               )}
          )}
              </tbody>
             
            </table></div>
            <h2>Client :</h2>
            <p><b>Identifiant Client : </b> {uid}</p>
            <p><b>Client: </b> {user.userName}</p>
            <p> <b>Email : </b> {user.email}</p>

            <h3>Détails de livraison:</h3>
            <p><b>Identifiant : </b> {order.commandReference}</p>
                    <p><b>Pays: </b>{order.shippingAddress.country}</p>
                    <p ><b>Ville: </b>{order.shippingAddress.city}</p>
                    <p ><b>Addresse: </b>{order.shippingAddress.address}</p>
                    <p ><b>Téléphone: </b>{order.shippingAddress.phone}</p>
                    <p ><b>Code Postal: </b>{order.shippingAddress.postal}</p>
                    <p ><b>Type de livraison: </b>{order.shippingAddress.livraisonType}</p>
          
              
            
            <p> <b>Etat : </b> {order.state}</p>
            <input  type="text"
                  class="form-control"
                  onChange={handleStateChange}
                  defaultValue={order.state}
                  placeholder="state_order....."/>
            
            <br />
            <button onClick={updateOrder}>Update</button>
          </>
        )}
      </div>
    </section>
    
     </body>
   </html>
     );
};

export default OrderDetail;
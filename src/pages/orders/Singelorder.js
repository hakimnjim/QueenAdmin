import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import { query, where, onSnapshot, documentId } from "firebase/firestore";
import { collection, updateDoc, doc } from "firebase/firestore";
import { db2 } from "../../firebase.config";

function Singelorder() {
  //get all users
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
  //get all products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const q = query(collection(db2, "products"));
    onSnapshot(q, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  //get nameUser
  function getusers(id) {
    for (let a = 0; a < users.length; a++) {
      if (users[a].id === id) {
        var element = users[a].data.userName;
        return element;
      }
    }
  }
  //get name product
  var array = [];
  function getProd(srt) {
    array = [];
    if (srt) {
      for (let index = 0; index < srt.length; index++) {
        for (let a = 0; a < products.length; a++) {
          if (products[a].id === srt[index]) {
            array.push(products[a].data.name);
          }
        }
      }
    }
  }
  //updatestateorders
  const [state, setState] = useState();
  function updateStateOrder(order_id) {
    const washingtonRef = doc(db2, "orders", order_id);
    updateDoc(washingtonRef, {
      state: 1,
    });
  }
  //approuvestateorder
  function approuveStateOrder(order_id) {
    const washingtonRef = doc(db2, "orders", order_id);
    updateDoc(washingtonRef, {
      state: 2,
    });
  }
  // affichage de state order
  function displayState(state) {
    if (state === 0) {
      return (
        <>
          <div class="badge badge-warning mx-1">Réçue</div>
        </>
      );
    }
    if (state === 1) {
      return (
        <>
          <div class="badge badge-info mx-1">Expédiée</div>
        </>
      );
    }
    if (state === 2) {
      return (
        <>
          <div class="badge badge-success mx-1"> Livrée</div>
        </>
      );
    }
  }

  //get order by id
  const [order, setOrder] = useState({});
  const Location = useLocation();
  var order_id = Location.state.id;
  useEffect(() => {
    const q = query(
      collection(db2, "orders"),
      where(documentId(), "==", order_id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setOrder(doc.data());
      });
    });
  }, [order_id]);
  //update price_totale
  const [price_total, setPrice] = useState({ changeState: 0 });
  const [date_order, setDate] = useState({ changeState: 0 });
  function handlePriceChange(event) {
    setPrice({
      price_total: event.target.value,
      changeState: 1,
    });
  }
  function handleDateChange(event) {
    setDate({
      date_order: event.target.value,
      changeState: 1,
    });
  }
  const updateOrder = async (e) => {
    if (price_total.changeState === 1) {
      const washingtonRef = doc(db2, "orders", order_id);
      await updateDoc(washingtonRef, {
        price_total: price_total.price_total,
      });
    }
    if (date_order.changeState === 1) {
      const washingtonRef = doc(db2, "orders", order_id);
      await updateDoc(washingtonRef, {
        date_order: date_order.date_order,
      });
    }
  };
  function aaaa(state, id) {
    if (state === 0) {
      return <>
        <button
            class="btn btn-warning mx-1"
            onClick={() => updateStateOrder(id)}
          >
            Update
          </button>
     
  

      
      </>;
    }
    if (state === 1) {
      return <>
        <button
            class="btn btn-info mx-1"
            onClick={() => updateStateOrder(id)}
          >
            Update
          </button>
      
      </>;
    }
    if (state === 2) {
      return <>wseeeel ya boss</>;
    }
  }







  return (
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
        <h1 class="h3 mb-2 text-gray-800">Order Details</h1>
        <div class="card shadow mb-4">
          <div class="card-body">
            <div class="table-responsive">
              <h3 class="my-3">{getusers(order.user_id)}</h3>
              <ul>
                <li>
                  {getProd(order.product)}

                  {array.map((d) => {
                    return <p>{d}</p>;
                  })}
                </li>
                <li>{order.timestamp}</li>
                <li>{order.price_total}</li>
                <li>{displayState(order.state)}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card shadow mb-4">
          <div class="card-body">
            <div class="table-responsive">
              <h3 class="waraing my-3">Edit Order</h3>
              <div className="form-group">
                <label for="nom">State</label>
               <div><label>{(order.state,order.id)}</label></div>
               <input
                  type="text"
                  class="form-control"
                  onChange={handleDateChange}
                  defaultValue={order.date_order}
                  placeholder="date_order....."
                />
               <div></div>
              </div>
              <div className="form-group">
                <label for="nom">date_order</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={handleDateChange}
                  defaultValue={order.date_order}
                  placeholder="date_order....."
                />
              </div>
              <div className="form-group">
                <label for="nom">price_total</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={handlePriceChange}
                  defaultValue={order.price_total}
                  placeholder="price_total....."
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary"
                onClick={() => updateOrder()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
export default Singelorder;

/* eslint-disable no-unused-vars */
import React from "react";
import { db2 } from "../../firebase.config";
import { collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  query,
  onSnapshot,
  doc,
  deleteDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Allorders() {
  //get all users
  const [users, setUsers] = useState([]);

  const viewOrder = async (idOrder) => {
    navigate("/OrderDetail", { state: { id: idOrder } });
};
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
  //get all orders
  const [orders, setOrders] = useState([]);
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
  //get location
  function getLocationUser(id) {
    for (let a = 0; a < users.length; a++) {
      if (users[a].id === id) {
        var z = users[a].data.city;
        return z;
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
  //delete by order
  const deleteOrders = async (id) => {
    await deleteDoc(doc(db2, "orders", id));
  };
  //updatestateorders
  const [state, setState] = useState();
  function updateStateOrder(id) {
    const washingtonRef = doc(db2, "orders", id);
    updateDoc(washingtonRef, {
      state: 1,
    });
  }
  //approuvestateorder
  function approuveStateOrder(id) {
    const washingtonRef = doc(db2, "orders", id);
    updateDoc(washingtonRef, {
      state: 2,
    });
  }
  // affichage de state order
  function displayState(state, id) {
    if (state = 0) {
      return <>Réçue</>;
    }
    if (state = 1) {
      return <>Expédiée</>;
    }
    if (state = 2) {
      return <>Livrée</>;
    }
  } 

  // function to navigate details
  const navigate = useNavigate();
  const Details = async (idp) => {
    navigate("/OrderDetail", { state: { id: idp } });
  };

  const [value, setValue] = useState("all");
  useEffect(() => {
    if (value === "all") {
      const q = query(collection(db2, "orders"));
      onSnapshot(q, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            
          }))
        );
      });
    } else {
      const q = query(
        collection(db2, "orders"),
        where("state", "==", parseInt(value))
      );
      onSnapshot(q, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
  }, [value]);
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
        <div class="card shadow mb-4">
          <div class="card-body">
            <h1 class="h3 mb-2 text-gray-800">List orders</h1>
            <select
              class="form-select"
              aria-label="Default select example"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <option value="all" selected>
                all orders
              </option>
              <option value="0">state 0</option>
              <option value="1">state 1</option>
              <option value="2">state 2</option>
            </select>

            <div class="table-responsive">
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>User Name</th>
                    <th>Location</th>
                    <th>products</th>
                    <th>price total</th>
                    <th>state</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((e) => {
                    return (
                      <tr>
                     <button class="btn " onClick={() => viewOrder(e.id)}>   {e.id}</button>
                        <td>{getusers(e.data.userId)}</td>
                        <td>{getLocationUser(e.data.userId)}</td>
                        <td>
                          {e.data.items.length}
                        </td>
                        <td>{e.data.totalAmount}</td>
                        {e.data.state=="0"&&
                        <td>Réçue</td>
                        }
                        {e.data.state=="1"&&
                        <td>Expédiée</td>
                        }
                        {e.data.state=="2"&&
                        <td>Livrée</td>
                        }

                        <td>
                          {" "}
                          <button
                            class="btn btn-danger mx-1"
                            onClick={() => deleteOrders(e.id)}
                          >
                            {" "}
                            <i class="bi bi-trash3"></i>
                          </button>
                          <button class="btn btn-warning mx-1">
                            {" "}
                            <i
                              class="bi bi-pencil-square"
                              onClick={() => Details(e.id)}
                            >
                              {" "}
                            </i>{" "}
                          </button>
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
export default Allorders;

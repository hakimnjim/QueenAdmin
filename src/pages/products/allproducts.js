import React from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { db2 } from "../../firebase.config";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { query, onSnapshot } from "firebase/firestore";
function Allproducts() {
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
  //delete by product
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db2, "products", id));
  };
  const updateProduct = async (e) => {
    const washingtonRef = doc(db2, "products", e.id);
      await updateDoc(washingtonRef, {
        stock: 0
      });
  }
  const resetStockCount = async() =>{
    products.forEach(element => {
      console.log(element)
      updateProduct(element);
    });
    
   
  };

  // function to navigate edit
  const navigate = useNavigate();
  const edit = async (idp) => {
    navigate("/editprooduct", { state: { id: idp } });
    console.log(idp)
  };

  //recherche
  const [result, setResult] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      const q = query(collection(db2, "products"));
      // eslint-disable-next-line no-unused-vars
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
        });
      });
    }
    if (value.length > 0) {
      setResult([]);
      let searchQuery = value.toLowerCase();
      for (const key in products) {
        let des = products[key].data.description.toLowerCase();

        let name = products[key].data.name.toLowerCase();
        if (
          des.slice(0, searchQuery.length).indexOf(searchQuery) !== -1 ||
          name.slice(0, searchQuery.length).indexOf(searchQuery) !== -1
        ) {
          setResult((prevResult) => {
            return [...prevResult, products[key]];
          });
        }
      }
    } else {
      setResult([]);
    }      console.log(result)

  }, [products, value]);

  const shortenText = (text, n) => {
    if (text.length > n) {
        const shortenedText = text.substring(0, n).concat("...");
        return shortenedText;
    }
    return text;
};
// function filtrage
/*function filter(data){
  if(data==='populaire')
{
  return products
}

}*/
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
        <h1 class="h3 mb-2 text-gray-800">List products</h1>

        <div class="card shadow mb-4">
          <Link to="/Addproduct">
            {" "}
            <div class="card-header py-3">
              <Button>
                <i class="bi-plus me-1"></i>
                Add product
              </Button>{" "}
            </div>
          </Link>

          <div class="dropdown">
              <input
                type="text"
                placeholder="Cherchez..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div id="myDropdown" class="dropdown-content show">
                {result.slice(0, 5).map((result, Index) => (
                  <div key={Index}>
                    <button onClick={() => edit(result.id)}>
                      <img
                        src={result.data.photo}
                        class="mx-3 rounded"
                        height="30"
                      />
                      {result.data.name}
                    </button>
                  </div>
                ))}
              </div>
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
                    <th>photo</th>
                    <th>Name</th>
                    <th>description</th>

                    <th>price</th>
                    <th>category</th>
                    <th>tag</th>
                    <th>discount</th>
                    <th>Stock</th>

                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((e) => {
                    return (
                      <tr>
                        <td>
                          <img src={e.data.photo} height="60" />
                        </td>
                        <td>{e.data.name}</td>
                        <td>{shortenText(e.data.description, 40)}</td>
                        <td>{e.data.price}</td>
                        <td>{e.data.category}</td>
                        <td>{e.data.tag}</td>
                        <td>{e.data.discount}</td>
                        <td>{e.data.stock}</td>

                        <td>
                          {" "}
                          <button
                            class=" mx-1 btn btn-danger"
                            onClick={() => deleteProduct(e.id)}
                          >
                            {" "}
                            <i class="bi bi-trash3"></i>
                          </button>
                          <button class="mx-1 btn btn-warning">
                            <i
                              class="bi bi-pencil-square"
                              onClick={() => edit(e.id)}
                            >
                              {" "}
                            </i>
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
export default Allproducts;

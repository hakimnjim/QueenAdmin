import React, { useState } from "react";
import { storage, db2 } from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";
import { ref as sRef } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

function Addproduct() {
  //------declarations
  const [description, setDesc] = useState("");
  const [longDescription, setLongDesc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [Vurl, setUrl] = useState("");
  const [discount, setDiscount] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const notifySuccess = () => toast.success("Prodcut added with success");
  const notifyError = (err) => toast.success(err);
  const [tags, setTags] = useState([]);

  const handleTagChange = (event) => {
    const newTags = event.target.value.split(",");
    setTags({ tags: newTags });
  };

  //---------upload file

  const uploadIMG = async () => {
    const imageRef = sRef(storage, `products/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => {
        addProduct(url);
      });
    });
  };

  //--------Add product

  const addProduct = async (url) => {
    const docRef = await addDoc(collection(db2, "products"), {
      name: name,
      description: description,
      longDescription: longDescription,
      price: price ,
      percentage: discount,
      photo: url,
      category: category,
      price: price,
      weight: weight,
      stock: stock,
      nb_vente: 0,
      searchTags: tags.tags,
      tag: tag,
      video: Vurl,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        notifySuccess();
      })
      .catch((error) => {
        notifyError(error.message);
      });
  };

  return (
    <html lang="en">
      <head>
        <link href="assets/css/sb-admin-2.min.css" rel="stylesheet" />
        <link
          href="assets/vendor/datatables/dataTables.bootstrap4.min.css"
          rel="stylesheet"
        />
      </head>

      <body>
        <ToastContainer />
        <div class="container">
          <h1>Add Product</h1>
          <form onSubmit={(event) => event.preventDefault()}>
            <fieldset>
              <div className="form-group">
                <label for="nom">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name....."
                  required
                />
              </div>
              <div className="form-group">
                <label for="nom">Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="nom"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price....."
                  required
                />
              </div>
              <div className="form-group">
                <label for="nom">short Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="short description....."
                  required
                />
              </div>

              <div className="form-group">
                <label for="nom">Long Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  value={longDescription}
                  onChange={(e) => setLongDesc(e.target.value)}
                  placeholder="long description....."
                  required
                />
              </div>
              <div className="form-group">
                <label for="nom">Weight</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="weight....."
                  required
                />
              </div>
              <div className="form-group">
                <label for="stock">Stock</label>
                <input
                  type="text"
                  class="form-control"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Stock....."
                  required
                />
              </div>
              <div className="form-group">
                <label for="nom">Search tags</label>
                <input
                  class="form-control"
                  type="text"
                  id="tags"
                  name="tags"
                  onChange={handleTagChange}
                />
              </div>

              <div className="form-group">
                <label for="Category">Category</label>

                <select
                  class="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option hidden selected>
                    Select category...
                  </option>
                  <option value="Sucré">Sucré</option>
                  <option value="Plat">Plat</option>
                  <option value="Epice">Epice</option>
                  <option value="Boisson">Boisson</option>
                </select>
              </div>
              <div className="form-group">
                <label for="cars">Tag</label>

                <select
                  class="form-control"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
                >
                  <option hidden selected>
                    Select tag...
                  </option>
                  <option value="nouveau">nouveau</option>
                  <option value="solde">solde</option>
                  <option value="populaire">populaire</option>
                </select>
              </div>

              <div className="form-group">
                <label for="nom">Discount</label>
                <input
                  type="number"
                  class="form-control"
                  id="nom"
                  max="100"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Discount....."
                  required
                />
              </div>

              <div class="mb-3">
                <label for="DefaultFile" class="form-label">
                  Image
                </label>
                <input
                  class="form-control"
                  type="file"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                  id="DefaultFile"
                  multiple
                  required
                ></input>
              </div>
              <div className="form-group">
                <label for="nom">Video Url</label>
                <input
                  type="url"
                  class="form-control"
                  id="nom"
                  value={Vurl}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="video url....."
                  required
                />
              </div>
            </fieldset>
            <button class="btn btn-primary" onClick={() => uploadIMG()}>
              Submit
            </button>
          </form>
        </div>
      </body>
    </html>
  );
}
export default Addproduct;

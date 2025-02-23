/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import { query, where, onSnapshot, documentId, updateDoc, doc } from "firebase/firestore";
import { ref as sRef } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"; import { ToastContainer, toast } from 'react-toastify';
import { storage, db2 } from "../../firebase.config";

function Editproduct() {
  const [product, setProduct] = useState({});
  const [name, setName] = useState({ changeState: 0 });
  const [description, setDes] = useState({ changeState: 0 });
  const [longDescription, setLongDes] = useState({ changeState: 0 });
  const [discount, setDis] = useState({ changeState: 0 });
  const [weight, setWei] = useState({ changeState: 0 });
  const [price, setPrice] = useState({ changeState: 0 });
  const [category, setCategory] = useState({ changeState: 0 });
  const [tag, setTag] = useState({ changeState: 0 });
  const [Vurl, setUrl] = useState({ changeState: 0 });
  const [stock, setStock] = useState({ changeState: 0 });
  const notifySuccess = () => toast.success("Product updated with sucess");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const KeyCodes = {
    enter: 13
  };
  const delimiters = [KeyCodes.enter];
  const [tags, setTags] = useState([])


  //--------get product's id

  const Location = useLocation();
  var idProduct = Location.state.id;

  //------------------get product
  useEffect(() => {
    const q = query(
      collection(db2, "products"),
      where(documentId(), "==", idProduct)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setProduct(doc.data());
      });
    });

  }, [idProduct]);


  //----handling update changes

  const handleSearchTagsChange = event => {
    const newTags = event.target.value.split(',');
    setTags({
      tags: newTags,
      changeState: 1
    });
  };

  function handleNameChange(event) {
    setName({
      name: event.target.value,
      changeState: 1
    });
  }
  function handleDesChange(event) {
    setDes({
      description: event.target.value,
      changeState: 1
    });
  } 
  function handleLongDesChange(event) {
    setDes({
      longDescription: event.target.value,
      changeState: 1
    });
  }

  function handleDisChange(event) {
    setDis({
      discount: event.target.value,
      changeState: 1
    });
  }
  function handleWeiChange(event) {
    setWei({
      weight: event.target.value,
      changeState: 1
    });
  }
  function handleStockChange(event) {
    setStock({
      stock: event.target.value,
      changeState: 1
    });
  }
  function handleTagChange(event) {
    setTag({
      tag: event.target.value,
      changeState: 1
    });
  } function handleCategoryChange(event) {
    setCategory({
      category: event.target.value,
      changeState: 1
    });
  } function handleVurlChange(event) {
    setUrl({
      video: event.target.value,
      changeState: 1
    });
  } function handlePriceChange(event) {
    setPrice({
      price: event.target.value,
      changeState: 1
    });
  }


  //-----------update file
  const updateIMG = async () => {
    if (!imageUpload) {
      return updateProduct();
    }
    const imageRef = sRef(storage, `products/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => {
        const washingtonRef = doc(db2, "products", idProduct);
        updateDoc(washingtonRef, {
          photo: url
        }).then(function()
        {
          updateProduct()
        }
        );
      });
    });

  }

  //-----------update product

  const updateProduct = async (e) => {

    if (name.changeState === 1) {
      const washingtonRef = doc(db2, "products", idProduct);
      await updateDoc(washingtonRef, {
        name: name.name
      });
    }
    if (description.changeState === 1) {
      const washingtonRef = doc(db2, "products", idProduct);
      await updateDoc(washingtonRef, {
        description: description.description
      });
    }

    if (longDescription.changeState === 1) {
      const washingtonRef = doc(db2, "products", idProduct);
      await updateDoc(washingtonRef, {
        longDescription: longDescription.longDescription
      });
    }

    if (tag.changeState === 1) {
      const washingtonRef = doc(db2, "products", idProduct);
      await updateDoc(washingtonRef, {
        tag: tag.tag
      });
    }
    if (category.changeState === 1) {
      const washingtonRef = doc(db2, "products", idProduct);
      await updateDoc(washingtonRef, {
        category: category.category
      });
    } if (price.changeState === 1) {
      const washingtonRef = doc(db2, "products", idProduct);
      await updateDoc(washingtonRef, {
        price: price.price,
      });
    } if (Vurl.changeState === 1) {
      const washingtonRef = doc(db2, "products", idProduct);
      await updateDoc(washingtonRef, {
        video: Vurl.video
      });
    } 
    if (discount.changeState === 1) {
      const washingtonRef = doc(db2, "products", idProduct);

      if (price.changeState === 1) {

        await updateDoc(washingtonRef, {
          discount: discount.discount,
          percentage:discount.discount

        });
      }else {
          await updateDoc(washingtonRef, {
            discount: discount.discount,
            percentage:discount.discount
          });

        }      
      } if (weight.changeState === 1) {
        const washingtonRef = doc(db2, "products", idProduct);
        await updateDoc(washingtonRef, {
          weight: weight.weight
        });
      }
      if (stock.changeState === 1) {
        const washingtonRef = doc(db2, "products", idProduct);
        await updateDoc(washingtonRef, {
          stock: stock.stock
        });
      }
      if (tags.changeState === 1) {
        const washingtonRef = doc(db2, "products", idProduct);
        await updateDoc(washingtonRef, {
          searchTags: tags.tags
        });
      }

      notifySuccess()
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
          <ToastContainer />
          <div class="container">
            <h1>Form edit Product</h1>
            <form onSubmit={(event) => event.preventDefault()}>
              <img src={product.photo} height="100" />

              <fieldset>

                <div class="mb-3">
                  <label for="DefaultFile" class="form-label">
                    Choose image to your product
                  </label>
                  <input
                    type="file" onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                    }}
                    class="form-control"
                    id="DefaultFile"
                    multiple
                  ></input>
                </div>
                <div className="form-group">
                  <label for="nom">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleNameChange}
                    defaultValue={product.name}
                    placeholder="name....."
                  />
                </div>
                <div className="form-group">
                  <label for="nom">short Description</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleDesChange}

                    defaultValue={product.description}
                    placeholder="short description....."
                  />
                </div>

                <div className="form-group">
                  <label for="nom">long Description</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleLongDesChange}

                    defaultValue={product.longDescription}
                    placeholder="long description....."
                  />
                </div>
                <div className="form-group">
                  <label for="nom">Weight</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleWeiChange}

                    defaultValue={product.weight}
                    placeholder="weight....."
                  />
                </div>
                <div className="form-group">
                  <label for="nom">Stock</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={handleStockChange}

                    defaultValue={product.stock}
                    placeholder="stockt....."
                  />
                </div>

                <div className="form-group">
                  <label for="nom">Search tags</label>

                  <input class="form-control"
                    type="text" id="tags" defaultValue={product.searchTags}
                    name="tags" onChange={handleSearchTagsChange} />

                </div>

                <div className="form-group">
                  <label for="nom">Price</label>
                  <input
                    type="number"
                    class="form-control"
                    id="nom"
                    defaultValue={product.price}
                    onChange={handlePriceChange}

                    placeholder="Price....."
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="Category">Category</label>

                  <select class="form-control"
                    onChange={handleCategoryChange}>
                    <option hidden selected >{product.category}</option>
                    <option value="Sucré">Sucré</option>
                    <option value="Plat">Plat</option>
                    <option value="Epice">Epice</option>
                    <option value="Boisson">Boisson</option>
                  </select>

                </div>
                <div className="form-group">
                  <label for="cars">Tag</label>

                  <select class="form-control"
                    onChange={handleTagChange}
                  >
                    <option hidden selected >{product.tag}</option>
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
                    defaultValue={product.percentage}
                    onChange={handleDisChange}
                    placeholder="Discount....."

                  />
                </div>
                <div className="form-group">
                  <label for="nom">Video Url</label>
                  <input
                    type="url"
                    class="form-control"
                    id="nom"
                    defaultValue={product.video}
                    onChange={handleVurlChange}
                    placeholder="video url....."

                  />
                </div>

              </fieldset>
              <button type="submit" class="btn btn-primary" onClick={() => updateIMG()}>Submit</button>
            </form>
          </div>
        </body>
      </html>
    );
  }
  export default Editproduct;
import React, { useState } from "react";
import { storage, db2 } from "../firebase.config";
import { ToastContainer, toast } from "react-toastify";
import { ref as sRef } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

function Blog() {
  //------declarations

  const [title, setTitle] = useState("");
  const [longDescription, setLongDesc] = useState("");
  const [shortDescription, setShortDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const notifySuccess = () => toast.success("blog added with success");
  const notifyError = (err) => toast.success(err);
  //---------upload file

  const uploadIMG = async () => {
  
    const imageRef = sRef(storage, `blogs/${imageUpload.name + v4()}`);
    console.log(imageRef)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => {
        addBlog(url);
      });
    });
  };
  //--------Add product

  const addBlog = async (url) => {
    const docRef = await addDoc(collection(db2, "blogs"), {
      title: title,
      shortDescription: shortDescription,
      longDescription: longDescription,
      author: author,
      photo: url,
      tags: tags,
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
        ></link>
      </head>
      <body>
      <ToastContainer />

        <div class="container">
          <h1>Add Blog</h1>
          <form onSubmit={(event) => event.preventDefault()}>
            <fieldset>
              <div className="form-group">
                <label for="nom">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="title....."
                  required
                />
              </div>
              <div className="form-group">
                <label for="nom">shortDescription</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  value={shortDescription}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="shortDescription....."
                  required
                />
              </div>
              <div className="form-group">
                <label for="nom">longDescription</label>
                <input
                  type="textarea"
                  class="form-control"
                  id="nom"
                  value={longDescription}
                  onChange={(e) => setLongDesc(e.target.value)}
                  placeholder="longDescription....."
                  required
                />
              </div>
             
              <div className="form-group">
                <label for="nom">author</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="author....."
                  required
                />
              </div>
              <div className="form-group">
                <label for="nom">tags</label>
                <input
                  type="text"
                  class="form-control"
                  id="nom"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tags....."
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

export default Blog;

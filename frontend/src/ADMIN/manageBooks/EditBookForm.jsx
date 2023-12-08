import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Are you sure you want to delete confirm prompt
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { backend_server } from "../../main";
import { Col, Row } from "react-bootstrap";

const EditBookForm = () => {
  const API_URL = `${backend_server}/api/v1/books`;

  const { id } = useParams();

  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: "",
    category: "",
    author: "",
    available: false,
    featured: false,
    description: "",
    language: "",
  });
  const [imagePath, setImagePath] = useState("");

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);

      setBookData(response.data.data);
      setImagePath(`${backend_server}/${response.data.data.image}`);
    } catch (error) {
      console.log("ERROR FETCHING BOOK data using _id");
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(bookData)
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBookData({ ...bookData, [name]: value });
  };

  const handleCategoryOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookData({ ...bookData, [name]: value.toUpperCase() });
  };
  const handleLanguageOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookData({ ...bookData, [name]: value.toUpperCase() });
  };

  const handleUpdateButton = async () => {
    const { title, category, author, description, language } = bookData;

    if (!title || !category || !author || !description || !language) {
      return false; // At least one required field is empty
    } else {
      try {
        const response = await axios.patch(`${API_URL}/${id}`, bookData);
        toast.success("Update Success");
        // console.log(response)
        fetchBookData();
      } catch (error) {
        console.log(error.response);
        toast.error("error updating book");
      }
    }
  };

  const showConfirmation = () => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this Book?",
      buttons: [
        {
          label: "Yes",
          onClick: handleDeleteButton,
        },
        {
          label: "No",
          onClick: () => console.log("Cancelled!"),
        },
      ],
    });
  };

  const handleDeleteButton = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.promise(new Promise((resolve) => setTimeout(resolve, 100)), {
        loading: "Deleting ...",
        success: <b>Delete Success</b>,
        error: <b>Delete Failed</b>,
      });

      setTimeout(() => {
        window.location.href = "/admin/managebooks";
      }, 1000);
    } catch (error) {
      console.log(error.response);
      toast.error("error deleting book");
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpdateFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      await axios.patch(`${API_URL}/updateImage/${id}`, formData);

      toast.success("Image Updated Successfully");
      fetchBookData();
      setSelectedImage(null);
    } catch (error) {
      console.log(error.response);
      toast.error("Error updating Image");
    }
  };

  return (
    <div className="container mt-2">
      <h1 className="h1 text-center">Edit Book</h1>

      <div className="row">
        <div className="col-md-4">
          <form className="form my-3" onSubmit={handleImageUpdateFormSubmit}>
            <img
              src={imagePath}
              alt="book image"
              style={{ width: "300px", height: "450px", overflow: "hidden" }}
            />
            <input
              type="file"
              accept="image/*"
              required
              className="m-3"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <img
                src={imagePreview}
                alt=""
                width={"200px"}
                style={{ margin: "20px 0" }}
              />
            )}
            <button type="submit" className="btn btn-success">
              Update Image
            </button>
          </form>
        </div>

        <div className="col">
          <form className="form my-3" onSubmit={handleSubmit}>
            <Col className="d-flex align-items-center">
              <label htmlFor="title" className="col-md-1 my-1 me-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="form-control my-1"
                required
                value={bookData.title}
                onChange={handleOnChange}
                name="title"
                autoComplete="off"
              />
            </Col>

            <Col className="d-flex align-items-center">
              <label htmlFor="category" className="col-md-1 my-1 me-2">
                Category
              </label>
              <input
                type="text"
                className="form-control my-1"
                value={bookData.category}
                onChange={handleCategoryOnChange}
                name="category"
                required
                autoComplete="off"
              />
            </Col>

            <Col className="d-flex align-items-center">
              <label htmlFor="author" className="col-md-1 my-1 me-2">
                Author
              </label>
              <input
                type="text"
                className="form-control my-1"
                value={bookData.author}
                onChange={handleOnChange}
                name="author"
                required
                autoComplete="off"
              />
            </Col>

            <Col className="d-flex align-items-center">
              <label htmlFor="available" className="my-1 me-2">
                Available
              </label>
              <input
                className="form-check-input"
                id="available"
                type="checkbox"
                checked={bookData.available}
                onChange={() =>
                  setBookData({ ...bookData, available: !bookData.available })
                }
              />

              <label htmlFor="featured" className="my-1 me-2 ms-4">
                Featured
              </label>

              <input
                className="form-check-input"
                id="featured"
                type="checkbox"
                checked={bookData.featured}
                onChange={() =>
                  setBookData({ ...bookData, featured: !bookData.featured })
                }
              />
            </Col>

            <Col className="d-flex align-items-center">
              <label htmlFor="language" className="col-md-1 my-1 me-2">
                Language
              </label>
              <input
                type="text"
                className="form-control my-1 mx-3"
                value={bookData.language}
                onChange={handleLanguageOnChange}
                name="language"
                required
                autoComplete="off"
              />
            </Col>

            <Col className="d-flex align-items-center">
              <label htmlFor="description" className="col-md-1 my-1 me-2">
                Description
              </label>
              <textarea
                name="description"
                cols="20"
                rows="5"
                className="form-control my-1 mx-3"
                value={bookData.description}
                onChange={handleOnChange}
                required
                autoComplete="off"
              ></textarea>
            </Col>

            <div
              className="col mt-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                type="button"
                className="btn btn-secondary mx-3"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>

              <button
                type="submit"
                className="btn btn-success mx-3"
                onClick={handleUpdateButton}
              >
                Update
              </button>
              <button
                className="btn btn-danger mx-3"
                onClick={showConfirmation}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { backend_server } from "../../main";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddNewBook = () => {
  const API_URL = `${backend_server}/api/v1/books`;
  const API_URL_ALL_BOOK_CATEGORIES = `${backend_server}/api/v1/book_category`;

  const navigate = useNavigate();

  const empty_inputfield = {
    title: "",
    author: "",
    description: "some random description about book",
    category: "",
    available: true,
    featured: false,
    language: "ENGLISH",
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState();
  const [inputvalue, setInputValue] = useState(empty_inputfield);

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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };

  // ALL Books Categories
  const [relatedCategories, setRelatedCategories] = useState([]);

  const handleCategorySelection = (selectedCategory) => {
    setInputValue({ ...inputvalue, category: selectedCategory.toUpperCase() });
    setRelatedCategories([]);
  };

  const handleCategoryOnChange = async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value.toUpperCase() });

    // CALL API to Fetch all CATEGORIES so USER CAN Select
    try {
      // TODO , use POST Request and send what letters user types
      const data = await axios.post(API_URL_ALL_BOOK_CATEGORIES, {
        user_input_category: value,
      });
      const book_categories = data.data.book_category;
      setRelatedCategories(book_categories);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleLanguageOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value.toUpperCase() });
  };

  const handleOnChangeSelectOptions = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value === "true" ? true : false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputvalue)

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", inputvalue.title);
    formData.append("author", inputvalue.author);
    formData.append("description", inputvalue.description);
    formData.append("category", inputvalue.category);
    formData.append("available", inputvalue.available);
    formData.append("featured", inputvalue.featured);
    formData.append("language", inputvalue.language);

    try {
      await axios.post(API_URL, formData);
      toast.success("new Book Created Successfully");

      setInputValue(empty_inputfield);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error creating new Book : ", error.response);
      toast.error("Error creating new Book");
    }
  };

  return (
    <div className="container mt-2">
      <h1 className="h1 text-center">Add New Book</h1>

      <Container className="my-5">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={handleOnChange}
                value={inputvalue.title}
                placeholder="Title"
                name="title"
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                onChange={handleOnChange}
                value={inputvalue.author}
                placeholder="Author"
                name="author"
                autoComplete="off"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={handleOnChange}
                value={inputvalue.description}
                placeholder="Description"
                name="description"
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                onChange={handleCategoryOnChange}
                value={inputvalue.category}
                placeholder="Category"
                name="category"
                autoComplete="off"
                required
              />
              <div>
                {relatedCategories.map((category) => (
                  <div
                    key={category}
                    className="clickable-category"
                    onClick={() => handleCategorySelection(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                onChange={handleLanguageOnChange}
                value={inputvalue.language}
                placeholder="Language"
                name="language"
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="d-flex"
              style={{ alignItems: "center" }}
            >
              <div className="me-3 ">
                <Form.Label>Available</Form.Label>
                <Form.Select
                  style={{ width: "fit-content" }}
                  onChange={handleOnChangeSelectOptions}
                  value={inputvalue.available.toString()}
                  name="available"
                  required
                >
                  <option value="true">TRUE</option>
                  <option value="false">FALSE</option>
                </Form.Select>
              </div>

              <div className="mx-3">
                <Form.Label>Featured</Form.Label>
                <Form.Select
                  style={{ width: "fit-content" }}
                  onChange={handleOnChangeSelectOptions}
                  value={inputvalue.featured.toString()}
                  name="featured"
                  required
                >
                  <option value="true">TRUE</option>
                  <option value="false">FALSE</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                style={{ width: "fit-content" }}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              {selectedImage && (
                <img
                  src={imagePreview}
                  alt=""
                  width={"200px"}
                  style={{ marginTop: "20px" }}
                />
              )}
            </Form.Group>
          </Row>

          <div className="text-center mt-5">
            <Button type="submit" variant="success">
              Submit
            </Button>

            <button
              type="button"
              className="btn btn-secondary mx-1"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddNewBook;

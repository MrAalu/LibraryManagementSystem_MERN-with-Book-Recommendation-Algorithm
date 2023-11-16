import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AdminNavbar from "./navbar/AdminNavbar";
import PagenotFound from "./404-pageNotFoundADMIN/PagenotFound";
import AdminHome from "./adminHome/AdminHome";
import ManageBooks from "./manageBooks/ManageBooks";
import ViewUsers from "./viewUsers/ViewUsers";
import IssuedBooks from "./issuedBooks/IssuedBooks";
import BooksRequests from "./booksRequests/BooksRequests";
import ReturnedBooks from "./returnedBooks/ReturnedBooks";
import EditBookForm from "./manageBooks/EditBookForm";
import AddNewBook from "./addNewBook/AddNewBook";
import AdminLogout from "./adminLogout/AdminLogout";
import UserIndividualPage from "./viewUsers/UserIndividualPage";
import IssueBookToUser from "./issuedBooks/IssueBookToUser";
import Sidebar from "./sidebar/Sidebar";
import AdminSignup from "./createAdminAccount/AdminSignup";
// import AdminOtpForm from "./adminOTP/adminOtpForm";
import AdminOtpForm from "./adminOTP/AdminOtpForm";

const AdminAPP = () => {
  return (
    <React.Fragment>
      <Router>
        <AdminNavbar />
        <Container fluid>
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col md={10} className="mt-5">
              <Routes>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/logout" element={<AdminLogout />} />
                <Route path="/admin/managebooks" element={<ManageBooks />} />
                <Route path="/admin/viewusers" element={<ViewUsers />} />
                <Route
                  path="/admin/viewusers/:id"
                  element={<UserIndividualPage />}
                />
                <Route path="/admin/issuedbooks" element={<IssuedBooks />} />
                <Route
                  path="/admin/issuebooktouser"
                  element={<IssueBookToUser />}
                />
                <Route
                  path="/admin/booksrequests"
                  element={<BooksRequests />}
                />
                <Route
                  path="/admin/returnedbooks"
                  element={<ReturnedBooks />}
                />
                <Route path="/admin/addnewbook" element={<AddNewBook />} />
                <Route
                  path="/admin/managebooks/:id"
                  element={<EditBookForm />}
                />
                <Route path="*" element={<PagenotFound />} />
                <Route path="/admin/adminsignup" element={<AdminSignup />} />
                <Route path="/admin/otp" element={<AdminOtpForm />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </React.Fragment>
  );
};

export default AdminAPP;

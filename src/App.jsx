import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import MessagesPage from "@/components/pages/MessagesPage";
import FeedPage from "@/components/pages/FeedPage";
import ContactsPage from "@/components/pages/ContactsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-body">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/messages" replace />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="contacts" element={<ContactsPage />} />
          </Route>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="z-[9999]"
        />
      </div>
    </Router>
  );
}

export default App;
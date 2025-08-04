import React, { useEffect, useState } from "react";
import "../css/Text_Input.css";
import api from "./api";

const Text_Input = () => {
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState([]);

  // Fetch data from backend
  async function fetchRequests() {
    try {
      const response = await api.get("/requests");
      // adjust property name to match what your backend returns:
      setRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }

  // Submit new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // send the new message, not the whole array
      await api.post("/requests", { name: message });
      setMessage("");
      fetchRequests();
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <textarea
        className="client-request"
        placeholder="  Type Here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="button type1">
        <span className="btn-txt">Submit</span>
      </button>
    </form>
  );
};

export default Text_Input;

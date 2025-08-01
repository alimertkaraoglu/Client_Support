import React, { useState } from "react";
// Import CSS file
import '../css/Text_Input.css'

export default function Text_Input() {


    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(message)
      setMessage("")
    }
    
  
  return (
    <form onSubmit={handleSubmit} className="input-form">
      <textarea
        className="client-request"
        placeholder="  Type Here..."
      ></textarea>
      <button type="submit" className = "button type1">
        <span className = "btn-txt">Submit</span>
      </button>
    </form>
  );
}

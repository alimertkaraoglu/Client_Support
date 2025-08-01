import React, { useState } from "react";

export default function Text_Input() {
  return (
    <label>
      Type Your Request:
      <textarea name="client-request"></textarea>
    </label>
  );
}

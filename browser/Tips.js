import React from "react";
import "./index.css";

export const Tips = () => (
  <div className="tips">
    <p className="tipArrow">Navigation Instructions </p>
    <table className="tipsTable">
    <thead>
      <tr>
        <th>Tip</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Sorting</td>
        <td>Click on the desired subcolumn to sort the columns in ascending or descending order.</td>
      </tr>
      <tr>
        <td>Filtering</td>
        <td>Type desired text or number into columns input field</td>
      </tr>
    </tbody>
  </table>

  </div>
);

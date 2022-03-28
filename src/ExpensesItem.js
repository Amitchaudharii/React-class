import React from "react";
import moment from "moment";

const ExpensesItem = ({ expense, onEdit, onRemove }) => {
  return (
    <li key={expense.id}>
      <span>{moment(expense.date).format("MMMM DD, YYYY")}</span>
      <span>{expense.name}</span>
      <span>{expense.price}</span>
      <button id="edit" onClick={onEdit}>
        {""}
        Edit
      </button>
      <button onClick={onRemove}>X</button>
    </li>
  );
};
export default ExpensesItem;

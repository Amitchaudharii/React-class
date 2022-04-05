import React from "react";
import moment from "moment";
import "./Expense.css";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import tooltip from "react-tooltip";

const ExpensesItem = ({ expense, onEdit, onRemove }) => {
  return (
    <div className="car-details" key={expense.id}>
      <div className="list">
        <ul>
          <li>
            <span>{moment(expense.date).format("MM DD, YYYY")}</span>
          </li>
          <li>
            <span>{expense.name}</span>
          </li>
          <li>
            <span>{expense.price}</span>
          </li>
        </ul>
      </div>
      <div className="button">
        <tooltip title="Edit">
          <button className="btn01" onClick={onEdit}>
            <FiEdit />
          </button>
        </tooltip>
        <tooltip title="Delete">
          <button className="btn02" onClick={onRemove}>
            <RiDeleteBin2Fill />
          </button>
        </tooltip>
      </div>
    </div>
  );
};
export default ExpensesItem;
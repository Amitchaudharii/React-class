import React from "react";
import moment from "moment";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";


const ExpensesItem = ({ expense, onEdit, onRemove }) => {
  return (
    <div className="expense" key={expense.id}>
      <div className="date">
        <span>{moment(expense.date).format("MMMM DD, YYYY")}</span>
      </div>
      <div className="name">
        <span>{expense.name}</span>
      </div>
      <div  className="price">
        <span>{expense.price}</span>
      </div>
      <div className="action">
        <button onClick={onEdit}><AiFillEdit/></button>
      </div>
      <div  className="action">
        <button onClick={onRemove}><RiDeleteBin2Fill color={"red"} size={"15px"}/></button>
      </div>
    </div>
  );
};
export default ExpensesItem;

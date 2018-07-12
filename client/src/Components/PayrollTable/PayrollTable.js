import React from "react";

const PayrollTable = props => {
  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Task</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {props.entries.map(entry=>{
            return (
              <tr value={entry._id} onClick={e=>{props.openModal(entry._id)}}>
                <td>{entry.date.toDateString()}</td>
                <td>{entry.overridden ? entry.task + "*" : entry.task}</td>
                <td>{entry.quantity}</td>
                <td>${(entry.unitPrice * entry.quantity).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Total: ${props.entries.map(entry=>entry.unitPrice*entry.quantity).reduce((accum,entryTotal)=>{return accum+entryTotal}).toFixed(2)}</h3>
    </div>
  );
}

export default PayrollTable;
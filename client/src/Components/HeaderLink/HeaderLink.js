import React from "react";

const HeaderLink = props => {
  console.log(props);
  return (
    <li className="nav-item">
      <span className="nav-link" onClick={props.onClick}>
        {props.text}
      </span>
    </li>
  );
}

export default HeaderLink;
import React from "react";

const HeaderLink = props => {
  return (
    <li className="nav-item">
      <a className="nav-link" href={props.href}>
        {props.text}
      </a>
    </li>
  );
}

export default HeaderLink;
import React from "react";
import {Link} from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import logo from '../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons";
const marg = {
  marginTop: "2vw",
  textDecoration: "none",
  fontSize: "16px",
  paddingLeft:"20px"
  
};

export default props => {
  return (
    <Menu {...props} >
      <Link to="/">
        <img src={logo} alt="Islam Check" style={{width: "190px"}} />
      </Link>
      <Link to="/" className="Banner" style={marg}>
        <FontAwesomeIcon icon={Icons.faHome}/>&nbsp;{props.start} 
      </Link>
      <div className="dropdown-divider" />
      <a href="http://www.islamcheck.com/"><p  style={{color: "#747474", textAlign: "center"}}>www.islamcheck.com</p></a>
    </Menu>
  );
};


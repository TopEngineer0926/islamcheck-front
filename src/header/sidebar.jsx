import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons";
 
class SideBar extends Component {
  state = {
    isLanguageDisplay : false
  }
  render(){    
    return ( 
      <div className="sidebar">
        <div className="sidenav-upper d-flex justify-content-between align-items-center">
          <a href="/#" className="sidelogo">
           <img src={logo} alt="Islam Check"/>
          </a>
        </div>
        <div className="sidenavmenu">
          <a href="/#" className="banner"><FontAwesomeIcon icon={Icons.faHome}/>Start</a>
          <hr/>
          <a href="http://www.islamcheck.com/" className="bm-item" tabIndex="0" style={{display: 'block'}}><p style={{color: 'rgb(116, 116, 116)', textAlign : 'center'}}>www.islamcheck.com</p></a>
        </div>
      </div>
    );
  }
}
export default SideBar;
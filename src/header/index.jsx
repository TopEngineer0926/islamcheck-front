import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import {connect} from 'react-redux';
import {SelectedLanguage} from '../Redux/actions';
import SideBar from './sidebar';
 
class Header extends Component {
  state = {
    isLanguageDisplay : false,
    isOPenSideBar : false
  }
  render(){    
    return (
      <header className="">
        <SideBar/>
        <div className="container-fluid">
          <div className="menubar">
            <div className="logosection">
              <a href="/#"><img src={logo} alt="logo"/></a>
            </div>
            <div className="right_dropdown">
              <div className="btn-group">
                <button onClick={()=>{console.log('****** On click Button ******'); this.setState({isLanguageDisplay : !this.state.isLanguageDisplay})}} type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.languageSelected} 
                  <i className="fa fa-angle-down"></i>
                </button>
                {this.state.isLanguageDisplay && <div className="dropdown-menu dropdown-menu-right">
                    {this.props.languageList.map((item,index)=><SingleButton key={index} item={item} onSelectLanguage={this.props.SelectedLanguage}/>)}
                  </div> 
                }
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = state => ({
  languageSelected : state.qariAndSurah.languageSelected,
  languageList : state.qariAndSurah.languageList
});
export default connect(mapStateToProps, {SelectedLanguage})(Header);

class SingleButton extends Component{
  render(){
    return(
      <button onClick={()=>this.props.onSelectLanguage(this.props.item)} type="button" tabIndex="0" role="menuitem" className="stripe Selected dropdown-item">{this.props.item}</button>
    )
  }
}
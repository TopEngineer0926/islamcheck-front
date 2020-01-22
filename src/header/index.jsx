import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import {connect} from 'react-redux';
import {SelectedLanguage} from '../Redux/actions';
 
class Header extends Component {
  state = {
    isLanguageDisplay : false
  }
  render(){    
    return (
      <header className="">
        <div className="container-fluid">
          <div className="menubar">
            <div className="logosection">
              <a href="/#" id="sideNavToggler" className="hamerburg navbartoggler triggerSidebar">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.51 13.34"><defs></defs><title>Forma 1</title><path id="Forma_1" data-name="Forma 1" className="cls-1" d="M9.45,13.34a.84.84,0,0,1-.86-.81.82.82,0,0,1,.8-.86H26.64a.82.82,0,0,1,.86.8.84.84,0,0,1-.8.87H9.45ZM.86,7.5A.83.83,0,0,1,.8,5.84H26.64A.83.83,0,0,1,26.7,7.5H.86Zm0-5.83A.84.84,0,1,1,.86,0H26.64a.83.83,0,0,1,.83.83.83.83,0,0,1-.83.84H.86Z" transform="translate(0 0)"></path></svg>
              </a>
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
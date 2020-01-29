import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import {connect} from 'react-redux';
import {SelectedLanguage, GetData, StartLoader} from '../Redux/actions';
import {GET_LANGUAGES, TAB_SECTIONS, SECTION_LOADER} from '../Redux/actionType';
import SideBar from './sidebar';
 
class Header extends Component {
  state = {
    isLanguageDisplay : false,
    isOPenSideBar : false
  }
  componentDidMount(){
    this.props.GetData(`languages`, GET_LANGUAGES);
  }
  onLanguageSelected = () => {
    this.setState({isLanguageDisplay : false}, function(){this.props.StartLoader(SECTION_LOADER); this.props.GetData('sections/'+this.props.languageSelected.code, TAB_SECTIONS)})
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
                <button onClick={()=>this.setState({isLanguageDisplay : !this.state.isLanguageDisplay})} type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.languageSelected.name}</button>
                {this.state.isLanguageDisplay && 
                  <div className="dropdown-menu dropdown-menu-right">
                    {this.props.languageList.map((item,index)=><SingleButton key={index} item={item} onSelectLanguage={this.props.SelectedLanguage} onLanguageSelected={this.onLanguageSelected}/>)}
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
export default connect(mapStateToProps, {SelectedLanguage, GetData, StartLoader})(Header);

class SingleButton extends Component{
  render(){
    return(
      <button onClick={()=>{this.props.onLanguageSelected(); this.props.onSelectLanguage(this.props.item)}} type="button" tabIndex="0" role="menuitem" className="stripe Selected dropdown-item">{this.props.item.name}</button>
    )
  }
}
import React, {Component} from 'react';
import logo from '../assets/images/logo.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {SelectLanguage, GetData, StartLoader} from '../Redux/actions';
import {GET_LANGUAGES,} from '../Redux/actionType';
import SideBar from './sidebar';
 
class Header extends Component {
  state = {
    isLanguageDisplay : false,
    isOPenSideBar : false,
    differentStartFormat : {de : 'Start', ar : 'الصفحة الرئيسية', tr : 'Ana Sayfa', bs : 'Početna stranica', en : 'Start', sq : 'Ballina', ur : 'ہوم', fa : 'خانه', ru : 'Главная', bg : 'Начало', fr : 'Accueil', nl : 'Startpagina', it : 'Home', es : 'Inicio', pt : 'Início', da : 'Hjem', sv : 'Hem', no : 'Hjem', fi : 'Aloitussivu', id : 'Beranda'}
  }
  componentDidMount(){
    this.props.GetData(`languages`, GET_LANGUAGES);
  }
  onLanguageSelected = () => {
    this.setState({isLanguageDisplay : false})
  }
  render(){
    return (
      <header className="">
        <SideBar start = {this.props.languageSelected.start}/>
        <div className="container-fluid">
          <div className="menubar">
            <div className="logosection">
              <Link to="/"><img src={logo} alt="logo"/></Link>
            </div>
            <div className="right_dropdown">
              <div className="btn-group">
                <button onClick={()=>this.setState({isLanguageDisplay : !this.state.isLanguageDisplay})} type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.languageSelected.language_word}</button>
                {this.state.isLanguageDisplay && 
                  <div className="dropdown-menu dropdown-menu-right">
                    {this.props.languageList.map((item,index)=><SingleButton key={index} item={item} onSelectLanguage={this.props.SelectLanguage} onLanguageSelected={this.onLanguageSelected} languageSelected={this.props.languageSelected}/>)}
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
export default connect(mapStateToProps, {SelectLanguage, GetData, StartLoader})(Header);

class SingleButton extends Component{
  render(){
    return(
      <button onClick={()=>{if(this.props.languageSelected.native_name === this.props.item.native_name){this.props.onLanguageSelected(); return;} this.props.onLanguageSelected(); this.props.onSelectLanguage(this.props.item)}} type="button" tabIndex="0" role="menuitem" className={this.props.languageSelected.native_name !== this.props.item.native_name ? "stripe Selected dropdown-item" : "stripe dropdown-item selectedLanguage"}>{this.props.item.native_name}</button>
    )
  }
}
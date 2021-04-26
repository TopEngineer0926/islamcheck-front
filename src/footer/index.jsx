import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import islamCheckFooterImg from '../assets/images/islamcheckfooterlogo.png';
import {connect} from 'react-redux';
import { GetData, StartLoader, SelectLanguage} from '../Redux/actions';
 
class Footer extends Component {
  setFooterData = () => {
    let i = 0;
    let footerArray = [];
    while(i < this.props.languageList.length){
      footerArray.push(<LanguageDiv key={i} list={this.props.languageList.slice(i, i+5)} onSelectLanguage={this.props.SelectLanguage} onLanguageSelected={this.onLanguageSelected} languageSelected={this.props.languageSelected}/>);
      i = i + 5;
    }
    return footerArray;
  }
  render(){
    return (
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className=" col-lg-6">
              <div className="footerlogo">
              <Link to="/"><img src={islamCheckFooterImg} alt="Islam Check"/></Link>
              </div>
              <a className="noLine" href="http://www.islamcheck.com/">
                <p style={{color: 'rgb(255, 255, 255)', textAlign : 'center'}}>www.islamcheck.com</p>
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row">
                {this.setFooterData()}    
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
const mapStateToProps = state => ({
  languageList : state.qariAndSurah.languageList,
  languageSelected : state.qariAndSurah.languageSelected,
});
export default connect(mapStateToProps, {GetData, StartLoader, SelectLanguage})(Footer);

class LanguageDiv extends Component{
  render(){
    return(
      <div className="col-sm-3 col-md-3">
        <ul className="footerstyle">
          {this.props.list.map((item,index)=><li className="small" key={index+item} style={{cursor: 'pointer'}} onClick={()=> {if(this.props.languageSelected.native_name === item.native_name) return; this.props.onSelectLanguage(item)}}>{item.native_name}</li>)}
        </ul>
      </div>
    )
  }
}
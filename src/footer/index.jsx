import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import islamCheckFooterImg from '../assets/images/islamcheckfooterlogo.png';
import {connect} from 'react-redux';
import {SelectedLanguage} from '../Redux/actions';
 
class Footer extends Component {
  setFooterData = () => {
    let i = 0;
    let footerArray = [];
    while(i < this.props.languageList.length){
      footerArray.push(<LanguageDiv key={i} list={this.props.languageList.slice(i, i+5)}/>);
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
                <img src={islamCheckFooterImg} alt="Islam Check"/>
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
  languageList : state.qariAndSurah.languageList
});
export default connect(mapStateToProps, {SelectedLanguage})(Footer);

class LanguageDiv extends Component{
  render(){
    return(
      <div className="col-sm-3 col-md-3">
        <ul className="footerstyle">
          {this.props.list.map((item,index)=><li key={index+item} style={{cursor: 'pointer'}}>
            <a className="small" href="/#">{item}</a></li>)}
        </ul>
      </div>
    )
  }
}
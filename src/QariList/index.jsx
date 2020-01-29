import React, {Component} from 'react';
import '../assets/style.css';
import {Link} from 'react-router-dom';
import {QARI_LIST, QARI_LIST_LOADER} from '../Redux/actionType';
import {connect} from 'react-redux';
import {GetData, StartLoader} from '../Redux/actions';
import {Loader} from '../loader';
 
class QariLIst extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.props.StartLoader(QARI_LIST_LOADER);
  }
  componentDidMount(){
    this.props.GetData(`qaris/${this.props.id}/${this.props.languageSelected.code}`, QARI_LIST);
  }
  render(){
    return (
      <div className="body_content">
        {this.props.isQariListLoaded && <Loader/>}
        {!this.props.isQariListLoaded && 
          <section id="tabs" className="project-tab">
            <div className="container">
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  {
                    this.props.qariList.sort((a, b) => a.letter.localeCompare(b.letter)).map((item, i) => <SpecificLetterNames key={item.id} item={item}/>)
                  }
                </div>
              </div>
            </div>
          </section>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  qariList : state.qariAndSurah.qariList,
  isQariListLoaded : state.qariAndSurah.isQariListLoaded,
  languageSelected : state.qariAndSurah.languageSelected
});
export default connect(mapStateToProps, {GetData, StartLoader})(QariLIst);

class SpecificLetterNames extends Component{
  render(){
    return(
      <div>
      <div className="islam_names d-flex py-4">
        <div className="ellipse_text">{this.props.item.letter}</div>
        <div className="names_text row">
          {this.props.item.names.map((item) => <IndividualQariName key={item.id} item={item}/>)}
        </div>
    </div>
    <hr/>
    </div>
    )
  }
}
class IndividualQariName extends Component{
  render(){
    return(
      <div className="col-md-4">
        <p className=""><Link to ={`/surah-list/${this.props.item.id}`}>{this.props.item.name}</Link></p>
      </div>
    )
  }
}
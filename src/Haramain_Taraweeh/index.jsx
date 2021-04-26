import React, {Component} from 'react';
import '../assets/style.css';
import {Link} from 'react-router-dom';
import {HARAMAIN_TARAWEEH_LIST, HARAMAIN_TARAWEEH_LIST_LOADED} from '../Redux/actionType';
import {connect} from 'react-redux';
import {GetData, StartLoader} from '../Redux/actions';
import {Loader} from '../loader';
 
class HaramainTaraweeh extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.props.StartLoader(HARAMAIN_TARAWEEH_LIST_LOADED);
  }
  componentDidMount(){
    this.props.GetData(`qaris/${this.props.id}/${this.props.languageSelected.code}`, HARAMAIN_TARAWEEH_LIST);
  }
  render(){    
    return (
      <div className="body_content">
        {this.props.isHaramainTaraweehLoaded && <Loader/>}
        {!this.props.isHaramainTaraweehLoaded && 
          <section id="tabs" className="project-tab">
            {this.props.haramainTaraweehList.map((item, i) => <SpecificComponent key={item.id} item={item}/>)}
          </section>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  haramainTaraweehList : state.qariAndSurah.haramainTaraweehList,
  isHaramainTaraweehLoaded : state.qariAndSurah.isHaramainTaraweehLoaded,
  languageSelected : state.qariAndSurah.languageSelected
});
export default connect(mapStateToProps, {GetData, StartLoader})(HaramainTaraweeh);

class SpecificComponent extends Component{
  render(){
    return(
      // <div className="islam_names py-4">
      //   <div className="names">{this.props.item.word}</div>
      //     <div className="names_text row">
      //     {this.props.item.names.map((item) => <MakkahMadinaTaraweeh key={item.id} item={item}/>)}
      //     </div>
      //  </div>
      <div className="islam_names d-flex py-4">
        <div className="ellipse_text">{this.props.item.word}</div>
        <div className="names_text row">
          {this.props.item.names.map((item) => <MakkahMadinaTaraweeh key={item.id} item={item}/>)}
        </div>
      </div>
    )
  }
}

class MakkahMadinaTaraweeh extends Component{
  render(){
    return(
      <div className="col-sm-4">
        <p><Link to ={`/surah-list/${this.props.item.id}`}>{this.props.item.name}</Link></p>
      </div>
    )
  }
}
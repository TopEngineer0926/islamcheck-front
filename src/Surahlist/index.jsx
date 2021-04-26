import React, {Component} from 'react';
import '../assets/style.css';
import {Link} from 'react-router-dom';
import {SURAH_LIST, SURAH_LIST_LOADER} from '../Redux/actionType';
import {connect} from 'react-redux';
import {GetData, StartLoader, SelectedSurahId, ResetData, ShufflePlay, OnChangeLanguage} from '../Redux/actions';
import {Loader} from '../loader';
import moment from 'moment';
 
class SurahList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPlaySurah : false,
      isPlayingSurah : false,
      isShuffleSurah : false,
      audioFile : '',
      specificSurah : '',
      currentIndex : ''
    }
    this.props.StartLoader(SURAH_LIST_LOADER);
  }
  componentDidMount(){
    this.props.GetData(`surahs_list/${this.props.ID}/${this.props.languageSelected.code}`, SURAH_LIST);
  }
  onPlaySurah = (item, index) => {
    if(this.props.surahID === item.surah_id && item.qari_id === this.props.selectedQari.id) return;
    this.props.ResetData();
    this.props.SelectedSurahId(item, true, true, index);
  }
  shuffleSurah = () => {
    this.setState({isShuffleSurah : !this.state.isShuffleSurah},()=>{if(!this.state.isShuffleSurah) return; this.props.ResetData(); this.props.ShufflePlay()})
  }
  componentDidUpdate(){
    if(this.props.isLanguageChange){
      this.props.OnChangeLanguage();
      this.props.StartLoader(SURAH_LIST_LOADER);
      this.props.GetData(`surahs_list/${this.props.ID}/${this.props.languageSelected.code}`, SURAH_LIST);
    }
  }
  render(){
    return (
      <div>
        {this.props.isSurahListLoaded && <Loader/>}
        {!this.props.isSurahListLoaded && 
          <div className="body_content">
            <div className={!this.state.isShuffleSurah ? "checkdetailheader text-center" : "checkdetailheader text-center activebtn"}>
              <h1>{this.props.qariDetail.name}</h1>
              <button onClick={this.shuffleSurah}>{this.state.isShuffleSurah ? <i className="fa fa-stop"></i> : <i className="fa fa-play"></i>}{this.props.languageSelected.shuffle_play}</button>
            </div>
            <section className="islamcheck_detail">
              <div className="container">
                <ul className="mx-0 px-0">
                  {this.props.surahList.map((item, index)=><IndividualListItem key={item.id} item={item} index={index} onPlaySurah = {this.onPlaySurah} surahID={this.props.surahID} progressValue={this.props.progressValue} audioDuration={this.props.audioDuration} languageSelected ={this.props.languageSelected} audioPath={this.props.audioPath}/>)}
                </ul>
              </div>
            </section>   
          </div>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  surahList : state.qariAndSurah.surahList,
  qariDetail : state.qariAndSurah.qariDetail,
  audioPath : state.qariAndSurah.audioPath,
  isSurahListLoaded : state.qariAndSurah.isSurahListLoaded,
  surahID : state.qariAndSurah.surahID,
  selectedQari : state.qariAndSurah.selectedQari,
  progressValue : state.qariAndSurah.progressValue,
  audioDuration : state.qariAndSurah.audioDuration,
  isPlaySurah : state.qariAndSurah.isPlaySurah,
  languageSelected : state.qariAndSurah.languageSelected,
  isLanguageChange : state.qariAndSurah.isLanguageChange
});
export default connect(mapStateToProps, {GetData, StartLoader, SelectedSurahId, ResetData, ShufflePlay, OnChangeLanguage})(SurahList);

class IndividualListItem extends Component{
  secondsToHms =(d)=> {
    const time = moment.utc(Math.round(d)*1000).format('HH') === '00' ? moment.utc(Math.round(d)*1000).format('mm:ss') : moment.utc(Math.round(d)*1000).format('HH:mm:ss');
    return time; 
  }
  render(){
    return(
      <div >
      <li className={this.props.surahID === this.props.item.surah_id ? "list-group-item checklistbox selectedClass"  :"list-group-item checklistbox"}  onClick={() => this.props.onPlaySurah(this.props.item, this.props.index)}>
        <div className="row align-items-center">
          <div className="col-md-4 col-xs-8">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex align-items-center">
                <div className="number">
                  {this.props.item.surah_id}.
                </div>
                <i className="fa fa-play"/>
                <div className="surah_name">
                  <h5>{this.props.item.name}</h5>
                </div>
              </div>
              
            </div>
          </div>
          <ReadAndDownloadButton filePath={this.props.item.file_name} audioPath={this.props.audioPath} index={this.props.item.surah_id} languageSelected={this.props.languageSelected}/>
          <div className="text-right col-md-2 col-xs-4">
            <h6 className="">
              <i className="fa fa-clock-o" aria-hidden="true"/> {this.props.surahID === this.props.item.surah_id ? `${moment.utc(Math.round(this.props.progressValue)*1000).format('HH') === '00' ? moment.utc(Math.round(this.props.progressValue)*1000).format('mm:ss') : moment.utc(Math.round(this.props.progressValue)*1000).format('HH:mm:ss')} / ${moment.utc(Math.round(this.props.audioDuration)*1000).format('HH') === '00' ? moment.utc(Math.round(this.props.audioDuration)*1000).format('mm:ss') : moment.utc(Math.round(this.props.audioDuration)*1000).format('HH:mm:ss')}` :  this.secondsToHms(this.props.item.duration)}
            </h6>
          </div>
        </div>
      </li>
      </div>
    )
  }
}

class ReadAndDownloadButton extends Component{
  render(){
    return(
      <div className="text-right col-md-6 hidden-xs">
        <div className={["ur", "ar", "fa"].includes(this.props.languageSelected.code) ? "overtext directionRtl" : " overtext"}>
          <Link to="/"><i className="fa fa-user"></i> <span>{this.props.languageSelected.other_qaris}</span></Link>
          <a href={'http://18.189.100.203/#/'+this.props.index} target="_blank" rel="noopener noreferrer"><i className="fa fa-book"></i> <span>{this.props.languageSelected.read}</span></a>
          <a href={this.props.audioPath+this.props.filePath} target="_blank" rel="noopener noreferrer"><i className="fa fa-arrow-circle-down"></i> <span>{this.props.languageSelected.download}</span></a>
        </div>
      </div>
    )
  }
}

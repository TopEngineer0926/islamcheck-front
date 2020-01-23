import React, {Component} from 'react';
import '../assets/style.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {SURAH_LIST, SURAH_LIST_LOADER} from '../Redux/actionType';
import {connect} from 'react-redux';
import {GetData, StartLoader, SelectedSurahId, ResetData, ShufflePlay} from '../Redux/actions';
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
    this.props.GetData(`surahs_list/1`, SURAH_LIST);
  }
  onPlaySurah = (item, index) => {
    if(this.props.surahID === item.id) return;
    this.props.ResetData();
    this.props.SelectedSurahId(item, true, true, index);
  }
  shuffleSurah = () => {
    this.setState({isShuffleSurah : !this.state.isShuffleSurah},()=>{if(!this.state.isShuffleSurah) return; console.log('******** Shuffle *******'+this.state.isShuffleSurah); this.props.ResetData(); this.props.ShufflePlay()})
  }
  render(){  
    return (
      <div>
        {this.props.isSurahListLoaded && <Loader/>}
        {!this.props.isSurahListLoaded && 
          <div className="body_content mb-0">
            <div className={!this.state.isShuffleSurah ? "checkdetailheader text-center" : "checkdetailheader text-center activebtn"}>
              <h1>{this.props.qariDetail.name}</h1>
              <button onClick={this.shuffleSurah}>{this.state.isShuffleSurah ? <FontAwesomeIcon icon={Icons.faStop}/> : <FontAwesomeIcon icon={Icons.faPlay}/>}Shuffle Play</button>
            </div>
            <section className="islamcheck_detail">
              <div className="container">
                <ul className="mx-0 px-0">
                {this.props.surahList.map((item, index)=><IndividualListItem key={item.id} item={item} index={index} onPlaySurah = {this.onPlaySurah} surahID={this.props.surahID} progressValue={this.props.progressValue} audioDuration={this.props.audioDuration}/>)}
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
  progressValue : state.qariAndSurah.progressValue,
  audioDuration : state.qariAndSurah.audioDuration,
  isPlaySurah : state.qariAndSurah.isPlaySurah
});
export default connect(mapStateToProps, {GetData, StartLoader, SelectedSurahId, ResetData, ShufflePlay})(SurahList);

class IndividualListItem extends Component{
   secondsToHms =(d)=> {
    const time = moment.utc(Math.round(d)*1000).format('HH') === '00' ? moment.utc(Math.round(d)*1000).format('mm:ss') : moment.utc(Math.round(d)*1000).format('HH:mm:ss');
    return time; 
  }
  render(){
    return(
      <div >
      <li className={this.props.surahID === this.props.item.id ? "list-group-item checklistbox selectedClass"  :"list-group-item checklistbox"}>
        <div className="row align-items-center">
          <div className="col-md-4 col-xs-8">
            <div className="row align-items-center">
              <div className="col-md-1">
                <div className="number">
                  {this.props.index + 1}.
                </div>
              </div>
              <div className="col-md-1" onClick={() => this.props.onPlaySurah(this.props.item, this.props.index)}>
                <FontAwesomeIcon icon={Icons.faPlay} />
              </div>
              <div className="col-md-10">
                <div className="surah_name">
                  <h5>{this.props.item.name}</h5>
                </div>
              </div>
            </div>
          </div>
          <ReadAndDownloadButton filePath={this.props.item.file_name} index={this.props.index + 1} />
          <div className="text-right col-md-2 col-xs-4">
            <h6 className="">
              <FontAwesomeIcon icon={Icons.faClock} aria-hidden="true"/> {this.props.surahID === this.props.item.id ? `${moment.utc(Math.round(this.props.progressValue)*1000).format('HH') === '00' ? moment.utc(Math.round(this.props.progressValue)*1000).format('mm:ss') : moment.utc(Math.round(this.props.progressValue)*1000).format('HH:mm:ss')} / ${moment.utc(Math.round(this.props.audioDuration)*1000).format('HH') === '00' ? moment.utc(Math.round(this.props.audioDuration)*1000).format('mm:ss') : moment.utc(Math.round(this.props.audioDuration)*1000).format('HH:mm:ss')}` :  this.secondsToHms(this.props.item.duration)}
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
        <div className="overtext">
          <Link to="/" className=""><FontAwesomeIcon icon={Icons.faUser}/><span> Other Qaris</span></Link>
          <a href={'http://18.189.100.203/#/'+this.props.index} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={Icons.faBook}/><span>Read</span></a>
          <a href={'http://18.189.100.203:8080/islamcheck-audio/public/audio_files/abdullaah_3awwaad_al-juhaynee/'+this.props.filePath} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={Icons.faArrowCircleDown}/><span> Download</span></a>
        </div>
      </div>
    )
  }
}

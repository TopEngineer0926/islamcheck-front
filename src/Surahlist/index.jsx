import React, {Component} from 'react';
import '../assets/style.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {SURAH_LIST, SURAH_LIST_LOADER} from '../Redux/actionType';
import {connect} from 'react-redux';
import {GetData, StartLoader, SelectedSurahId, ResetData} from '../Redux/actions';
import {Loader} from '../loader';
//import moment from 'moment';
 
class SurahList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPlaySurah : false,
      isPlayingSurah : false,
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
  render(){  
    return (
      <div>
        {this.props.isSurahListLoaded && <Loader/>}
        {!this.props.isSurahListLoaded && 
          <div className="body_content mb-0">
            <div className="checkdetailheader text-center">
              <h1>{this.props.qariDetail.name}</h1>
              <button><FontAwesomeIcon icon={Icons.faPlay}/> Shuffle Play</button>
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
  audioDuration : state.qariAndSurah.audioDuration
});
export default connect(mapStateToProps, {GetData, StartLoader, SelectedSurahId, ResetData})(SurahList);

class IndividualListItem extends Component{
   secondsToHms =(d)=> {
    // moment((d)._d).format('HH')==='00'?moment(this.props.playBackStatus.positionMillis).format('mm:ss'):moment(this.props.playBackStatus.positionMillis).subtract(16,'hours').format('HH:mm:ss')
    // console.log(moment(d)._d);
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    // console.log(moment().hours(this.props.item.duration));
    // console.log(moment().minutes(this.props.item.durationmber));
    // console.log(moment().seconds(this.props.item.duration));
    // console.log(h);
    // console.log(m);
    // console.log(s);

    // var hDisplay = h > 0 ? h+':' : '';
    // var mDisplay = m > 0 ? m+':' : '00';
    // var sDisplay = s > 0 ? s: "";
    return h+':' + m+':' + s; 
    // <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    //   <Text style={{color:'#fff'}}>{this.props.loading?'00:00':moment(this.props.playBackStatus.positionMillis).subtract(16,'hours').format('HH')==='00'?moment(this.props.playBackStatus.positionMillis).format('mm:ss'):moment(this.props.playBackStatus.positionMillis).subtract(16,'hours').format('HH:mm:ss')}</Text>
    //   <Text style={{color:'#fff'}}>{this.props.loading?'00:00':moment(this.props.playBackStatus.durationMillis).subtract(16,'hours').format('HH')==='00'?moment(this.props.playBackStatus.durationMillis).format('mm:ss'):moment(this.props.playBackStatus.durationMillis).subtract(16,"hours").format('HH:mm:ss')}</Text>
    // </View>
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
          {/* {moment(date).format('MMM DD, h:mm a')}  */}
          <ReadAndDownloadButton/>
          <div className="text-right col-md-2 col-xs-4">
            <h6 className="">
              <FontAwesomeIcon icon={Icons.faClock} aria-hidden="true"/> {this.props.surahID === this.props.item.id ? `${this.props.progressValue} / ${this.props.audioDuration}` :  this.secondsToHms(this.props.item.duration)}
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
          <a href="/#" className="" target="_blank"><FontAwesomeIcon icon={Icons.faBook}/><span>Read</span></a>
          <a href="/#" className="" target="_blank"><FontAwesomeIcon icon={Icons.faArrowCircleDown}/><span> Download</span></a>
        </div>
      </div>
    )
  }
}

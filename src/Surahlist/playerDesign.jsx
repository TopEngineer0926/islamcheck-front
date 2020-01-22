import React, {Component} from 'react';
import '../assets/style.css';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';
import {GetAudioDuration, GetProgressBarValue, StartAndStartAudio, SurahComplete, ChangeSurah, ResetData} from '../Redux/actions';

class PlayerDesign extends Component{
  constructor(props){
    super(props);
    this.state = {
      volume : 0.5,
      isSurahrepeated : false,
      seekValue : 0
    }
  }
  // componentDidMount () {
  //    this.volumeBar = document.querySelector('.ap-volume-bar');
  //   this.volumeBar.parentNode.parentNode.addEventListener('mousedown', this.handlerVol, false);
  //   this.volumeBar.parentNode.parentNode.addEventListener('mousemove', setVolume);
  //   document.documentElement.addEventListener('mouseup', seekingFalse, false);
  //   //this.addListeners()
  //   // if (IOS) {
  //   //   this.player.load()
  //   // }
  // }
  // handlerVol =(evt)=> {
  //   rightClick = (evt.which === 3) ? true : false;
  //   seeking = true;
  //   setVolume(evt);
  // }
  //  setVolume = (evt)=> {
  //   volumeLength = volumeBar.css('height');
  //   if(seeking && rightClick === false) {
  //     var value = moveBar(evt, volumeBar.parentNode, 'vertical') / 100;
  //     if(value <= 0) {
  //       audio.volume = 0;
  //       volumeBtn.classList.add('muted');
  //     }
  //     else {
  //       if(audio.muted) audio.muted = false;
  //       audio.volume = value;
  //       volumeBtn.classList.remove('muted');
  //     }
  //   }
  // }
  // componentWillUnmount () {
  //   this.volumeBar.parentNode.parentNode.removeEventListener('mousedown', handlerVol, false);
  //   this.volumeBar.parentNode.parentNode.removeEventListener('mousemove', setVolume);
  //   this.document.documentElement.removeEventListener('mouseup', seekingFalse, false);
  // }
  // addListeners () {
  //   //const { onReady, onPlay, onPause, onEnded, onError, playsinline, onEnablePIP } = this.props
  //   this.player.addEventListener('seeked', this.onSeek)
  // }
  // removeListeners () {
  //   this.player.removeEventListener('seeked', this.onSeek)
  // }
  onEndAudio = () => {
    this.props.SurahComplete();
  }
  onProgressAudio =(e)=> {
    this.props.GetProgressBarValue(e.playedSeconds.toFixed(2));
  }
  onDurationAudio = (e) => {
    const percentageValue = 100 / e.toFixed(2);
    this.props.GetAudioDuration(e.toFixed(2), percentageValue);
  }
  onSeekAudio = (eVal) => {
    console.log('*********** on seek audio ***********');
    console.log(eVal);
    console.log('*********************');
    this.setState({seekValue :eVal})
  }
  render(){
    //console.log('http://18.189.100.203:8080/islamcheck-audio/public/audio_files/abdullaah_3awwaad_al-juhaynee/'+this.props.specificSurah.file_name);
    return(
      <div className="ap" id="ap">
        <div className="container">
          <div className="ap-inner">
            <div className="ap-panel">
              <div className="ap-item ap--playback">
                <button disabled={this.props.surahID === 1 ? true : false} onClick={()=>{this.props.ResetData(); this.props.ChangeSurah('previous')}} className="ap-controls ap-prev-btn">
                  <EachSvgComponent id="Capa_1" data_name="Capa 1" title='previous' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.3 16.52" d1="M132.62,104l8.11-5.75v16.52l-8.11-5.75v5.75l-9.42-6.68v6.68h-3.77V98.29h3.77V105l9.42-6.68Z" transform="translate(-119.43 -98.29)"/>
                </button>
                <button className="ap-controls ap-toggle-btn" onClick={()=>this.props.StartAndStartAudio(!this.props.isPlaying)}>
                  {!this.props.isPlaying && <EachSvgComponent id="Capa_1" data_name="Capa 1" title='play' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.9 62.37" d1="M207.85,157.28l-67.47-28.06a5.53,5.53,0,0,0-4.19,0,3.08,3.08,0,0,0-2.09,2.69v56.14a3.08,3.08,0,0,0,2.09,2.69,5.5,5.5,0,0,0,4.19,0l67.47-28.07a2.8,2.8,0,0,0,0-5.44Z" transform="translate(-134.1 -128.82)"/>}
                  {this.props.isPlaying &&<EachSvgComponent id="Capa_1" data_name="Capa 1" title='pause-two-lines' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.5 45.06" d1="M81.83,84.78A2.18,2.18,0,0,0,84,82.61V41.89a2.18,2.18,0,0,0-2.17-2.17h-13a2.18,2.18,0,0,0-2.17,2.17V82.61a2.18,2.18,0,0,0,2.17,2.17Z" transform="translate(-40.5 -39.72)" d2="M55.7,84.78a2.18,2.18,0,0,0,2.17-2.17V41.89a2.18,2.18,0,0,0-2.17-2.17h-13a2.18,2.18,0,0,0-2.17,2.17V82.61a2.18,2.18,0,0,0,2.17,2.17Z"/>}
                </button>
                <button disabled={this.props.surahID === 227 ? true : false} onClick={()=>{this.props.ResetData(); this.props.ChangeSurah('next')}} className="ap-controls ap-next-btn">
                  <EachSvgComponent id="Capa_1" data_name="Capa 1" title='previous' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.31 16.54" d1="M127.54,109.06l-8.11,5.76V98.3l8.12,5.74V98.29L137,105V98.28h3.77V114.8H137v-6.67l-9.42,6.68Z" transform="translate(-119.42 -98.28)"/>
                </button>
              </div>
              <div className="ap-item ap--track">
                <div className="ap-info">
                  <div className="ap-title">{this.props.specificSurah.name}</div>
                  <div className="ap-time">
                    <span className="ap-time--current">{this.props.progressValue}</span>
                    <span> / </span>
                    <span className="ap-time--duration">{this.props.audioDuration}</span>
                  </div>
                  <div className="ap-progress-container" >
                    <div className="ap-progress" onClick={()=>this.onSeekAudio(30)}>
                      <div className="ap-bar" style={{width: this.props.progressValue * this.props.percentageValue+'%'}}></div>
                      <div className="ap-preload-bar"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ap-item ap--settings">
                <div className="ap-controls ap-volume-container">
                <button className="ap-volume-btn">
                  <EachSvgComponent className="ap--volume-on" xmlns="http://www.w3.org/2000/svg" fill="/#ffffff" height="48" viewBox="0 0 24 24" width="24" d1="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" d2="M0 0h24v24H0z" fill2="none"/>
                  <EachSvgComponent className="ap--volume-off" xmlns="http://www.w3.org/2000/svg" fill="/#ffffff" height="48" viewBox="0 0 24 24" width="24" d1="M7 9v6h4l5 5V4l-5 5H7z" d2="M0 0h24v24H0z" fill2="none"/>
                </button>
                <div className="ap-volume">
                  <div className="ap-volume-progress">
                    {/* <div className="ap-volume-bar"></div> */}
                    <input name="volume" type="range" className="ap-volume-bar" min={0} max={1} step="any" />
                    {/* <input type="range" min={0} max={1} step="any" value={parseFloat(this.state.volume)} className="volume ml-3 mr-3 ap-volume-bar" onChange={(e)=>{console.log(e.target.value); this.setState({volume : e.target.value})}}/> */}
                  </div>
                </div>
              </div>
                <button className="ap-controls ap-repeat-btn" onClick={()=>this.setState({isSurahrepeated : !this.state.isSurahrepeated})}>
                  <EachSvgComponent height="100%" viewBox="0 0 48 48" width="100%" d1="M0 0h48v48H0z" d2="M14 14h20v6l8-8-8-8v6H10v12h4v-8zm20 20H14v-6l-8 8 8 8v-6h24V26h-4v8z" fill1="none"/>
                </button> 
              </div> 
            </div>
          </div>
        </div>
        <ReactPlayer
          className='react-player'
          url= {'http://18.189.100.203:8080/islamcheck-audio/public/audio_files/abdullaah_3awwaad_al-juhaynee/'+this.props.specificSurah.file_name}
          progressInterval = {this.props.progressBarValue}
          volume = {parseFloat(this.state.volume)}
          playing = {this.props.isPlaying}
          loop = {this.state.isSurahrepeated}
          onEnded = {this.onEndAudio}
          onProgress ={this.onProgressAudio}
          
          controls
          onDuration = {this.onDurationAudio} // check audio duration means how much this audio
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  progressValue : state.qariAndSurah.progressValue,
  audioDuration : state.qariAndSurah.audioDuration,
  percentageValue : state.qariAndSurah.percentageValue,
  surahID : state.qariAndSurah.surahID,
  isPlaying : state.qariAndSurah.isPlaying
});
export default connect(mapStateToProps, {GetAudioDuration, GetProgressBarValue, StartAndStartAudio, SurahComplete, ChangeSurah, ResetData})(PlayerDesign);

class EachSvgComponent extends Component{
  render(){
    return(
      <svg
        id={this.props.id}
        data-name={this.props.data_name}
        xmlns={this.props.xmlns}
        fill={this.props.fill}
        height={this.props.height}
        viewBox={this.props.viewBox}
        width={this.props.width}
        className={this.props.className}
      >
        <title>{this.props.title}</title>
        <path d={this.props.d1} transform= {this.props.transform} fill={this.props.fill1}/>
        <path d={this.props.d2} transform= {this.props.transform} fill={this.props.fill2}/>
      </svg>
    )
  }
}
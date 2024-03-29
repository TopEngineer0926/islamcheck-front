import { SELECTED_SURAH_ID, 
  AUDIO_DURATION, 
  PROGRESS_BAR_VALUE, 
  RESET_DATA, 
  START_OR_STOP, 
  SURAH_COMPLETED, 
  SURAH_CHANGE, 
  SELECT_LANGUAGE,
  SHUFFLE_PLAY,
  CHANGE_LANGUAGE,
  RESET_CHANGE_QARI_FLAG} from './actionType';
import {server} from './server';

export const StartLoader = (type) => ({
  type: type,
  payload: true
});
export const GetData = (api, actionType) => async dispatch  => {
  const requestOptions = {
    method: 'GET',
  };
  fetch(server+api,requestOptions).then(response => response.json())
    .then(res=>{
      //console.log(res);
      dispatch({
        type: actionType,
        payload: res
      })
    })
    .catch(error=>{
      console.log(error)
      dispatch({
        type : actionType,
        payload : 'error'
      });
    });
}
export const SelectedSurahId = (item, isPlaying, isPlaySurah, currentIndex) => ({
  type: SELECTED_SURAH_ID,
  payload: {item, isPlaying, isPlaySurah, currentIndex}
});
export const GetAudioDuration = (value, percentageValue) => ({
  type: AUDIO_DURATION,
  payload: {value, percentageValue}
});
export const GetProgressBarValue = (value) => ({
  type: PROGRESS_BAR_VALUE,
  payload: value
});
export const ResetData = () => ({
  type: RESET_DATA,
  payload: true
});
export const StartAndStartAudio = (value) => ({
  type: START_OR_STOP,
  payload: value
});
export const SurahComplete = () => ({
  type: SURAH_COMPLETED,
  payload: true
});
export const ChangeSurah = (title) => ({
  type: SURAH_CHANGE,
  payload: title
});
export const SelectLanguage = (selectedLang) => ({
  type: SELECT_LANGUAGE,
  payload: selectedLang
});
export const OnChangeLanguage = () => ({
  type: CHANGE_LANGUAGE,
  payload: false
});
export const ShufflePlay = () => ({
  type: SHUFFLE_PLAY,
  payload: true
});
export const ResetChangeQariFlag = () => ({
  type: RESET_CHANGE_QARI_FLAG,
  payload: false
});
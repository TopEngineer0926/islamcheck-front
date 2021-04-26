import { TAB_SECTIONS, 
  SECTION_LOADER, 
  QARI_LIST, 
  QARI_LIST_LOADER, 
  SURAH_LIST_LOADER, 
  SURAH_LIST,
  HARAMAIN_TARAWEEH_LIST,
  HARAMAIN_TARAWEEH_LIST_LOADED,
  SELECTED_SURAH_ID,
  AUDIO_DURATION,
  PROGRESS_BAR_VALUE,
  RESET_DATA,
  START_OR_STOP,
  SURAH_COMPLETED,
  SURAH_CHANGE,
  CHANGE_LANGUAGE,
  SELECT_LANGUAGE,
  GET_LANGUAGES,
  SHUFFLE_PLAY,
  RESET_CHANGE_QARI_FLAG
} from './actionType';
import moment from 'moment';

const initialState = {
  sections : [],
  qariList : [],
  isQariListLoaded : false,
  isLoaderStart : false,
  alphabeticalOrderList : [],
  isSurahListLoaded : false,
  surahList : [],
  qariDetail : {},
  audioPath : '',
  haramainTaraweehList : [],
  isHaramainTaraweehLoaded : false,
  alphabeticalOrderListOfTaraweeh : [],
  surahID : '',
  qariID : '',
  isQariChange : false,
  currentIndex : 0,
  isPlaySurah : false,
  isPlaying : false,
  progressValue : 0,
  audioDuration : '',
  percentageValue : 0,
  isSurahLoaded : false,
  isLanguageChange : false,
  languageSelected : {
    native_name : 'Deutsch', 
    code : 'de', 
    language_word: " Sprachen",
    other_qaris: "Andere Qaris",
    shuffle_play: "Zufallswiedergabe",
    download: "Herunterladen",
    read: "Lesen",
    start: "Start"
  },
  languageList : [],
  selectedQari : {},
  selectedSurah : '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return{
        ...state,
        isLanguageChange : action.payload
      };
    case SELECT_LANGUAGE:
      return{
        ...state,
        languageSelected : action.payload,
        isLanguageChange : true,
      };
    case GET_LANGUAGES:
      return{
        ...state,
        languageList : action.payload.status === 'success' ? action.payload.data : []
      };
    case SECTION_LOADER:
      return{
        ...state,
          isLoaderStart : action.payload
      };
    case TAB_SECTIONS:
      let sectionsList = [];
      if(action.payload.status === 'success'){
        sectionsList = action.payload.data;
        const Index = sectionsList.findIndex(checkIndex);
        function checkIndex(component){return component.english_name === 'Non-Hafs Recitations'}
        sectionsList.splice(Index, 1);
      }
      return{
        ...state,
        sections : action.payload.status === 'success' ? action.payload.data : [],
        isLoaderStart : action.payload.status === 'success' ? false : true
      };
    case QARI_LIST_LOADER:
      return{
        ...state,
        isQariListLoaded : action.payload
      };
    case QARI_LIST:
      if(action.payload.status === 'success'){
        const qariNames = action.payload.data;
        state.alphabeticalOrderList = [];
        let check_letter = '';
        for(let i = 0; i < qariNames.length; i++){
          const selectedIndex = state.alphabeticalOrderList.findIndex(checkIndex);
          function checkIndex(component){
            return component.letter === qariNames[i].english_name.charAt(0) ;
          }
          if(qariNames[i].english_name.charAt(0) === check_letter){
            state.alphabeticalOrderList[selectedIndex] = { id : qariNames[i].id,
              letter : qariNames[i].english_name.charAt(0),
              names : [...state.alphabeticalOrderList[selectedIndex].names, qariNames[i]]}
          }
          else{
            check_letter = qariNames[i].english_name.charAt(0);
            if(selectedIndex > -1){
              state.alphabeticalOrderList[selectedIndex] = { id : qariNames[i].id,
                letter : qariNames[i].english_name.charAt(0),
                names : [...state.alphabeticalOrderList[selectedIndex].names, qariNames[i]]}
            }
            else{
              state.alphabeticalOrderList.push({
                id : qariNames[i].id,
                letter : qariNames[i].english_name.charAt(0),
                names : [qariNames[i]]
              });
            } 
          }
        }
        for(let i = 0; i < state.alphabeticalOrderList.length; i++){
          state.alphabeticalOrderList[i].names.sort((a, b) => moment.utc(a.created_at)*1000 - moment.utc(b.created_at)*1000);
        }
      }
      return{
        ...state,
        qariList : action.payload.status === 'success' ? state.alphabeticalOrderList : [],
        isQariListLoaded : action.payload.status === 'success' ? false : true
      };
    case SURAH_LIST_LOADER:
      return{
        ...state,
        isSurahListLoaded : action.payload
      };
    case SURAH_LIST:
      return{
        ...state,
        surahList : action.payload.status === 'success' ? action.payload.data : [],
        qariDetail : action.payload.status === 'success' ? action.payload.qari : {},
        audioPath : action.payload.status === 'success' ? action.payload.path : '',
        isSurahListLoaded : action.payload.status === 'success' ? false : true
      };
    case HARAMAIN_TARAWEEH_LIST_LOADED:
      return{
        ...state,
        isHaramainTaraweehLoaded : action.payload
      };
    case HARAMAIN_TARAWEEH_LIST:
      if(action.payload.status === 'success'){
        const TaraweehNames = action.payload.data;
        state.alphabeticalOrderListOfTaraweeh = [];
        let check_letter = '';
        for(let i = 0; i < TaraweehNames.length; i++){
          const selectedIndex = state.alphabeticalOrderListOfTaraweeh.findIndex(checkIndex);
          function checkIndex(component){
            return component.word === TaraweehNames[i].english_name.charAt(0) ;
          }
          if(TaraweehNames[i].english_name.charAt(0) === check_letter){
            state.alphabeticalOrderListOfTaraweeh[selectedIndex] = { id : TaraweehNames[i].id,
              word : TaraweehNames[i].english_name.charAt(0),
              names : [...state.alphabeticalOrderListOfTaraweeh[selectedIndex].names, TaraweehNames[i]]}
          }
          else{            
            check_letter = TaraweehNames[i].english_name.charAt(0);
            if(selectedIndex > -1){
              state.alphabeticalOrderListOfTaraweeh[selectedIndex] = { id : TaraweehNames[i].id,
                word : TaraweehNames[i].english_name.charAt(0),
                names : [...state.alphabeticalOrderListOfTaraweeh[selectedIndex].names, TaraweehNames[i]]}
            }
            else{
              state.alphabeticalOrderListOfTaraweeh.push({
                id : TaraweehNames[i].id,
                word : TaraweehNames[i].english_name.charAt(0),
                names : [TaraweehNames[i]]
              });
            } 
          }
        }
        for(let i = 0; i < state.alphabeticalOrderListOfTaraweeh.length; i++){
          state.alphabeticalOrderListOfTaraweeh[i].names.sort((a, b) => moment.utc(a.created_at)*1000 - moment.utc(b.created_at)*1000);
        }
      }
      return{
        ...state,
        haramainTaraweehList : action.payload.status === 'success' ? state.alphabeticalOrderListOfTaraweeh : [],
        isHaramainTaraweehLoaded : action.payload.status === 'success' ? false : true
      };
    case SELECTED_SURAH_ID:
      return{
        ...state,
        selectedQari : state.qariDetail,
        selectedSurah : action.payload.item,
        surahID : action.payload.item.surah_id,
        currentIndex : action.payload.currentIndex,
        isPlaySurah : action.payload.isPlaySurah,
        isPlaying : action.payload.isPlaying,
        isQariChange : true,
      };
    case RESET_CHANGE_QARI_FLAG:
      return{
        ...state,
        isQariChange : action.payload,
      };
    case AUDIO_DURATION:
      return{
        ...state,
        audioDuration : action.payload.value,
        percentageValue : action.payload.percentageValue,
        isSurahLoaded : true
      };
    case PROGRESS_BAR_VALUE:
      return{
        ...state,
        progressValue : action.payload
      };
    case RESET_DATA:
      return{
        ...state,
        progressValue : action.payload === true ? 0 : state.progressValue,
        audioDuration : action.payload === true ? '' : state.audioDuration,
        percentageValue : action.payload === true ? 0 : state.percentageValue,
        isSurahLoaded : action.payload === true ? false : true
      };
    case START_OR_STOP:
      return{
        ...state,
        isPlaying : action.payload
      };
    case SURAH_COMPLETED:
      return{
        ...state,
        currentIndex : action.payload === true && state.currentIndex < state.surahList.length - 1 ? state.currentIndex + 1 : state.currentIndex,
        surahID : action.payload === true && state.currentIndex < state.surahList.length - 1 ? state.surahList[state.currentIndex + 1].surah_id : state.surahID,
        isQariChange : true,
        selectedQari : state.qariDetail,
        selectedSurah : state.currentIndex < state.surahList.length - 1 ? state.surahList[state.currentIndex + 1] : state.surahList[state.currentIndex] ,
      };
    case SURAH_CHANGE:
      return{
        ...state,
        currentIndex : action.payload === 'previous' ? state.currentIndex - 1 : state.currentIndex + 1,
        surahID : action.payload === 'previous' ? state.surahList[state.currentIndex - 1].surah_id : state.surahList[state.currentIndex + 1].surah_id,
        isQariChange : true,
        selectedQari : state.qariDetail,
        selectedSurah : action.payload === 'previous' ? state.surahList[state.currentIndex - 1] : state.surahList[state.currentIndex + 1],
      };
    case SHUFFLE_PLAY:
      const range = state.surahList.length - 1;
      const randomIndex = Math.floor(Math.random() * range);
      return{
        ...state,
        isPlaySurah : action.payload === true && state.isPlaySurah === false ? true : state.isPlaySurah,
        isPlaying : action.payload === true && state.isPlaying === false ? true : state.isPlaying,
        currentIndex : action.payload === true ? randomIndex : state.currentIndex,
        surahID : action.payload === true ? state.surahList[randomIndex].surah_id : state.surahID,
        isQariChange : true,
        selectedQari : state.qariDetail,
        selectedSurah : state.surahList[randomIndex],
      };
    default:
      return state;
  }
}

// for(let i = 0; i < state.alphabeticalOrderList.length; i++){
        //   for(let j = 0; j < state.alphabeticalOrderList[i].names.length; j++){
        //     console.log(state.alphabeticalOrderList[i].names[j].created_at);
        //     console.log(state.alphabeticalOrderList[i].names[j].english_name)
        //   }

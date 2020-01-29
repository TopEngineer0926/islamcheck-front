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
  SELECT_LANGUAGE,
  GET_LANGUAGES,
  SHUFFLE_PLAY,
} from './actionType';

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
  audioFile : '',
  currentIndex : 0,
  isPlaySurah : false,
  isPlaying : false,
  progressValue : 0,
  audioDuration : '',
  percentageValue : 0,
  isSurahLoaded : false,
  languageSelected : {name : 'English', code : 'en'},
  languageList : []
};
//'English', 'Deutsch', 'Türkçe', 'عربى', 'Bosanski', 'Gjuhë Shqipe', 'اردو', 'فارسی', 'Русский', 'български', 'Français', 'Nederlands', 'Italiano'
export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_LANGUAGE:
      return{
        ...state,
        languageSelected : action.payload
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
        function checkIndex(component){return component.name === 'Non-Hafs Recitations'}
        sectionsList.splice(Index, 1);
      }
      return{
        ...state,
        sections : action.payload.status === 'success' ? sectionsList : [],
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
            return component.letter === qariNames[i].name.charAt(0) ;
          }
          if(qariNames[i].name.charAt(0) === check_letter){
            state.alphabeticalOrderList[selectedIndex] = { id : qariNames[i].id,
              letter : qariNames[i].name.charAt(0),
              names : [...state.alphabeticalOrderList[selectedIndex].names, qariNames[i]]}
          }
          else{            
            check_letter = qariNames[i].name.charAt(0);
            if(selectedIndex > -1){
              state.alphabeticalOrderList[selectedIndex] = { id : qariNames[i].id,
                letter : qariNames[i].name.charAt(0),
                names : [...state.alphabeticalOrderList[selectedIndex].names, qariNames[i]]}
            }
            else{
              state.alphabeticalOrderList.push({
                id : qariNames[i].id,
                letter : qariNames[i].name.charAt(0),
                names : [qariNames[i]]
              });
            } 
          }
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
            return component.word === TaraweehNames[i].name.split(' ')[0] ;
          }
          if(TaraweehNames[i].name.split(' ')[0] === check_letter){
            state.alphabeticalOrderListOfTaraweeh[selectedIndex] = { id : TaraweehNames[i].id,
              word : TaraweehNames[i].name.split(' ')[0],
              names : [...state.alphabeticalOrderListOfTaraweeh[selectedIndex].names, TaraweehNames[i]]}
          }
          else{            
            check_letter = TaraweehNames[i].name.split(' ')[0];
            if(selectedIndex > -1){
              state.alphabeticalOrderListOfTaraweeh[selectedIndex] = { id : TaraweehNames[i].id,
                word : TaraweehNames[i].name.split(' ')[0],
                names : [...state.alphabeticalOrderListOfTaraweeh[selectedIndex].names, TaraweehNames[i]]}
            }
            else{
              state.alphabeticalOrderListOfTaraweeh.push({
                id : TaraweehNames[i].id,
                word : TaraweehNames[i].name.split(' ')[0],
                names : [TaraweehNames[i]]
              });
            } 
          }
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
        surahID : action.payload.item.id,
        audioFile : action.payload.item.file_name,
        currentIndex : action.payload.currentIndex,
        isPlaySurah : action.payload.isPlaySurah,
        isPlaying : action.payload.isPlaying
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
        currentIndex : action.payload === true && state.currentIndex < 113 ? state.currentIndex + 1 : state.currentIndex,
        surahID : action.payload === true && state.currentIndex < 113 ? state.surahID + 2 : state.surahID
      };
    case SURAH_CHANGE:
      return{
        ...state,
        currentIndex : action.payload === 'previous' ? state.currentIndex - 1 : state.currentIndex + 1,
        surahID : action.payload === 'previous' ? state.surahID - 2 : state.surahID + 2,
      };
    case SHUFFLE_PLAY:
      const randomIndex = Math.floor(Math.random() * 113);
      return{
        ...state,
        isPlaySurah : action.payload === true && state.isPlaySurah === false ? true : state.isPlaySurah,
        isPlaying : action.payload === true && state.isPlaying === false ? true : state.isPlaying,
        currentIndex : action.payload === true ? randomIndex : state.currentIndex,
        surahID : action.payload === true ? (randomIndex * 2) + 1 : state.surahID,
      };
    default:
      return state;
  }
}

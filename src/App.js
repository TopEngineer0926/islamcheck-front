import React from 'react';
import {Route, BrowserRouter as Router, useParams} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import BismillahComp from './QariList/Bismillah';
import SurahList from './Surahlist';
import {connect} from 'react-redux';
import PlayerDesign from './Surahlist/playerDesign';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
          <Router>
            <Route exact path="/" component={BismillahComp}/>
            <Route path="/surah-list/:id" children={<Child/>}/>
          </Router>
          {this.props.isPlaySurah && 
            <PlayerDesign  
              specificSurah={this.props.surahList[this.props.currentIndex]}
            />
          }
        <Footer/>                     
      </div>
    );
  }
}
const mapStateToProps = state => ({
  surahList : state.qariAndSurah.surahList,
  currentIndex : state.qariAndSurah.currentIndex,
  isPlaySurah : state.qariAndSurah.isPlaySurah
});
export default connect(mapStateToProps)(App);

function Child() {
  let { id } = useParams();
  return (
    <div>
      <SurahList ID={id}/>
    </div>
  );
}
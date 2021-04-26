import React from 'react';
import {Route, Router, useParams, Switch} from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import BismillahComp from '../QariList/Bismillah';
import SurahList from '../Surahlist';
import {connect} from 'react-redux';
import PlayerDesign from '../Surahlist/playerDesign';
import { history } from './history';

class App extends React.Component {
  render() {
    return (
      <Router history={history} basename={ process.env.PUBLIC_URL }>
        <div>
          <Header/>
            <Switch>
              <Route exact path="/" component={BismillahComp}/>
              <Route path="/surah-list/:id" children={<Child/>}/>
            </Switch>
            {this.props.isPlaySurah && 
              <PlayerDesign specificSurah={this.props.surahList[this.props.currentIndex]} audioPath={this.props.audioPath}/>
            }
          <Footer/>                     
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  surahList : state.qariAndSurah.surahList,
  currentIndex : state.qariAndSurah.currentIndex,
  isPlaySurah : state.qariAndSurah.isPlaySurah,
  audioPath : state.qariAndSurah.audioPath,
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
import React, {Component} from 'react';
import '../assets/style.css';
import bismillah from '../assets/images/bismillah.png';
import QariLIst from './index';
import HaramainTaraweeh from '../Haramain_Taraweeh';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from 'react-redux';
import {TAB_SECTIONS, SECTION_LOADER} from '../Redux/actionType';
import {GetData, StartLoader} from '../Redux/actions';
import {Loader} from '../loader';


class BismillahComp extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.props.StartLoader(SECTION_LOADER);
  }
  componentDidMount(){
    this.props.GetData('sections/'+this.props.languageSelected.code, TAB_SECTIONS);
  }
  tabPanels = () => {
    const tabsArray = [];
    for(let i = 0; i < this.props.sections.length ; i++){
      tabsArray.push(<TabPanel key={i}>{this.props.sections[i].name !== 'Recitations from Haramain Taraweeh' ? <QariLIst id={this.props.sections[i].id}/> : <HaramainTaraweeh id={this.props.sections[i].id}/>}</TabPanel>)
    }
    return tabsArray;
  }
  render(){ 
    return (
      <div>
        {this.props.isLoaderStart && <Loader/>}
        {!this.props.isLoaderStart && 
          <div>
            <div className="container">
              <div className="bismillah_head text-center py-5">
                <img src={bismillah} className="w-50" alt=""/>
              </div>
            </div>
            <div className="container">
              <Tabs defaultIndex={0}>
                <TabList>
                  {this.props.sections.map((item, index)=> <Tab key={item.id}>{item.name}</Tab>)}
                </TabList>
                {this.tabPanels()}
              </Tabs>
            </div>
            <hr className="m-0"/>
          </div>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  sections : state.qariAndSurah.sections,
  isLoaderStart : state.qariAndSurah.isLoaderStart,
  languageSelected : state.qariAndSurah.languageSelected
});
export default connect(mapStateToProps, {GetData, StartLoader})(BismillahComp); 
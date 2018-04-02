import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DayBackground from './sunrise_img.jpeg';
import NightBackground from './nighttime_img.JPG';
import DayComplete from './morning_complete.svg';
import NightComplete from './night_complete.svg';



// The Component Hierarchy (enumerated by nesting level)
// 1. something that contains the entire work area
// 2. night and morning buttons 
// 2. habit lists (morning/night)
// 3. add/delete habit button
// 3. check off habit (complete for the day)
// 3. habits


// UI react todos:
// 1. transform the buttons to be more plain x 
// 2. make the background look like a polaroid: white with a pic in the upper/middle x
// 3. change the design of the site to instead work off of toggles: initial landing page will be the morning todos x 
//   3: handled via implementing states which will need to be polished
// 4. create a form fillout that will be used to create a new habit x
// 5. style the form fillout x
// 6. style the add task button x
// 7. style the habit list header x
// 8. change the array of Habit to array of objects that will be mapped to Habits
// 8. deleteHabit callback function
// 9. change the 2 buttons to just a single toggle that says: "it is night" or "it is morning"


// interactive react todos
// make the onchange for the checkbox (ie completing a task!)
//   --> make a smiley sun/moon appear beside the text x




// the Button component can only ever live within the app component
// what should some props be? how might state change? 
// state could change depending on what screen the user wants, ie. when the button has been pressed, something will happen 
function Button(props) {
    return(
      // className will be affected by CSS to make the buttons look different 
      // props.onClick should reference a function that changes state of the holder component

      <button id={props.id} className = {props.className} onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function Checkbox(props){
  return (
    <input type="checkbox" value={props.value}/>
  );
}

// TODO create the habits class x
// TODO create the state that controls the checkbox

class Habit extends Component{
  constructor(props){
    super(props);
    this.state= {
      taskCompleted: false,
      };

    this.completeClick = this.completeClick.bind(this);
    }

  completeClick() {
    this.setState({taskCompleted: !this.state.taskCompleted});
  }
  
  render(){

    let source;

    if(this.props.morningHabit === true) {
      this.source = DayComplete;
    }
    else {
      this.source = NightComplete;
    }

    return(
      <li className="Habit" key={this.props.id}>
        {this.props.value}
        <Button className = 'EditButton'/>
        <Button className = 'DeleteButton'/>
        <input id="done!" type="checkbox" onClick={this.completeClick}/>
        {this.state.taskCompleted? <img className="completedIcon" src={this.source} alt="good job!"/> : null}
      </li>
    );
  }
}

// TODO create the form class 
// this class will accept the name of a habit, and whether it is a morning habit, a night habit, or both (can only be one of these 3)

class HabitForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      habitVal: 'What is the habit?',
      morning: false,
      night: false
    }

    this.dataReturn = this.dataReturn.bind(this);
    this.textChange = this.textChange.bind(this);
    this.morningChange = this.morningChange.bind(this);
    this.nightChange = this.nightChange.bind(this);
    this.dataReturn = this.dataReturn.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  textChange(event) {
    this.setState({habitVal: event.target.value,});
  }

  morningChange(event) {
    this.setState({morning: !this.state.morning,});
  }

  nightChange(event) {
    this.setState({night: !this.state.night,});
  }

  formSubmit(event) {
    event.preventDefault();
    this.dataReturn();
  }

  dataReturn = () => {
    var habitInfo = {
      habitVal: this.state.habitVal,
      morning: this.state.morning,
      night: this.state.night
    }

    this.props.handleSubmit(habitInfo);
    
  }


  render() {
    return (
      <div align="center">
        <label for="habitVal">Enter Habit name: </label>
        <input id="habitVal" type="text" value={this.state.habitVal} onChange={this.textChange}/>
        <input id="morningHabit" type="checkbox" checked={this.state.morning} onChange={this.morningChange}/>
        <label for="morningHabit">Morning habit</label>
        <input id="nightHabit" type="checkbox" checked={this.state.night} onChange={this.nightChange}/>
        <label for="nightHabit">Night habit</label>
        <button onClick={this.dataReturn}> 
          Submit!
        </button>
      </div>
    ); 
  }
}

// TODO create the habit list class x
// HabitList has props name, className, and value x
// HabitList contains the arrays of habits x
// if goodMorning is true, then the Habitlist shown will be the morning one, else it will be the night one x
// the habits that are created will have delete and complete buttons, onclick of these should be passed in as props from habitList

class HabitList extends Component{
  render(){
    return (
      <div name={this.props.name} className={this.props.className}>
        <header className ="List-header">Tasks:  </header>
        <ul>
          {this.props.habits}
        </ul>
      </div>
    );
  }
}

// TODO start using the components and create the UI x


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // initial state: morning is displayed, background and list reflect this
      // morning and night habits are initialized as empty arrays which will have Habits pushed into them
      goodMorning: true,
      showForm: false,
      morningHabits: [],
      nightHabits: [],
      numHabits: 0,
    };

//    this.handleSubmit = this.handleSubmit.bind(this);
  }

  modeClick(){
    // state change will be passed via props into habitlist as well as a hard coded flexcontainer to change background
    //  and the habitlist 
    this.setState({
      goodMorning: !this.state.goodMorning,
    });
    
  }

  addTaskClick(){
    // this causes a form to be shown
    this.setState({
      showForm: !this.state.showForm
    });
   
  }

  deleteClick(i) {

    // state change will have to be implmented via callback function

  }

  handleSubmit = (formData) =>  {
      this.setState ({showForm: !this.state.showForm, });

      var newNum = this.state.numHabits;
      var updatedArr; 

      if(formData.morning === true) {
        newNum++;
        updatedArr= this.state.morningHabits.slice();
        updatedArr.push(<Habit value = {formData.habitVal} morningHabit = {true} id = {this.state.numHabits} />);
        this.setState(
          {
            morningHabits: updatedArr, 
            numHabits: newNum
          });

      }
 
      if(formData.night === true) {
        newNum++;
        updatedArr = this.state.nightHabits.slice();
        updatedArr.push(<Habit value= {formData.habitVal} morningHabit = {false} id = {this.state.numHabits} />);
        this.setState(
          {
            nightHabits: updatedArr, 
            numHabits: this.newNum
          });
      }

  }


  render() {
    var backgroundImageURL;
    var renderHabits;

    if(this.state.goodMorning === true) {
      backgroundImageURL = DayBackground;   
      renderHabits = this.state.morningHabits;
    }
    else {
      backgroundImageURL = NightBackground; 
      renderHabits = this.state.nightHabits;
    }

  // inline style to support changing backgrounds
    const background = {
      height: '800px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundPosition: 'center',
      backgroundSize: '85%',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(' + backgroundImageURL + ')',
    };

    return (
      <div className="App">
        <header className="App-header">Habritual</header>
        {this.state.showForm? <HabitForm className='newHabitForm' handleSubmit={this.handleSubmit}/> : null}
        <div style={background} className='Flex-container'>
          
          <HabitList name='habitList' className='Main-flex' habits={renderHabits}/>
          
          <div className='Side-flex'>
            <Button id='morning_routine_btn' className='mainMenuButton' value= 'Good Morning' onClick={()=>this.modeClick()}/>
            <Button id='night_routine_btn' className='mainMenuButton' value= 'Good Night' onClick={()=>this.modeClick()} />
            <Button id='new_task_btn' className='mainMenuButton' value='Add a task' onClick={()=>this.addTaskClick()}/>
          </div> 
        </div>
         
        <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

      </div>
    );
  }
}

export default App;

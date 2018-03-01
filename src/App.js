import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DayBackground from './sunrise_img.jpeg';
import NightBackground from './nighttime_img.JPG';



// The Component Hierarchy (enumerated by nesting level)
// 1. something that contains the entire work area
// 2. night and morning buttons 
// 2. habit lists (morning/night)
// 3. add/delete habit button
// 3. check off habit (complete for the day)
// 3. habits


// UI react todos
// make the site look less ass:
// 1. transform the buttons to be white, shadowed with gradient text instead
// 2. make the background look like a polaroid: white with a pic in the upper/middle
// 3. change the design of the site to instead work off of toggles: initial
//  landing page will be the morning todos

// interactive react todos
// make the onchange for the checkbox (ie completing a task!)
//   --> make a smiley sun/moon appear beside the text




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
    <input type="checkbox"/>
  );
}

// TODO create the habit list class x
// HabitList has props name, className, and value
// HabitList contains the array of habits
// if goodMorning is true, then the Habitlist shown will be the morning one, else it will be the night one
class HabitList extends Component{
  constructor(props){
    super(props);
    this.state = {
      listOfHabits: Array(0),
      goodMorning: props.isItMorning
    }
  }
  render(){

    // maybe init. an array of habits, that will be empty until a habit is created
    return (
      <div name={this.props.name} className={this.props.className}>
      Add a task!
        {this.props.value}
      </div>
    );
  }
}

// TODO create the habits class x
// TODO create the state that controls the checkbox
// Habit contains the state of the checkbox
class Habit extends Component{
  constructor(props){
    super(props);
    this.state= {
      taskCompleted: false,
      };
    }

  checkboxClick(){

  }

  
  render(){
    return(
      <li className={this.props.className}>
      {this.props.value}
        <Button className = 'EditButton'/>
        <Button className = 'DeleteButton'/>
        <Checkbox onClick={() => this.checkboxClick}/>
      </li>
    );
  }
}

// TODO start using the components and create the UI


class App extends Component {

  

  constructor(props){
    super(props);
    this.state = {
      // initial state: morning is displayed, background and list reflect this
      goodMorning: true,
      
    };
  }

  modeClick(){
    this.setState({
      goodMorning: !this.state.goodMorning,
    });
    
  }

  render() {
    var backgroundImageURL;

    if(this.state.goodMorning === true)
      backgroundImageURL = DayBackground;   
    else
      backgroundImageURL = NightBackground; 

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
        <div style={background} className='Flex-container'>
          <HabitList name='morning_habits' className='Main-flex' isItMorning={this.state.goodMorning}/>

          <div className='Side-flex'>
            <Button id='morning_routine_btn' className='mainMenuButton' value= 'Good Morning' onClick={()=>this.modeClick()}/>
            <Button id='night_routine_btn' className='mainMenuButton' value= 'Good Night' onClick={()=>this.modeClick()} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

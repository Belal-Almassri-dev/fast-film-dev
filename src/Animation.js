import React, { Component } from "react";
import Stepper from 'react-stepper-horizontal';
import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


// load in JSON data from file
// var data;

// var oReq = new XMLHttpRequest();
// oReq.onload = reqListener;
// oReq.open("get", "json_files/locations.json", true);
// oReq.send();

// function reqListener(e) {
//     data = JSON.parse(this.responseText);
// }
// console.log(data);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
      stepCount: 1
    };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleNextClick() {
    
    this.state.stepCount = this.state.stepCount + 1;
    // stepCount = this.state.stepCount++;
    this.setState({ stepCount: this.state.stepCount });
  }

  handlePreviousClick() {
    this.state.stepCount = this.state.stepCount - 1;
    // stepCount = stepCount--;
    this.setState({ stepCount: this.state.stepCount-- });
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    const stepCount = this.state.stepCount;
    let nxt_button; let prev_button;

    if (stepCount == 0) { 
      nxt_button = <NextButton onClick={this.handleNextClick} />;
    } else if (stepCount == 1) {
      prev_button = <PreviousButton onClick={this.handlePreviousClick} />;
      nxt_button =  <NextButton onClick={this.handleNextClick} />;
    }else if (stepCount == 2) {
      prev_button = <PreviousButton onClick={this.handlePreviousClick} />;
      nxt_button =  <NextButton onClick={this.handleNextClick} />;
    }else if (stepCount == 3) {
      prev_button = <PreviousButton onClick={this.handlePreviousClick} />;
      nxt_button =  <NextButton onClick={this.handleNextClick} />;
    }else if (stepCount == 4) {
      prev_button = <PreviousButton onClick={this.handlePreviousClick} />;
      nxt_button =  <NextButton onClick={this.handleNextClick} />;
    } else if (stepCount == 5) {
      prev_button = <PreviousButton onClick={this.handlePreviousClick} />;
      nxt_button =  <NextButton onClick={this.handleNextClick} />;
    } else {
      prev_button = <PreviousButton onClick={this.handlePreviousClick} />;
      nxt_button =  <NextButton onClick={this.handleNextClick} />;
    }

    return (
      <div className="App">

        <h1 className="App-title">Fast Film</h1>
        <Stepper steps={[{ title: '1 - Type of film' }, { title: '2 - Type of animation' }, { title: '3 Duration of animation' }, { title: '4 - Review' }, { title: '5 - Quote' }]} activeStep={stepCount - 1} />

        <StepDisplay stepCount={stepCount} />
         <div className="row">
          <div className="col-sm">
            {prev_button}
          </div>
          <div className="col-sm">
            {nxt_button}
          </div>
        </div>
      </div>
    );
    // Returning Conditional Views
  }
}

function StepInitial(props) {
  return ( 
    <div><h3>START A NEW ESTIMATE</h3></div>
    );
}


function StepOne(props) {
  return ( 
    <div className="container">
        <h3>1 What type of film do you need ?</h3>
        <div className="row"> 
          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample" value="1" defaultChecked />
            <label className="form-check-label" htmlFor="materialInline1">HIGHLIGHTS FILM</label>
          </div>

          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline2" name="inlineMaterialRadiosExample" value="1" />
            <label className="form-check-label" htmlFor="materialInline2">ANIMATION</label>
          </div>
        </div>
        <div className="row"> 
          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline3" name="inlineMaterialRadiosExample" value="1" />
            <label className="form-check-label" htmlFor="materialInline3">TALKING HEAD / INTERVIEW</label>
          </div>

          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline4" name="inlineMaterialRadiosExample" value="1" />
            <label className="form-check-label" htmlFor="materialInline4">REQUEST CALLBACK</label>
          </div>
        </div>
    </div>
    );
}

function StepTwo(props) {
  console.log(props);
  return (
  <div className="container">
        <h3>2 What type of animation do you need ?</h3>
        <div className="row"> 
          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample" value="1" />
            <label className="form-check-label" htmlFor="materialInline1">BASIC TYPOGRAPHY</label>
          </div>

          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline2" name="inlineMaterialRadiosExample" value="1" />
            <label className="form-check-label" htmlFor="materialInline2">BASIC ICONOGRAPHY</label>
          </div>
        </div>
        <div className="row"> 
          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline3" name="inlineMaterialRadiosExample" value="1" />
            <label className="form-check-label" htmlFor="materialInline3">ADVANCED ICONOGRAPHY & 2D CHARACTER DRIVER ANIMATION</label>
          </div>

          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline4" name="inlineMaterialRadiosExample" value="1" />
            <label className="form-check-label" htmlFor="materialInline4">GET A NEW QUOTE</label>
          </div>
        </div>
    </div>
    );
}

function StepThree(props) {
  return (
  
  <div className="container">
        <h3>3 How long should this animation be ?</h3>
        <div className="row"> 
          <div className="form-check form-check-inline">
            <div className="form-group">
              <select className="form-control" id="sel1">
                <option value="1">1 min</option>
                <option value="2">2 mins</option>
                <option value="3">3 mins</option>
                <option value="4">4 mins</option>
                <option value="5">5 mins</option>
                <option value="6">6 mins</option>
                <option value="7">7 mins</option>
                <option value="8">8 mins</option>
                <option value="9">9 mins</option>
                <option value="10">10 mins</option>
              </select>
            </div>
          </div>
        </div>
    </div>
    );
}

function StepFour(props) {
  return (
  <div className="container">
  <h3>4 Please Review your request</h3>
  <dl className="row">
  <dt className="col-sm-3">STEP 1: Type of video</dt>
  <dd className="col-sm-9">Animation</dd>
  </dl>

  <dl className="row">
  <dt className="col-sm-3">STEP 2: Type of animation</dt>
  <dd className="col-sm-9">Basic iconography</dd>
  </dl>

  <dl className="row">
  <dt className="col-sm-3">STEP 3: Animation duration</dt>
  <dd className="col-sm-9">1 mins 0 seconds</dd>
  </dl>
</div>
  );
}

function StepFive(props) {
  return (
   <div className="container">
    <h3>5 Your Estimate</h3>
    <dl className="row">
      <dd className="col-sm-9">£12,000-14,000</dd>
      <dd className="col-sm-9">Quote is indicative. Please contact a TCEG representative for more information.</dd>
      <dd className="col-sm-9">Enter the below details to complete quotation:</dd>
    </dl>
   <div className="row">

        
        <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                <div className="row">
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <input type="text" id="name" name="name" className="form-control" placeholder="Name"/>
                            
                        </div>
                    </div>     
                </div>
            <div className="row">          
                <div className="col-md-12">
                    <div className="md-form mb-0">
                        <input type="text" id="organization" name="organization" className="form-control" placeholder="Organization" />
                    </div>
                </div>   
            </div >        
            <div className="row">
              <div className="col-md-12">
                  <div className="md-form mb-0">
                      <input type="text" id="email" name="email" className="form-control" placeholder="Email Address" />
                  </div>
              </div>
            </div>

            <div className="row">          
                <div className="col-md-12">
                    <div className="md-form mb-0">
                        <button>EMAIL THIS ESTIMATE</button>
                    </div>
                </div>   
            </div >  

            <div className="row">          
                <div className="col-md-12">
                    <div className="md-form mb-0">
                        <button>MODIFY THIS ESTIMATE</button>
                    </div>
                </div>   
            </div >  

            <div className="row">          
                <div className="col-md-12">
                    <div className="md-form mb-0">
                        <button>GET A NEW ESTIMATE</button>
                    </div>
                </div>   
            </div >  
            </form>
        </div>        
        </div>
    </div>
  );
}

function StepDisplay(props) {
  const stepCount = props.stepCount;
  if (stepCount == 0) {
    return <StepInitial />;
  }
  else if (stepCount == 1) {
    return <StepOne />;
  }
   else if (stepCount == 2) {
    return <StepTwo />;
  }
  else if (stepCount == 3) {
    return <StepThree />;
  }
  else if (stepCount == 4) {
    return <StepFour />;
  }
  else if (stepCount == 5) {
    return <StepFive />;
  }
  return null;
}

function NextButton(props) {
  return (
    <button onClick={props.onClick} className="btn btn-secondary">
      Next
    </button>
  );
}

function PreviousButton(props) {
  return (
    <button onClick={props.onClick} className="btn btn-secondary">
      Previous
    </button>
  );
}

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

export default App;
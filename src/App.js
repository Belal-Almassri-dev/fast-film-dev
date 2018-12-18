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
    this.updateInput = this.updateInput.bind(this);
  }

  handleNextClick() {
    
    this.state.stepCount = this.state.stepCount + 1;
    // stepCount = this.state.stepCount++;
    this.setState({ stepCount: this.state.stepCount });
    this.addItem();
  }

  handlePreviousClick() {
    this.state.stepCount = this.state.stepCount - 1;
    // stepCount = stepCount--;
    this.setState({ stepCount: this.state.stepCount-- });
    this.addItem();
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
    console.log("componentWillUnmount");
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
    console.log("newItem", newItem);
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
    } else if (stepCount == 6) {
      prev_button = <PreviousButton onClick={this.handlePreviousClick} />;
      nxt_button =  <NextButton onClick={this.handleNextClick} />;
    } else {
      prev_button = <PreviousButton onClick={this.handlePreviousClick} />;
      nxt_button =  <NextButton onClick={this.handleNextClick} />;
    }

    return (
      <div className="App">

        <h1 className="App-title">Fast Film</h1>
        <Stepper steps={[{ title: '1 - Type of film' }, { title: '2 - Locations' }, { title: '3 Duration of video' }, { title: '4 - Add-ons' }, { title: '5 - Review' }, {title:'6 - Quote'}]} activeStep={stepCount - 1} />

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
  console.log("props==", props);
  return ( 
    <div className="container">
        <h3>1 What type of film do you need ?</h3>
        <div className="row"> 
          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample" value="highlights_film"  onChange={e => this.updateInput("newItem", e.target.value)} />
            <label className="form-check-label" htmlFor="materialInline1">HIGHLIGHTS FILM</label>
          </div>

          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline2" name="inlineMaterialRadiosExample" value="animation" />
            <label className="form-check-label" htmlFor="materialInline2">ANIMATION</label>
          </div>
        </div>
        <div className="row"> 
          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline3" name="inlineMaterialRadiosExample" value="taking_interview" />
            <label className="form-check-label" htmlFor="materialInline3">TALKING HEAD / INTERVIEW</label>
          </div>

          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" id="materialInline4" name="inlineMaterialRadiosExample" value="request_callback" />
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
        <h3>2 Where will it be filmed ?</h3>
        <div className="row"> 
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="materialInline1">LOCATION 1:</label>
            <select name="location" className="form-control">
            <option value="">Search (Post code, building name)</option>
            </select>
          </div>
        </div>
    </div>
    );
}

function StepThree(props) {
  return (
  
  <div className="container">
        <h3>3 Duration of video</h3>
        <div className="row"> 
          <label className="form-check-label">3 How long should this film be?</label>
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

        <div className="row"> 
          <label className="form-check-label">Is the duration flexible?</label>
          <div className="form-check form-check-inline">
            <div className="form-group">
              <select className="form-control" id="sel1">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        </div>


        <div className="row"> 
          <label className="form-check-label">Additional post-event
video cutdown required?</label>
          <div className="form-check form-check-inline">
            <div className="form-group">
              <select className="form-control" name="">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        </div>
        

        <div className="row"> 
          <label className="form-check-label">How long should this be?</label>
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

function StepFour(props){
  return (
  
  <div className="container">
        <h3>4 - Add-ons</h3>
        <div className="row"> 
          <label className="form-check-label">Do you require a photographer?</label>
          <div className="form-check form-check-inline">
            <div className="form-group">
              <select className="form-control" id="sel1">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        </div>

        

        <div className="row"> 
          <label className="form-check-label">Will this film be played at an event?</label>
          <div className="form-check form-check-inline">
            <div className="form-group">
              <select className="form-control" id="sel1">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        </div>


        <div className="row"> 
          <label className="form-check-label">Filming over how many days?</label>
          <div className="form-check form-check-inline">
            <div className="form-group">
              <select className="form-control" id="sel1">
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
              </select>
            </div>
          </div>
        </div>


        <div className="row"> 
          <label className="form-check-label">Do you want other add-ons?</label>
          <div className="form-check form-check-inline">
            <div className="form-group">
              <select className="form-control" name="">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        </div>
        

    </div>
    );

}

function StepFive(props) {
  return (
  <div className="container">
  <h3>5 Please Review your request</h3>
  <dl className="row">
  <dt className="col-sm-3">STEP 1: Type of video</dt>
  <dd className="col-sm-9">Highlights film</dd>
  </dl>

  <dl className="row">
  <dt className="col-sm-3">STEP 2: Locations</dt>
  <dd className="col-sm-9">LOCATION 1:
St. Paul’s Churchyard, London EC4M 8AD</dd>
  </dl>

  <dl className="row">
  <dt className="col-sm-3">STEP 3: Duration of video</dt>
  <dd className="col-sm-9">5 mins 0 seconds (flexible)
Additional post-event video cutdown required
(2 mins 0 seconds)</dd>
  </dl>

  <dl className="row">
  <dt className="col-sm-3">STEP 4: Add-ons</dt>
  <dd className="col-sm-9">Photographer is required
Will be filmed at an event
Filmed over 2 days
Add-ons: Voice over, translations and subititles</dd>
  </dl>

</div>
  );
}

function StepSix(props) {
  return (
   <div className="container">
    <h3>6 Your Estimate</h3>
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
  else if (stepCount == 6) {
    return <StepSix />;
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
import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import Reading from './components/reading'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { readings: [] }
  }

  componentDidMount() {
    //https://weather-station-.herokuapp.com/
    window.fetch('http://localhost:3001/').then(data => {
      data.json().then(res => {
        this.setState({readings: res})
      })
    })
    //ws://weather-station-.herokuapp.com/cable
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('ReadingsChannel', {
      received: this.handleReceiveNewReadings
    })
  }

  handleReceiveNewReadings = ({ readings }) => {
    console.log(readings)
    if (readings !== this.state.readings) {
      this.setState({ readings: readings })
      console.log(this.state.readings)
    }
  }


  render() {
    return (
      <div>
        <h1>Readings: {this.state.readings.length}</h1>
          {
            this.state.readings.map((reading) => (
              <Reading
                key={reading.id}
                temperature={reading.temperature}
                humidity={reading.humidity}
              />
            ))
          }
      </div>
    );
  }
}

export default App

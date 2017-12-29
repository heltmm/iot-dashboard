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
    window.fetch('https://weather-station-.herokuapp.com/').then(data => {
      data.json().then(res => {
        this.setState({readings: res})
      })
    })

    const cable = ActionCable.createConsumer('ws://weather-station-.herokuapp.com//cable')
    this.sub = cable.subscriptions.create('ReadingsChannel', {
      received: this.handleReceiveNewReadings
    })
  }

  handleReceiveNewReadings = ({ newReadings }) => {
    console.log("made it")
    if (newReadings !== this.state.readings) {
      this.setState({ readings: newReadings })
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

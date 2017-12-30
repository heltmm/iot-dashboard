import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import Device from './components/device'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { devices: [] }
  }

  componentDidMount() {
    //https://weather-station-.herokuapp.com/
    window.fetch('http://localhost:3001/devices').then(data => {
      data.json().then(res => {
        this.setState({devices: res})
      })
    })
    //ws://weather-station-.herokuapp.com/cable
    // const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    // this.sub = cable.subscriptions.create('ReadingsChannel', {
    //   received: this.handleReceiveNewReadings
    // })
  }

  // handleReceiveNewReadings = ({ readings }) => {
  //
  //   if (readings !== this.state.readings) {
  //     this.setState({ readings: readings })
  //     console.log(this.state.readings)
  //   }
  // }


  render() {
    return (
      <div>
        <h1>Devices:</h1>
          {
            this.state.devices.map((device) => (
              <Device
                key={device.id}
                name={device.name}
                location={device.location}
              />
            ))
          }
      </div>
    );
  }
}

export default App

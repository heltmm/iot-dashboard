import React, { Component } from 'react'
import ActionCable from 'actioncable'
import Reading from './reading'
import LineExample from './line-graph';

class Device extends Component {
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

    if (readings !== this.state.readings) {
      this.setState({ readings: readings })
      console.log(this.state.readings)
    }
  }


  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.props.location}</p>
        <h2>Readings: {this.state.readings.length}</h2>
          {
            this.state.readings.map((reading) => (
              <Reading
                key={reading.id}
                temperature={reading.temperature}
                humidity={reading.humidity}
              />
            ))
          }
          <LineExample
            readings={this.state.readings}/>
      </div>
    );
  }
}

export default Device

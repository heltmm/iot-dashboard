import React, { Component } from 'react'
import ActionCable from 'actioncable'
import Reading from './reading'
import LineGraph from './line-graph';

class Device extends Component {
  constructor(props) {
    super(props);

    this.state =  { readings: [{temperature: '', humidity: '', created_at: ''}],
                    device_id: this.props.match.params.id
                  }
  }

  componentDidMount() {
    //https://weather-station-.herokuapp.com/
    window.fetch(`https://weather-station-.herokuapp.com/devices/${this.state.device_id}/readings`).then(data => {
      data.json().then(res => {
        this.setState({readings: res})
      })
    })
    console.log(this.state.readings[this.state.readings.length-1])
    //ws://weather-station-.herokuapp.com/cable
    const cable = ActionCable.createConsumer('wss://weather-station-.herokuapp.com/cable')
    this.sub = cable.subscriptions.create({channel: 'ReadingsChannel', device_id: this.state.device_id}, {
      received: this.handleReceiveNewReading
    })
  }

  handleReceiveNewReading = ({ reading }) => {
    console.log(reading)
    console.log(this.state.device_id)
    if (reading.device_id == this.state.device_id) {
      this.setState({ readings: [...this.state.readings, reading] })
      console.log(this.state.readings)
    }
  }


  render() {
    let tempData = {temperatures: [], labels: []}
    this.state.readings.map((reading) => {
      tempData.temperatures.push(reading.temperature)
      tempData.labels.push(reading.created_at)
    })
    return (
      <div>

        <h2>Current Reading:</h2>
          <Reading
            key={this.state.readings[this.state.readings.length-1].id}
            temperature={this.state.readings[this.state.readings.length-1].temperature}
            humidity={this.state.readings[this.state.readings.length-1].humidity}
            time={this.state.readings[this.state.readings.length-1].created_at}
          />

          <LineGraph
            readings={tempData}/>
      </div>
    );
  }
}

export default Device

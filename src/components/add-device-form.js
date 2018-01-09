import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'



class AddDeviceForm extends Component {
  constructor(props) {
    super(props);

  }

  handleNewDeviceFormSubmission = (event) => {
    event.preventDefault();
    // window.fetch('http://localhost:3001/devices/',{
    window.fetch('https://weather-station-.herokuapp.com/devices/',{
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "api_key": "F52NQQ0Ry1SMTguKQiQO4gtt"
        // local api key
        // "api_key": "LYT0mNYMIcNvQSC1qh9xGwtt"
      },
      body: JSON.stringify({
        name: event.target.device_name.value,
        location: event.target.location.value
      }),
      method: 'Post'
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleNewDeviceFormSubmission}>
        <Form.Field>
          <label>Device Name</label>
          <input
            placeholder='DHT Sensor'
            id="device_name"
            />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <input
              placeholder='Portland'
              id="location"
            />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}
export default AddDeviceForm

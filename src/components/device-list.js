import React, { Component } from 'react'
import Device from './device'
import { Card } from 'semantic-ui-react'

class DeviceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
    }
  }

  componentDidMount() {

    // window.fetch('http://localhost:3001/devices').then(data => {
    window.fetch('https://weather-station-.herokuapp.com/devices').then(data => {
      data.json().then(res => {
        this.setState({devices: res})
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Devices:</h1>
        <Card.Group itemsPerRow={3}>
          {
            this.state.devices.map((device) =>
              <Card href={`/device/${device.id}`}>
                <Card.Content>
                  <Card.Header>
                    {device.name}
                  </Card.Header>
                  <Card.Meta>
                    ID: {device.id}
                  </Card.Meta>
                  <Card.Description>
                    {device.location}
                  </Card.Description>
                </Card.Content>
              </Card>
            )
          }
        </Card.Group>
      </div>
    );
  }
}

export default DeviceList

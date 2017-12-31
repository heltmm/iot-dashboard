import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import Device from './components/device'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      visible: false,
      activeItem: 'home'}
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
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  // handleReceiveNewReadings = ({ readings }) => {
  //
  //   if (readings !== this.state.readings) {
  //     this.setState({ readings: readings })
  //     console.log(this.state.readings)
  //   }
  // }


  render() {
    const { visible } = this.state
    const { activeItem } = this.state

    return (
      <div>
          <Menu icon inverted>
            <Menu.Item onClick={this.toggleVisibility}>
              <Icon name='content' />
            </Menu.Item>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item>
            Date: {this.state.curTime}
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>

        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Devices
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              New Device
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
                <h1>Devices:</h1>
                  {
                    this.state.devices.map((device) => (
                      <Device
                        id={device.id}
                        name={device.name}
                        location={device.location}
                      />
                    ))
                  }
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App

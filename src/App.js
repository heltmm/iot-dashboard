import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import Device from './components/device'
import DeviceList from './components/device-list'
import AddDeviceModal from './components/add-device-modal'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      activeItem: 'home'}
    }

  componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { visible } = this.state
    const { activeItem } = this.state

    return (
      <div>
        <Menu icon inverted style={ {borderRadius: 0, marginBottom: 0} }>
          <Menu.Item onClick={this.toggleVisibility}>
            <Icon name='content' />
          </Menu.Item>
          <Menu.Item name='home' href='/' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item position='right'>
            Date: {this.state.curTime}
          </Menu.Item>

        </Menu>

        <Sidebar.Pushable style={ { marginTop: 0, borderRadius: 0, border: 0} } as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home' href='/'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad' href='/devices'>
              <Icon name='gamepad' />
              Devices
            </Menu.Item>
            <Menu.Item name='camera' href='/new-device' >
              <Icon name='camera' />
              New Device
            </Menu.Item>
            <AddDeviceModal />
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Switch>
                <Route exact path='/' component={DeviceList}/>
                <Route path='/devices' component={DeviceList}/>
                <Route exact path='/device/:id' component={Device}/>
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App

import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import Device from './components/device'
import DeviceList from './components/device-list'


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

import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import AddDeviceForm from './add-device-form'

const AddDeviceModal = () => (
  <Modal trigger={<Button>Add Device</Button>}>
    <Modal.Header>Add a new Device</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <AddDeviceForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default AddDeviceModal

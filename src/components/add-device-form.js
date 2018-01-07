import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const AddDeviceForm = () => (
  <Form onSubmit={this.handleNewDeviceFormSubmission}>
    <Form.Field>
      <label>Device Name</label>
      <input placeholder='DHT Sensor' />
    </Form.Field>
    <Form.Field>
      <label>Location</label>
      <input placeholder='Portland' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default AddDeviceForm

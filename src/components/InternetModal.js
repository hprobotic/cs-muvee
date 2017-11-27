import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class InternetModal extends Component {
  state = { modalOpen: true }
  handleClose = () => {
    window.location.reload()
  }

  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='unlinkify' content='No Internet Connection !!!' />
        <Modal.Content>
          <h3>Something wrong with internet connection. <br /> Please check again and reload this page</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='refresh' /> Reload
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

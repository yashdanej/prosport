import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import MasterAdminPlansTable from '../../Plans/MasterAdminPlansTable'

const UpgradePlanModal = ({modal, toggle}: any) => {
  return (
    <Modal isOpen={modal} toggle={toggle} size="xl" >
        <ModalHeader toggle={toggle}>Change Plan</ModalHeader>
        <ModalBody>
            <MasterAdminPlansTable from="UpgradePlan" />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
  )
}

export default UpgradePlanModal

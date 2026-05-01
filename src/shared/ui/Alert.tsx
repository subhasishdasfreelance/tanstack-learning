import type { UseOverlayStateReturn } from '@heroui/react'
import { Modal } from '@heroui/react'
import type { ReactNode } from 'react'

type Props = {
  state: UseOverlayStateReturn
  noClose?: boolean
  children: ReactNode
}
export default function Alert({ state, noClose, children }: Props) {
  return (
    <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-lg">
          {!noClose && <Modal.CloseTrigger />}

          {children}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}

Alert.Body = ({ children }: { children: ReactNode }) => {
  return <Modal.Body>{children}</Modal.Body>
}

Alert.Header = ({
  children,
  icon,
}: {
  children: ReactNode
  icon?: ReactNode
}) => {
  return (
    <Modal.Header>
      <Modal.Icon>{icon}</Modal.Icon>
      <Modal.Heading>{children}</Modal.Heading>
    </Modal.Header>
  )
}

Alert.Footer = ({ children }: { children: ReactNode }) => {
  return <Modal.Footer>{children}</Modal.Footer>
}

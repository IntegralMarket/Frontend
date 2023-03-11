import React, {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

import { Icon } from 'components'

import s from './Modal.module.scss'

React.useLayoutEffect = useEffect

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  contentClassName?: string
  closeButton?: boolean
  topAligned?: boolean,

}

interface ReactPortal {
  children: ReactNode
  wrapperId: string
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  contentClassName,
  closeButton = true,
  topAligned,
}) => {
  const createModalWrapper = (wrapperId: string) => {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    return wrapperElement
  }

  const ReactPortal = ({
    children,
    wrapperId = 'react-portal-wrapper',
  }: ReactPortal) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
      null
    )
    useLayoutEffect(() => {
      let element = document.getElementById(wrapperId)
      let systemCreated = false

      if (!element) {
        systemCreated = true
        element = createModalWrapper(wrapperId)
      }
      setWrapperElement(element)

      return () => {
        if (systemCreated && element?.parentNode) {
          element.parentNode.removeChild(element)
        }
      }
    }, [wrapperId])

    if (wrapperElement === null) return null

    return createPortal(children, wrapperElement)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const modalClass = cn(s.modal, {
    [s.active]: isOpen,
    [s.topAligned]: topAligned,
  })

  return (
    <ReactPortal wrapperId='modal__root'>
      <div className={modalClass} onClick={onClose}>
        <div
          className={cn(s.modalContent, contentClassName)}
          onClick={event => event.stopPropagation()}
        >
          {closeButton ? (
            <div className={s.close} onClick={onClose}>
              <Icon variant='cross' size={15} className={s.icon} />
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </ReactPortal>
  )
}

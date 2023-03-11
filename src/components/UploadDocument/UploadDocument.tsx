import { FC, useEffect, useState } from 'react'
import { Modal } from 'components/Modal'
import Image from 'next/image'

import formatBytes from 'shared/helpers/formatBytes'
import { MAX_FILE_SIZE } from 'shared/constants/maxFileSize'

import Upload from '/public/assets/img/upload.svg'

import s from './UploadDocument.module.scss'
import { Icon } from 'components/Icon'

interface UploadDocumentProps {
  size?: number
  onLoad: (files: FileList) => void
  onClose: () => void
  isOpen: boolean
  value?: FileList
}

const UploadDocument: FC<UploadDocumentProps> = ({
  onLoad,
  onClose,
  size = MAX_FILE_SIZE,
  isOpen,
  value,
}) => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [titleSize, setTitleSize] = useState<string | null>(null)

  useEffect(() => {
    files && onLoad(files)
  }, [files])

  useEffect(() => {
    setTitleSize(formatBytes(25165824))
  }, [])

  return (
    <Modal
      closeButton={false}
      contentClassName={s.modal}
      onClose={onClose}
      isOpen={isOpen}
    >
      <p className={s.title}>Upload Documents</p>
      <label className={s.inputLabel}>
        <Image className={s.image} alt='' src={Upload} />
        <input
          size={size}
          onChange={event => setFiles(event.target.files)}
          multiple
          type='file'
        />
        <p>
          Drag file here or <span className={s.browse}>browse</span>
        </p>
        <span>max size {titleSize}</span>
      </label>
      {/* TODO add for customize cross, without changing <Modal/> styles */}
      <div className={s.close} onClick={onClose}>
        <Icon variant='cross' size={15} className={s.icon} />
      </div>
    </Modal>
  )
}

export default UploadDocument
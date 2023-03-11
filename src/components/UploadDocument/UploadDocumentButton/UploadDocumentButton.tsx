import { FC, useState } from 'react'

import { Button } from 'components/Button'
import UploadDocument from '../UploadDocument'

import s from './UploadDocumentButton.module.scss'
import { Icon } from 'components/Icon'

interface UploadDocumentButtonProps {
  onChange: (value: FileList) => void
  value?: FileList
}

const UploadDocumentButton: FC<UploadDocumentButtonProps> = ({
  onChange,
  value,
}) => {
  const [isOpenUploadModal, setIsOpenUploadModal] = useState<boolean>(false)
  const [documents, setDocuments] = useState<FileList>()

  const handleLoad = (files: FileList) => {
    onChange(files)
    setDocuments(files)
    setIsOpenUploadModal(false)
  }
  return (
    <>
      <Button
        onClick={() => setIsOpenUploadModal(prev => !prev)}
        className={s.button}
      >
        <Icon className={s.icon} size={20} variant='add' />
        <Icon className={s.icon} size={20} variant='doc' />
      </Button>
      <UploadDocument
        onLoad={handleLoad}
        isOpen={isOpenUploadModal}
        onClose={() => setIsOpenUploadModal(false)}
        value={value}
      />
      <div className={s.selected}>
        {documents && <p>Selected {documents.length}</p>}
      </div>
    </>
  )
}

export default UploadDocumentButton

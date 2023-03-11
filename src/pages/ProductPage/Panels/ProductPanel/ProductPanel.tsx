// @ts-nocheck
import { FC } from 'react'

import cn from 'classnames'
import s from './ProductPanel.module.scss'

import { Button, Icon, RoundButton, Title } from 'components'
import { GradeDetail, ProductDetail } from 'shared/types/products'

interface ListItemProps {
  label: string
  value?: string | number
  grey?: boolean
  className?: string
}

const ListItem: FC<ListItemProps> = ({ label, value, grey, className }) => (
  <li className={cn(s.infoItem, className)}>
    <Icon variant='info' active={!grey} />
    <span className={s.label}>
      {label}
      {':'}
    </span>
    <span className={s.value}>{value}</span>
  </li>
)

interface DescItemProps { // TODO isn't it Option?
  label: string
  value?: string
}

const DescItem: FC<DescItemProps> = ({ label, value }) => (
  <li className={s.descriptionItem}>
    <Title As='h5' className={s.title}>
      {label}
    </Title>
    <p className={s.value}>{value || 'Nothing to show'}</p>
  </li>
)

interface DocItemProps { // use shared TODO
  label: string
  href: string
}

const DocItem: FC<DocItemProps> = ({ label, href }) => (
  <li className={s.documentItem}>
    <a href={href} target='_blank' rel='noopener noreferrer' download>
      <span className={s.icon}>
        <Icon variant='pdf' />
      </span>{' '}
      {label}
    </a>
  </li>
)

interface RequestDocumentModalProps extends GradeDetail {
  handleRequestDocumentModal: () => void // todo more from props
}

export const ProductPanel: FC<RequestDocumentModalProps> = ({
  origin,
  producer,
  get_applications_str,
  mfr,
  vst,
  cas,
  hs_code,
  additional_info,
  documents,
  additional_specifications,
  handleRequestDocumentModal,
}) => {
  return (
    <div className={s.panelContainer}>
      <div className={s.panelContent}>
        <div className={s.infoWrapper}>
          <ul className={cn(s.infoList, s.wide)}>
            <ListItem
              label={`MFR (${mfr?.weight || '-'})`}
              value={mfr?.value || '-'}
            />
            <ListItem className={s.vstItem} label='VST' value={vst} />
            {additional_specifications.length
              ? additional_specifications.map((field, index) => (
                  <ListItem
                    key={index}
                    label={field.title}
                    value={field.value}
                  />
                ))
              : null}
          </ul>
          <ul className={s.infoList}>
            <ListItem label='CAS №' value={cas} grey />
            <ListItem label='HS CODE' value={hs_code} grey />
          </ul>
        </div>

        <div className={s.descriptionWrapper}>
          <ul className={s.descriptionList}>
            <DescItem label='Origin' value={origin} />
            <DescItem label='Producer' value={producer} />
            <DescItem label='Application' value={get_applications_str} />
            {additional_info.length
              ? additional_info.map((field, index) => (
                  <DescItem
                    key={index}
                    label={field.title}
                    value={field.value}
                  />
                ))
              : null}
          </ul>
        </div>
        <div className={s.descriptionWrapper}>
          <div>
            <Title As='h5' className={s.documentTitle}>
              Documents
            </Title>
            <ul className={s.documentList}>
              {documents.length
                ? documents.map((doc, index) => (
                    <DocItem key={index} label={doc.filename} href={doc.file} />
                  ))
                : null}
            </ul>
          </div>
        </div>
        <Button
          className={s.button}
          onClick={handleRequestDocumentModal}
          variant='outline'
        >
          Ask for Document
        </Button>
      </div>
    </div>
  )
}

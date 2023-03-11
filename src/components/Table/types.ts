import { ReactNode } from 'react'

export interface TableColumns {
  [key: string]: {
    title: string
    width?: string | number
    height?: string | number
    align?: CanvasTextAlign
  }
}

export interface TableRow {
  [key: string]: ReactNode
}

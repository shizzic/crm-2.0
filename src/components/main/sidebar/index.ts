export interface Components {
  top: SubComponent[]
  bottom: SubComponent[]
}

export interface SubComponent {
  component: any
  conf?: {
    [K: string]: any
  }
}

export interface SubComponentProps {
  identifier: number
  place: string
}

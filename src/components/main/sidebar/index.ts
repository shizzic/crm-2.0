export interface Components {
  top: SubComponent[]
  bottom: SubComponent[]
  add: (component: SubComponent, place: 'top' | 'bottom') => void
  getIdentifier: (__hmrId: string) => number
}

export interface SubComponent {
  component: any
  conf?: {
    [K: string]: any
  }
}

export interface SubComponentProps {
  identifier: number
  place: 'top' | 'bottom'
}

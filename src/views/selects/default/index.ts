import type { CSS, List, Deep } from '@types'
import { useSettingsStore } from '@stores'

export type Model = any
export interface Props {
  wrapper: {
    list: List
    deep?: Deep
    text?: string // текст "кнопки" aka placeholder для select
    description?: string // описание данных, которое выводится при раскрытии селекта (если не указано, берется text)
    flags?: string
  }

  // select attributes
  name?: string
  form?: string
  autofocus?: boolean
  required?: boolean
  multiple?: boolean
  disabled?: boolean

  // other
  label?: boolean
  labelText?: string
  css?: CSS
  active?: boolean
  arrow?: boolean
  hideClear?: boolean
}

export const DefaultCSS: CSS = {
  default: {
    zIndex: '1',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    minWidth: 'none',
    maxWidth: 'none',
    color: '#676767',
    fontFamily: 'Metropolis, sans-serif',
    fontWeight: '500',
    fontSize: '14rem',
    border: '2px solid',
    borderColor: '#C4C4C4',
    borderRadius: '20px',
    backgroundColor: '#ffffff',

    padding: '10rem 21rem'
  },

  hover: {
    backgroundColor: '#ffffff'
  },

  wrapper: {
    position: 'relative',
    backgroundColor: '#F9F9F9',

    Header: {
      description: {
        color: '#252540'
      },
      clear: {
        color: '#4D5DFA'
      }
    },
    List: {
      color: '#252540',
      maxHeight: '200rem'
    }
  }
}

export const defaultProps: Props = {
  wrapper: {
    list: undefined,
    deep: ['title'],
    text: useSettingsStore().lang?.other?.select,
    flags: 'imuy'
  },

  label: false,
  css: DefaultCSS,
  active: false,
  arrow: true,
  hideClear: false
}

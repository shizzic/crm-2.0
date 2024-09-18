import type { CSS, List } from '@types'
import { useSettingsStore } from '@stores'

export type SelectList = undefined | List[] | List
export interface Props {
  wrapper: {
    list: SelectList
    render?: string // ключ, на который нужно ссылаться для вывода текста li
    text?: string // текст "кнопки" aka placeholder для select
    description?: string // описание данных, которое выводится при раскрытии селекта (если не указано, берется text)
    // isVisible?: (...arg: any) => any
    isVisible?: any
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
  hideClear?: boolean
}

export const DefaultCSS: CSS = {
  default: {
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    color: '#676767',
    fontFamily: 'Metropolis, sans-serif',
    fontWeight: '500',
    fontSize: '13rem',
    border: '2px solid',
    borderColor: '#C4C4C4',
    borderRadius: '110px',
    backgroundColor: '#ffffff',

    padding: '7px 21px'
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
      maxHeight: '200px'
    }
  }
}

export const defaultProps: Props = {
  wrapper: {
    list: undefined,
    render: 'title',
    text: useSettingsStore().lang?.other?.select,
    description: useSettingsStore().lang?.other?.select,
    flags: 'imuy'
  },

  label: true,
  labelText: undefined,
  css: DefaultCSS,
  active: false,
  hideClear: false
}

import type { InjectionKey } from 'vue'
import type { Lang, Merge } from '@/assets/types'

export const Lang_provide: InjectionKey<Lang> = Symbol('lang')
export const Merge_provide: InjectionKey<Merge> = Symbol('$merge')

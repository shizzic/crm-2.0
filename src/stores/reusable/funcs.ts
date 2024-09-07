export const set = (state: any, data: Setter): boolean => {
  if (data.key in state) state[data.key] = data.value
  return data.key in state
}

export interface Setter {
  key: string
  value: any
}

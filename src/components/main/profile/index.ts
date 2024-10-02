export type User =
  | {
      // самое важное
      email: string
      phones: any

      // База
      avatar: string
      birth_place: string | undefined
      birthday: string | number | undefined

      // Локация
      country: Item | undefined
      region: Item | undefined
      city: Item | undefined

      // ФИО
      firstname: string
      surname: string
      patronymic: string

      // другое
      images: string[]
      male: boolean | null
      companies: Item[]

      // Определяю открыл ли пользователь свой профиль или чужой
      self: boolean
    }
  | undefined

export interface Item {
  id: number | string
  title: string
}

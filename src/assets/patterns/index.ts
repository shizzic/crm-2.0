// телефоны всех стран: international | national : без разницы
export const phone: string = String.raw`^(?<code>\+?\d{1,3})[\-\s]{0,}(?<number>\(?\d{3}\)?[\-\s]{0,}\d{3}[\-\s]{0,}\d{2}[\-\s]{0,}\d{2})$`

// без пробелов между и с указанной длинной
export const password: string = String.raw`^\S+$`

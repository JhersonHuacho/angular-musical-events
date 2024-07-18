export interface Genre {
  id: number,
  name: string,
  status: boolean
}

export const emptyGenre : Genre = {
  id: 0,
  name: '',
  status: false
}

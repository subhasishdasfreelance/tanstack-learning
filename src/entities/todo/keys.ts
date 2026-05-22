type TodoFilters = {
  status?: boolean
}

export const keys = {
  all: ['todos'] as const,

  lists: () => [...keys.all, 'list'] as const,
  list: (filters?: TodoFilters) => [...keys.all, 'list', filters ?? {}] as const,

  detail: (id: string) => [...keys.all, 'detail', id] as const,
}

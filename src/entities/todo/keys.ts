export const keys = {
  all: ['todos'] as const,

  lists: () => [...keys.all, 'list'] as const,

  detail: (id: string) =>
    [...keys.all, 'detail', id] as const,
}
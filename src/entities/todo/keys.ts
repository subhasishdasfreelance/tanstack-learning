export const keys = {
  all: ['todos'] as const,
  list: (filters?: any) => ['todos', 'list', filters] as const,
  detail: (id: string) => ['todos', 'detail', id] as const,
}

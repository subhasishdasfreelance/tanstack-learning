import DebouncedSearch from '#/sections/practice/DebouncedSearch'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/practice')({
  component: DebouncedSearch,
})

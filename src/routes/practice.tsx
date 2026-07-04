import FlattenTable from '#/sections/practice/FlattenTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/practice')({
  component: FlattenTable,
})

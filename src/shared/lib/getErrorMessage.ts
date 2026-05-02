export function getErrorMessage(err: unknown) {
  if (err instanceof Error) {
    try {
      const parsed = JSON.parse(err.message)
      return (parsed?.[0]?.message ?? err.message) as string
    } catch {
      return err.message
    }
  }
  return 'Something went wrong'
}

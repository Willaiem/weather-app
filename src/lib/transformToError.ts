import { AxiosError } from "axios"
import { z } from "zod"

export const transformToError = (err: unknown) => {
  if (err instanceof z.ZodError) {
    throw new Error(JSON.stringify(err.errors))
  }

  if (err instanceof AxiosError) {
    if (err.response) {
      return new Error(JSON.stringify(err.response.data))
    }
    return new Error(err.message)
  }

  if (err instanceof Error) {
    return err
  }

  if (typeof err === 'object') {
    return new Error(JSON.stringify(err))
  }

  if (typeof err === 'string') {
    return new Error(err)
  }

  return new Error(String(err))
}

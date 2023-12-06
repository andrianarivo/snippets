'use server'

import {db} from '@/db'
import {redirect} from 'next/navigation'

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code }
  })
  redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id }
  })
  redirect('/')
}

export interface CreateSnippetState {
  message: string
}

export async function createSnippet(formState: CreateSnippetState, formData: FormData): Promise<CreateSnippetState> {
  try {
    // check the user's inputs and make sure they're valid
    const title = formData.get('title')
    const code = formData.get('code')

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Please provide a title for your snippet'
      }
    }

    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Please provide some code for your snippet'
      }
    }

    // create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      }
    })
  } catch(err) {
    if(err instanceof Error) {
      return {
        message: err.message
      }
    } else {
      return {
        message: 'Something went wrong...'
      }
    }

  }

  // redirect the user back to the root route
  redirect('/')
}

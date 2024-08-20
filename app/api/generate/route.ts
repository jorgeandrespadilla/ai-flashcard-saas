import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { tryParseJSON } from '@/lib/utils'
import { FlashcardData } from '@/lib/types'

const SYSTEM_PROMPT = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

interface ChatResponse {
  flashcards: FlashcardData[]
}

const DEFAULT_CHAT_RESPONSE: ChatResponse = {
  flashcards: []
}

export async function POST(request: NextRequest) {
  const openai = new OpenAI()
  const data = await request.text()

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: data },
    ],
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
  })

  // Parse the JSON response from the OpenAI API
  const result: ChatResponse = tryParseJSON(completion.choices[0].message.content) ?? DEFAULT_CHAT_RESPONSE

  // Return the flashcards as a JSON response
  return NextResponse.json(result.flashcards)
}

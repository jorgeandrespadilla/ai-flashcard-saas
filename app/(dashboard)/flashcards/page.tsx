'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { db } from '@/firebase'
import { doc, getDoc, setDoc, collection } from 'firebase/firestore'
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material'
import { FlashcardCollection } from '@/lib/types'

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const [flashcards, setFlashcards] = useState<FlashcardCollection[]>([])

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      }
    }

    getFlashcards()
  }, [user])

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  const handleCardClick = (id: string) => {
    router.push(`/flashcard?id=${id}`)
  }

  return <Container style={{ maxWidth: '100vw' }}>
    <Grid container spacing={3} mt={4}>
      {flashcards.map((flashcard, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardActionArea
              onClick={() => {
                handleCardClick(flashcard.name)
              }}
            >
              <CardContent>
                <Typography variant='h6'>{flashcard.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>

}

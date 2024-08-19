import { Typography } from '@mui/material'
import { SignIn } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <>
      <Typography variant="h4">Sign In</Typography>
      <SignIn />
    </>
  )
}

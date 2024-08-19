import { Typography } from '@mui/material'
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <>
      <Typography variant="h4">Sign Up</Typography>
      <SignUp />
    </>
  )
}

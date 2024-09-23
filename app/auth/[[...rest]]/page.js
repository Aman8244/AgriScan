import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const AuthPage = () => {
  return (
    <main className='bg-[#ebede8]'>
        <header>
            <Navbar/>
        </header>
        <section>
            <div className='flex items-center justify-center py-6'>
                <div>
                    <SignIn signUpFallbackRedirectUrl='/predict' />
                </div>
            </div>
        </section>
        <Footer/>
    </main>
  )
}

export default AuthPage
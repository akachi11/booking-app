import { auth } from '@/auth'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {

    const session = await auth()

    if (!session) redirect("/sign-in")

    return (
        <main className='root-container'>
            <div className='lg:w-[80%] lg:mx-auto'>
                <Header />

                <div className='mt-20 pb-20'>{children}</div>
            </div>
        </main>
    )
}

export default Layout
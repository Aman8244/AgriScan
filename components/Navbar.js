"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import LanguagePicker from './LanguagePicker'
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { user } = useUser();
    const router = useRouter();
    const {t} = useTranslation();
    
    return (
        <div>
            <nav className='pt-2'>
                <div className='flex flex-row'>
                    <div className='w-[50%] md:w-[70%] flex  items-center px-8'>
                        <img src="/LOGO.png" alt="logo" width={24} />
                        <Link href={"/"} className='text-[#073127] pl-2 font-semibold text-xl font-[Montserrat]'>
                            {t("logo")}
                        </Link>
                    </div>
                    <div>
                        <LanguagePicker/>
                    </div>
                    <div className='mx-6 underline'>
                        <Link href={"/chat"}>Chat</Link>
                    </div>
                    <div className='w-[50%] md:w-[30%] flex flex-row items-center justify-center space-x-5 md:space-x-10'>
                        <div>
                            {user ?
                                <UserButton  />
                                : <button className='btn  h-2  bg-white text-[#004838] font-thin' onClick={()=>router.push("/auth")}>{t('log_in')}</button>}
                        </div>
                        <div>
                            <button className='btn h-2 bg-[#004838] text-[#e2fb6c] hover:bg-[#004838] font-thin' onClick={()=>router.push("/predict")}>{t("start_now")}</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
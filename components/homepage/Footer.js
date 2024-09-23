"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'next-i18next';

const Footer = () => {
    const {t} = useTranslation();
    const router = useRouter();
    
    return (
        <div className='min-h-[20vh] bg-[#073127] text-[#ebede8]'>
            <div className='flex flex-row'>
                <div className='text-[2rem] pl-20 py-10 md:w-[70%]'>
                    <div>
                        {t("discover_agriscan_capabilities")}
                    </div>
                    
                </div>
                <div className='flex items-center justify-center'>
                    <button className='btn h-2 bg-[#004838] text-[#e2fb6c] hover:bg-[#004838] font-thin' onClick={()=>router.push("/predict")}>{t("check_now")}</button>
                </div>
            </div>
        </div>
    )
}

export default Footer
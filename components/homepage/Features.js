"use client"
import React from 'react'
import BulletText from '../BulletText'
import DetailCard from './DetailCard'
import Footer from './Footer'
import { useTranslation } from 'next-i18next'

const Features = () => {
    const {t} = useTranslation();
    return (
        <div>
            <div className=''>
                <div className='mt-4 mb-4'>
                    <BulletText imgUrl={"https://img.icons8.com/fluency-systems-filled/50/grid.png"} text={t("features")} />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='font-bold text-[#073127]  md:text-[2rem]'>
                        {t("ai_powered_tool_to_safeguard_crops")}
                    </div>
                    <div className='md:w-[50%] text-[#073127] text-center p-4'>
                        {t("smart_simple_secure")}
                    </div>
                </div>
                <div>
                    <DetailCard title={t("accuracy")} imgUrl={"/accuracy-img.webp"} text={t("accuracy_description")}/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Features
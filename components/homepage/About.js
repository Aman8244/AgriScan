"use client"
import React from 'react'
import BulletText from '../BulletText'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'next-i18next'
const About = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className='min-h-[90vh]'>
      <div>
        <div>
          <BulletText imgUrl={"https://img.icons8.com/ios-glyphs/30/lightning-bolt--v1.png"} text={t("fast_prediction")} />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='font-bold text-[#073127]  md:text-[2rem]'>
            {t("smart_farming_healthier_crops")}
          </div>
          <div className='font-bold text-[#073127]  md:text-[2rem]'>
            {t("ai_driven_disease_detection")}
          </div>
          <div className='md:w-[50%] text-[#073127] text-center p-4'>
            {t("leverage_ai_technology")}
          </div>
          <div>
            <button className='btn h-2 bg-[#004838] text-[#e2fb6c] hover:bg-[#004838] font-thin' onClick={() => router.push("/predict")}>{t("start_now")}</button>
          </div>
        </div>
        <div className='text-[#073127] flex items-center justify-center font-semibold mt-[10%]'>
          <div>
            {t("more_than_10000_customers")}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
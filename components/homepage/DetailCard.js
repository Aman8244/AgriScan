import React from 'react'

const DetailCard = ({ title, text, imgUrl }) => {
    return (
        <div className=' bg-[#ebede8] w-[80%] mx-[10%] my-10 rounded-2xl border border-gray-200'>
            <div className=''>
                <div className='text-[#073127] flex flex-row'> 
                    <div className='p-8 w-[50%]'>
                        <div className='text-[2rem]  font-bold'>
                            {title}
                        </div>
                        <div className='my-10'>
                            {text}
                        </div>
                    </div>
                    <div className='w-[50%] flex justify-end pt-16'>
                        <img src={imgUrl}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCard
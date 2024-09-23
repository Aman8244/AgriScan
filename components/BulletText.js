import React from 'react'

const BulletText = (props) => {
    const {imgUrl,text} = props;

  return (
    <div className='p-4 flex items-center justify-center'>
        <div className='p-2 rounded-full border border-gray-200 text-sm flex flex-row space-x-2 bg-white text-[#004838]'>
            <img src={imgUrl} width={15} height={5}/>
            <p>
                {text}
            </p>
        </div>
    </div>
  )
}

export default BulletText
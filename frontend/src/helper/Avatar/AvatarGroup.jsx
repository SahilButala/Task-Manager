import React from 'react'

const AvatarGroup = ({
    avatar , maxVisible
}) => {
  return (
    <div className='flex items-center'  >
        {
            avatar?.slice(0 , maxVisible).map((avatar , index)=>(
                <img
                 src={avatar}
                 alt={avatar?.name}
                 key={index}
                 className='h-8 w-8 rounded-full border-2 border-white -ml-3 first:ml-0'
                />
            ))
        }
        {
            avatar.length > maxVisible && (
                <div className='w-12 h-12 flex items-center justify-center text-sm  font-medium rounded-full border-2  border-white -ml-3'>
                    + {avatar.length - maxVisible}
                </div>
            )
        }
    </div>
  )
}

export default AvatarGroup
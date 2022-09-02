import React, { useState, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill, BsFillChatLeftDotsFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { MdFavorite } from 'react-icons/md'

import { Video } from '../types'
import { verify } from 'crypto'
import LikeButton from './LikeButton'

interface IProps {
    post: Video
}

const VideoCard: NextPage<IProps> = ({post}) => {

    const [isHover, setIsHover] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [isVideoMuted, setIsVideoMuted] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)

    const onVideoPress = () => {
        if(playing) {
            videoRef?.current?.pause()
            setPlaying(false)
        } else {
            videoRef?.current?.play()
            setPlaying(true)
        }
    }

    useEffect(() => {
        if(videoRef?.current) {
            videoRef.current.muted = isVideoMuted
        }
    }, [isVideoMuted])


  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
        <div>
            <div className="flex gap-3 p-2 font-semibold rounded">
                <div className="md:w-16 md:h-16 w-10 h-10 cursor-pointer">
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <>
                            <Image
                                width={62}
                                height={62}
                                className='rounded-full'
                                src={post.postedBy.image}
                                alt='profile photo'
                                layout='responsive'
                            />
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div className='flex items-center gap-2'>
                            <p className='flex gap-2 cursor-pointer hover:underline items-center md:text-md font-bold text-primary'>
                                {post.postedBy.userName} {` `}
                                <GoVerified className='text-blue-400 text-md' />
                            </p>
                            <p className='capitalize font-medium cursor-pointer text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
                        </div>
                    </Link>
                    <p className='font-normal'>{post.caption}</p>
                    {/* <p className='font-normal'>{post.likes.length || 0}</p> */}
                </div>
            </div>
        </div>
        {/* Video  */}
        <div className="lg:ml-20 flex gap-4 relative">
            <div 
            className="rounded-3xl relative w-fit"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            >
                <Link href={`/detail/${post._id}`}>
                    <video 
                    src={post.video.asset.url}
                    ref={videoRef}
                    loop
                    className='lg:w-[284px] lg:h-[504px] h-[300px] md:h-[300px] md:w-[300px] w-[200px] rounded-2xl cursor-pointer bg-black'
                    >
                    </video>
                </Link>

                {isHover && (
                    <div className='absolute lg:w-full bottom-6 left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between p-3 cursor-pointer'>
                            {playing ? (
                                <button onClick={onVideoPress}>
                                    <BsFillPauseFill className='text-white text-xl lg:text-3xl'/>
                                </button>
                            ) : (
                                <button onClick={onVideoPress}>
                                    <BsFillPlayFill className='text-white text-xl lg:text-3xl'/>
                                </button>
                            )}
                            {isVideoMuted ? (
                                <button onClick={() => setIsVideoMuted(false)}>
                                    <HiVolumeOff className='text-white text-xl lg:text-3xl'/>
                                </button>
                            ) : (
                                <button onClick={() => setIsVideoMuted(true)}>
                                    <HiVolumeUp className='text-white text-xl lg:text-3xl'/>
                                </button>
                            )}
                    </div>
                )}
            </div>
            <div className="flex items-end mb-12">
                <div className="flex flex-col gap-2">
                    <div 
                    className='bg-primary rounded-full p-2 md:p-3 text-gray-800 cursor-pointer' 
                    onClick={() => {}}>
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                    <div 
                    className='bg-primary rounded-full p-2 md:p-3 text-gray-800 cursor-pointer' 
                    onClick={() => {}}>
                        <BsFillChatLeftDotsFill className='text-lg md:text-2xl' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoCard
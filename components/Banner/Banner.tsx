'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'

import Request, { type IResponse } from '@utils/Request'

const Banner = () => {
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBanners = async () => {
      const res: IResponse = await Request.getResponse({
        url: '/api/banner',
        method: 'GET',
      })

      if (res?.data?.results) {
        setImages(res.data.results)
      }

      setIsLoading(false)
    }

    fetchBanners()
  }, [])

  if (isLoading) {
    return (
      <div className="flex-banner">
        <div className="banner-image w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 w-full bg-gray-300 rounded-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Add shimmer keyframes */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .animate-[shimmer_1.5s_infinite] {
            animation: shimmer 1.5s infinite linear;
            background-size: 200% 100%;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="flex-banner">
      <div className="banner-image">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          style={{ height: '100%' }}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} style={{ height: '100%' }}>
              <img
                src={img}
                alt={`Banner ${i + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="banner-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
    </div>
  )
}

export default Banner

import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper"
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success && Array.isArray(data?.data)) {
          setReviews(data.data)
        } else {
          setError("Failed to load reviews")
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
        setError("Something went wrong while fetching reviews")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const getTruncatedReview = (text) => {
    if (!text || typeof text !== "string") return ""
    const words = text.split(" ")
    if (words.length <= truncateWords) return text
    return words.slice(0, truncateWords).join(" ") + " ..."
  }

  const safeRating = (rating) => {
    const num = Number(rating)
    if (Number.isNaN(num)) return 0
    return num
  }

  if (loading) {
    return (
      <div className="text-white my-10 flex justify-center">
        <p className="text-richblack-200 text-sm">Loading reviews...</p>
      </div>
    )
  }

  if (error || reviews.length === 0) {
    return (
      <div className="text-white my-10 flex justify-center">
        <p className="text-richblack-200 text-sm">
          {error || "No reviews available right now."}
        </p>
      </div>
    )
  }

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          loop={true}
          freeMode={true}
          spaceBetween={25}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            const ratingValue = safeRating(review?.rating)
            const reviewText = getTruncatedReview(review?.review)
            const firstName = review?.user?.firstName || ""
            const lastName = review?.user?.lastName || ""
            const fullName = `${firstName} ${lastName}`.trim()

            return (
              <SwiperSlide key={review?._id || i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 rounded-md">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review.user.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
                      }
                      alt={fullName || "User"}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">
                        {fullName || "Anonymous User"}
                      </h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName || "Course"}
                      </h2>
                    </div>
                  </div>
                  {reviewText && (
                    <p className="font-medium text-richblack-25">
                      {reviewText}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {ratingValue.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={ratingValue}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider

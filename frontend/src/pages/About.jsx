import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>PLUM is a premium online confectionery store that brings the nostalgic charm of traditional sweets and the allure of modern treats right to your doorstep. Specializing in an exquisite range of handcrafted chocolates, vibrant candies, artisanal fudge, soft nougats, and rich caramel delights, PLUM curates a sweet experience for all ages and tastes. Each product is carefully selected and made with high-quality ingredients, ensuring every bite is a moment of indulgence. Whether it’s a festive gift box, a midweek pick-me-up, or a treat for someone special, PLUM transforms ordinary moments into celebrations. The platform features an intuitive interface, detailed product descriptions, and vivid imagery that makes online sweet shopping as delightful as visiting your favorite candy store.</p>
              <p>Since our inception, we've worked tirelessly to curate a diverse selection of premium confections that cater to every sweet tooth and craving. From rich chocolates and traditional mithai to fruity candies and indulgent fudges, we offer an extensive collection sourced from trusted artisans and renowned sweetmakers.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Our mission at PLUM is to delight customers with choice, convenience, and confidence. We’re dedicated to providing a seamless sweet-shopping experience that exceeds expectations — from exploring our carefully curated treats to placing orders and enjoying prompt, reliable delivery right to your doorstep.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About

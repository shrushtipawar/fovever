import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p> Welcome to our platform — where innovation meets reliability. We are passionate about delivering quality products and exceptional service that exceed customer expectations. With a strong foundation built on trust and transparency, we aim to bring a fresh perspective to every interaction.</p>


        <p> Our team is committed to ensuring that every experience with us is positive, efficient, and tailored to your unique needs.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to empower individuals and businesses by offering seamless solutions that simplify everyday challenges. We believe in using technology and creativity to drive change, improve lives, and make meaningful connections. Everything we do is guided by our values — quality, commitment, and customer satisfaction.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We maintain the highest standards in all our products and services. Every item is carefully inspected and tested to ensure it meets strict quality guidelines. Our dedication to excellence means you can always trust what you receive from us.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'> Our user-friendly platform and streamlined processes are designed to save you time and effort. From browsing to checkout, everything is optimized for your convenience — because we value your time as much as you do.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Your satisfaction is our top priority. Our support team is always ready to assist you with any queries or concerns, providing fast, friendly, and effective help whenever you need it.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About

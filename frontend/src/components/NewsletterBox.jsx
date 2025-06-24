import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // const email = event.target.email.value;
        // console.log(email);
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & 20% off</p>
        <p className='text-gray-400 mt-3'>Join our newsletter for the latest updates

        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required />
            <button type='submit' className='bg-black text-white px-10 py-4 text-xs '>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsletterBox


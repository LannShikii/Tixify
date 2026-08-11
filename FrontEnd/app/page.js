import Link from 'next/link'
import Navbar from './components/navbar'
import AdCarousel from './components/AdCarousel'

export default function Page() {
  return (
    <div className="sora bg-white p-5">
      <Navbar/>
      <main className=" mx-screen my-20">
        <AdCarousel />
        <div className="  px-20 pb-10 pt-10 my-20 mx-5 bg-[#0f0f0f] rounded-3xl">
          <h1 className='text-white text-3xl font-semibold text-center'>Event Terbaru</h1>
          <ul className='grid grid-cols-3 mx-auto my-10 text-center justify-center align-center items-center'> 
            
            {/* Card */}
            <li className='bg-white h-auto pb-5 w-72 mx-10 rounded-xl text-black'> 
            <img className='w-full h-full mb-5 rounded-xl hover:scale-110 trantition-all duration-300 ease-in-out' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMCOUlWo14XA4YHyQXO0fWXojhdBPJ_R0wo8ZQwasWfw&s=10'></img>
            <h1 className='text-black text-xl font-semibold'> Laufey Concert 2026</h1>
            <p className='text-black texxl-2 font-semibold'> 25 - 27 Oktober 2026</p>
            <br></br>
            <p className='text-black text-2 font-semibold'> Regular : Rp. 350.000 </p>
            <p className='text-black text-2 font-semibold'> VIP : Rp. 1.500.000 </p>
            <p className='text-black text-2 font-semibold'> VVIP : 2.500.000</p>
            <br/>
            <button className='bg-black text-white font-semibold w-50 h-10 rounded-[5px] hover:scale-110 hover:bg-white hover:text-black border-2 border-black trantition-all duration-300 ease-in-out'>Beli Tiket</button>
            </li>

            {/* Card */}
            <li className='bg-white h-auto pb-5 w-72 mx-10 rounded-xl text-black'> 
            <img className='w-full h-full mb-5 rounded-xl hover:scale-110 trantition-all duration-300 ease-in-out' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMCOUlWo14XA4YHyQXO0fWXojhdBPJ_R0wo8ZQwasWfw&s=10'></img>
            <h1 className='text-black text-xl font-semibold'> Laufey Concert 2026</h1>
            <p className='text-black texxl-2 font-semibold'> 25 - 27 Oktober 2026</p>
            <br></br>
            <p className='text-black text-2 font-semibold'> Regular : Rp. 350.000 </p>
            <p className='text-black text-2 font-semibold'> VIP : Rp. 1.500.000 </p>
            <p className='text-black text-2 font-semibold'> VVIP : 2.500.000</p>
            <br/>
            <button className='bg-black text-white font-semibold w-50 h-10 rounded-[5px] hover:scale-110 hover:bg-white hover:text-black border-2 border-black trantition-all duration-300 ease-in-out'>Beli Tiket</button>
            </li>
            
            {/* Card */}
            <li className='bg-white h-auto pb-5 w-72 mx-10 rounded-xl text-black'> 
            <img className='w-full h-full mb-5 rounded-xl hover:scale-110 trantition-all duration-300 ease-in-out' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMCOUlWo14XA4YHyQXO0fWXojhdBPJ_R0wo8ZQwasWfw&s=10'></img>
            <h1 className='text-black text-xl font-semibold'> Laufey Concert 2026</h1>
            <p className='text-black texxl-2 font-semibold'> 25 - 27 Oktober 2026</p>
            <br></br>
            <p className='text-black text-2 font-semibold'> Regular : Rp. 350.000 </p>
            <p className='text-black text-2 font-semibold'> VIP : Rp. 1.500.000 </p>
            <p className='text-black text-2 font-semibold'> VVIP : 2.500.000</p>
            <br/>
            <button className='bg-black text-white font-semibold w-50 h-10 rounded-[5px] hover:scale-110 hover:bg-white hover:text-black border-2 border-black trantition-all duration-300 ease-in-out'>Beli Tiket</button>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
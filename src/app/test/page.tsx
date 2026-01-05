// import React from 'react'

// export default function TestUiPage() {
//     return (
//         <div className="w-[1280px] h-[774px] relative bg-white overflow-hidden">
//             <div className="w-20 h-20 left-[923px] top-[19px] absolute bg-blue-600 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden">
//                 <img className="w-11 h-12 left-[18px] top-[16px] absolute" src="https://placehold.co/46x49" />
//             </div>
//             <div className="w-[566px] h-[512px] left-[672px] top-[242px] absolute bg-white rounded-2xl shadow-[0px_0px_4px_2px_rgba(0,0,0,0.10)] overflow-hidden">
//                 <div className="w-[483px] h-16 left-[41px] top-[162px] absolute bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-300 overflow-hidden">
//                     <div className="w-[452px] h-5 px-6 left-[16px] top-[20px] absolute inline-flex justify-center items-center gap-2.5 overflow-hidden">
//                         <div className="w-36 h-5 left-[39px] top-0 absolute justify-center text-zinc-500 text-base font-normal font-['Sans_Serif_Collection']">your@email.com </div>
//                         <div className="w-6 h-5 left-0 top-0 absolute overflow-hidden">
//                             <div className="w-6 h-6 left-0 top-[-1px] absolute overflow-hidden">
//                                 <div className="w-6 h-5 left-0 top-[1px] absolute bg-zinc-500" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-[483px] h-16 left-[41px] top-[284px] absolute bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-300 overflow-hidden">
//                     <div className="w-[452px] h-6 px-6 left-[16px] top-[18px] absolute inline-flex justify-center items-center gap-2.5 overflow-hidden">
//                         <div className="w-36 h-6 left-[39px] top-0 absolute justify-center text-zinc-500 text-base font-normal font-['Sans_Serif_Collection']">your Password </div>
//                         <div className="w-6 h-6 left-0 top-0 absolute overflow-hidden">
//                             <div className="w-6 h-6 left-0 top-0 absolute overflow-hidden">
//                                 <div className="w-5 h-6 left-[1px] top-0 absolute bg-zinc-500" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-[483px] h-16 left-[41px] top-[410px] absolute bg-blue-600 rounded-xl overflow-hidden">
//                     <div className="w-[483px] h-5 px-8 left-0 top-[23px] absolute inline-flex justify-center items-center gap-2.5 overflow-hidden">
//                         <div className="w-14 h-5 left-[213px] top-0 absolute justify-center text-white text-xl font-normal font-['Sans_Serif_Collection']">Sign In</div>
//                     </div>
//                 </div>
//                 <div className="left-[41px] top-[235px] absolute justify-start text-stone-900 text-xl font-normal font-['Sans_Serif_Collection']">Password</div>
//                 <div className="w-[483px] h-4 left-[41px] top-[370px] absolute overflow-hidden">
//                     <div className="w-28 h-4 left-[366px] top-0 absolute justify-center text-blue-600 text-sm font-normal font-['Sans_Serif_Collection']">Forgot  password?</div>
//                 </div>
//                 <div className="w-[483px] left-[41px] top-[40px] absolute inline-flex justify-center items-center gap-2.5 overflow-hidden">
//                     <div className="w-60 h-12 relative bg-blue-600 rounded-xl overflow-hidden">
//                         <div className="w-60 h-5 px-8 left-0 top-[16px] absolute inline-flex justify-center items-center gap-2.5 overflow-hidden">
//                             <div className="w-14 h-5 left-[89px] top-0 absolute justify-center text-white text-xl font-normal font-['Sans_Serif_Collection']">Sign In</div>
//                         </div>
//                     </div>
//                     <div className="w-60 h-12 relative bg-gray-100 rounded-xl overflow-hidden">
//                         <div className="w-60 h-5 px-8 left-0 top-[16px] absolute inline-flex justify-center items-center gap-2.5 overflow-hidden">
//                             <div className="w-16 h-5 left-[85px] top-0 absolute justify-center text-neutral-600 text-xl font-normal font-['Sans_Serif_Collection']">Sign Up</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-[483px] h-5 px-8 left-[41px] top-[126px] absolute inline-flex justify-start items-center gap-2.5 overflow-hidden">
//                     <div className="w-12 h-5 left-0 top-0 absolute justify-center text-stone-900 text-xl font-normal font-['Sans_Serif_Collection']">Email</div>
//                 </div>
//             </div>
//             <div className="left-[898px] top-[162px] absolute justify-start text-gray-600 text-xl font-normal font-['Sans_Serif_Collection']">Welcome back</div>
//             <div className="left-[893px] top-[93px] absolute justify-start text-stone-900 text-4xl font-normal font-['Sans_Serif_Collection']">Inventa</div>
//             <div className="w-[630px] h-[774px] left-0 top-0 absolute bg-blue-600" />
//             <div className="w-48 h-60 left-[65px] top-[162px] absolute bg-rose-500 rounded-2xl" />
//             <div className="w-20 h-40 left-[323.01px] top-[215px] absolute origin-top-left rotate-[20deg] bg-emerald-300 rounded-2xl" />
//             <div className="w-0 h-40 left-[218px] top-[385px] absolute origin-top-left -rotate-90 bg-fuchsia-500 rounded-2xl" />
//         </div>
//     )
// }


import React from 'react';

export default function TestUiPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Decorative Background */}
      <div className="relative w-full lg:w-1/2 bg-blue-600 flex items-center justify-center overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-60 bg-rose-500 rounded-2xl shadow-2xl" />
          <div className="absolute w-52 h-44 bg-emerald-300 rounded-2xl rotate-12 shadow-2xl translate-x-32 -translate-y-20" />
          <div className="absolute w-44 h-52 bg-fuchsia-500 rounded-2xl -rotate-90 shadow-2xl -translate-x-24 translate-y-32" />
        </div>

        {/* Optional: bisa tambah teks/tagline di kiri kalau mau */}
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg mb-6">
              <div className="w-11 h-12 bg-gray-200 border-2 border-dashed rounded border-gray-400" />
              {/* Ganti dengan logo asli nanti */}
            </div>
            <h1 className="text-4xl font-normal text-stone-900">Inventa</h1>
            <p className="mt-4 text-xl text-gray-600">Welcome back</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-10">
              <button className="px-12 py-3 bg-blue-600 text-white text-xl font-medium rounded-xl hover:bg-blue-700 transition">
                Sign In
              </button>
              <button className="px-12 py-3 bg-gray-100 text-gray-600 text-xl font-medium rounded-xl hover:bg-gray-200 transition">
                Sign Up
              </button>
            </div>

            {/* Form */}
            {/* <form className="space-y-6">
              <div>
                <label className="block text-xl text-stone-900 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 text-base text-gray-600 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xl text-stone-900 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="your Password"
                  className="w-full px-6 py-4 text-base text-gray-600 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 transition"
                />
                <div className="mt-3 text-right">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white text-xl font-medium rounded-xl hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}
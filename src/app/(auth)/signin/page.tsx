import SignInForm from "@/features/auth/SignInForm";

export default function SignInPage() {
    return (
        <div className="min-h-screen  flex flex-col items-center justify-center px-4 ">
            {/* Logo & Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-4">
                    <div className="w-11 h-12 bg-gray-200 border-2 border-dashed border-gray-400 rounded" />
                    {/* Ganti dengan logo asli nanti, ini placeholder */}
                </div>
                <h1 className="text-4xl font-normal text-stone-900">Inventa</h1>
                <p className="mt-4 text-xl text-gray-600">Welcome back</p>
            </div>

            {/* Card */}
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 md:p-10">
                {/* Tab Sign In / Sign Up */}
                <div className="flex justify-center gap-4 mb-10">
                    <button className="px-12 py-3 bg-blue-600 text-white text-xl rounded-xl hover:bg-blue-700 transition">
                        Sign In
                    </button>
                    <button className="px-12 py-3 bg-gray-100 text-gray-600 text-xl rounded-xl hover:bg-gray-200 transition">
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <SignInForm />
            </div>
        </div>
    );
}
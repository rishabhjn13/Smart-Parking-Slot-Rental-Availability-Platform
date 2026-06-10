import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
    const h1Ref = useRef<HTMLHeadingElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!h1Ref.current) return
            const rect = h1Ref.current.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            h1Ref.current.style.textShadow = `${x / 50}px ${y / 50}px 0px rgba(0, 108, 73, 0.2)`
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="bg-background text-on-background min-h-screen flex flex-col">

            {/* Top Nav */}
            <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
                <div className="flex justify-between items-center px-6 py-4 w-full max-w-[1280px] mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="font-headline text-[32px] font-bold text-primary">ParkFlow</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-6 mr-6">
                            <Link
                                to="/search"
                                className="text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-low px-3 py-2 rounded-lg font-medium"
                            >
                                Map Explorer
                            </Link>
                            <Link
                                to="/dashboard/user/bookings"
                                className="text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-low px-3 py-2 rounded-lg font-medium"
                            >
                                My Bookings
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full transition-colors duration-200 hover:bg-surface-container-low">
                                <span className="material-symbols-outlined text-primary">notifications</span>
                            </button>
                            <button className="p-2 rounded-full transition-colors duration-200 hover:bg-surface-container-low">
                                <span className="material-symbols-outlined text-primary">help</span>
                            </button>
                            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden ml-2 border border-outline-variant">
                                <img
                                    alt="User profile"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnp5BXMdTTMt1FgJw-ktpPp7eObRt3GSD4lU5fuY6zNVDi2oy8pGc5Q6s87HayCzEKUO22GOBtWNOg_7ASlPF-NnGv8gdXtiQr4VGc-9_wuOw1-jEWkB9qIuq8bJyfRX5_7008t4-lfF8BvGm_IWXQBzvvgVaezCfZHVQPMn4-45V3B89ii-mNkbrL6vZX4gImnRCymkbJUopKnLlYhIxVP76iULKLvKMCYOtK6l5VjDoJ_o-EwjYNqo2FO9OO-XzKiISx-L_Rda0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-surface-container-highest rounded-full blur-3xl opacity-50 -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-fixed rounded-full blur-3xl opacity-30 -z-10"></div>

                <div className="max-w-3xl w-full text-center space-y-12">

                    {/* Floating illustration */}
                    <div className="relative inline-block animate-float">
                        <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-3xl overflow-hidden shadow-xl border border-outline-variant bg-white p-4">
                            <img
                                className="w-full h-full object-cover rounded-2xl"
                                alt="Empty parking space with a traffic cone"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-pvaZkXZwrJ7gKs5JIyC6ONsaO_YrZuqes-K5ub5UoSkOMVOz9WNgo5a6x8Vk2k7BDPbEmxf2-x7lvO9YClo2_hF4HhnTaYDjjalxkbVfuxuqgsRKUCwmxmhsv8ky_MoyXje6zHCGZLJKCucSaMDgjYDR0dIQ1UkBCky5gj0lSvAS92G-zRz0GPrzULy9q6z6g1syLLOAMy8dVraL7sVaeCk6x15iSFa-CIg0LdIGMqZAaXGYY2RJ1nrwAeXftoa8ZfyoqBoa1PI"
                            />
                        </div>
                        {/* Floating pin badge */}
                        <div className="absolute -top-4 -right-4 bg-secondary text-on-secondary w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <span className="material-symbols-outlined text-4xl">location_off</span>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-4">
                        <h1
                            ref={h1Ref}
                            className="text-primary font-headline text-5xl md:text-7xl font-bold tracking-tight"
                        >
                            404
                        </h1>
                        <h2 className="text-on-surface font-headline text-xl md:text-2xl font-semibold">
                            Looks like you've parked in the wrong zone.
                        </h2>
                        <p className="text-on-surface-variant max-w-lg mx-auto text-base md:text-lg leading-relaxed">
                            The page you are looking for doesn't exist or has been moved to another location.
                            Let's get you back on track to finding your perfect spot.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="group flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-primary-container hover:shadow-lg active:scale-95"
                        >
                            <span className="material-symbols-outlined">home</span>
                            Return to Dashboard
                        </Link>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 bg-white border border-outline-variant text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-surface-container-low hover:border-primary active:scale-95"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            Go Back
                        </button>
                    </div>

                    {/* Help links */}
                    <div className="pt-8 border-t border-outline-variant">
                        <p className="text-sm text-on-surface-variant font-medium mb-4">Common destinations:</p>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                            <Link to="/search" className="text-primary hover:underline font-medium text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">map</span> Map Explorer
                            </Link>
                            <Link to="/dashboard/user/bookings" className="text-primary hover:underline font-medium text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">receipt_long</span> My Bookings
                            </Link>
                            <a href="#" className="text-primary hover:underline font-medium text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">contact_support</span> Contact Support
                            </a>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-10 bg-surface-bright border-t border-outline-variant">
                <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-[1280px] mx-auto gap-6">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="font-headline text-xl font-bold text-primary">ParkFlow</span>
                        <p className="text-on-surface-variant text-sm">© 2024 ParkFlow Infrastructure. All rights reserved.</p>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="text-on-surface-variant hover:text-primary transition-opacity duration-150 text-sm">Privacy Policy</a>
                        <a href="#" className="text-on-surface-variant hover:text-primary transition-opacity duration-150 text-sm">Terms of Service</a>
                        <a href="#" className="text-on-surface-variant hover:text-primary transition-opacity duration-150 text-sm">Contact Support</a>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default NotFoundPage
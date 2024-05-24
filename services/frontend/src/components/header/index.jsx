import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import { FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    const handleSignOut = () => {
        doSignOut().then(() => {
            navigate('/login')
        })
    }

    return (
        <nav className="flex flex-row justify-between w-full z-20 fixed top-0 left-0 h-14 border-b shadow-md bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 items-center">
            <div className="text-lg font-bold tracking-wide">tweetDev</div>
            <div className="flex flex-row gap-x-4">
                {userLoggedIn ? (
                    <>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-x-2 text-sm hover:text-red-500 transition"
                        >
                            <FiLogOut /> Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            className="flex items-center gap-x-2 text-sm hover:text-blue-300 transition"
                            to={'/login'}
                        >
                            <FiLogIn /> Connexion
                        </Link>
                        <Link
                            className="flex items-center gap-x-2 text-sm hover:text-blue-300 transition"
                            to={'/register'}
                        >
                            <FiUserPlus /> Créer un compte
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Header

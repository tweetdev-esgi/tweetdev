import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import { motion } from 'framer-motion'

const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!isRegistering) {
            if (password !== confirmPassword) {
                setErrorMessage("Les mots de passe ne correspondent pas")
                return
            }

            setIsRegistering(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password)
                navigate('/home') // Redirection après l'inscription réussie
            } catch (error) {
                setErrorMessage("Échec de l'inscription. Veuillez réessayer.")
                setIsRegistering(false)
            }
        }
    }

    return (
        <>
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <main className="w-full h-screen flex justify-center items-center bg-gray-100 from-gray-700 to-gray-900 text-white">
                <motion.div
                    className="w-96 text-gray-600 space-y-5 p-6 shadow-xl border rounded-xl bg-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold sm:text-2xl">Créer un nouveau compte</h2>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-indigo-600 transition"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold">Mot de passe</label>
                            <input
                                type="password"
                                required
                                disabled={isRegistering}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-indigo-600 transition"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold">Confirmer le mot de passe</label>
                            <input
                                type="password"
                                required
                                disabled={isRegistering}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-indigo-600 transition"
                            />
                        </div>

                        {errorMessage && (
                            <div className="text-red-600 font-bold">{errorMessage}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 transition'}`}
                        >
                            {isRegistering ? 'Inscription en cours...' : 'Inscription'}
                        </button>

                        <div className="text-sm text-center">
                            Vous avez déjà un compte?
                            <Link to="/login" className="font-bold text-indigo-600 hover:underline">Connectez-vous</Link>
                        </div>
                    </form>
                </motion.div>
            </main>
        </>
    )
}

export default Register

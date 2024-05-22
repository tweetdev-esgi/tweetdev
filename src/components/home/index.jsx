import React from 'react'
import { useAuth } from '../../contexts/authContext'
import { FiSmile } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Home = () => {
    const { currentUser } = useAuth()

    const welcomeMessage = currentUser.displayName
        ? `Salut ${currentUser.displayName}`
        : `Salut ${currentUser.email}`

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-gray-300 from-gray-700 to-gray-900 text-white"
        >
            <motion.div
                className="text-3xl font-extrabold flex items-center gap-x-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FiSmile />
                {welcomeMessage}, tu es maintenant connecté!
            </motion.div>
            <motion.div
                className="text-lg mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ durée: 0.5, délai: 0.5 }}
            >
                Bienvenue sur... rien pour le moment... mais c'est cool non?
            </motion.div>
        </div>
    )
}

export default Home

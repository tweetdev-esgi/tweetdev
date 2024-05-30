// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { clearSession } from '../services/sessionService';

// function Logout() {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const logoutUser = async () => {
//             try {
//                        await fetch('/api/logout', {
//                     method: 'POST', 
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });

            
//                 clearSession()
//                 navigate('/login');
//             } catch (error) {
//                 console.error('Logout failed:', error);
//               navigate('/login');
//             }
//         };

//         logoutUser();
//     }, [navigate]); 

 
//     return null; 
// }

// export default Logout;

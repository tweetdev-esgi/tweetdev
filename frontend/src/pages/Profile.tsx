import React, { useEffect, useState } from 'react';
import { fetchSelfInfo} from '../api/user';
import { getSession } from '../services/sessionService';
import {convertTimestampToMonthYear} from '../utils/utils';
import '../styles/Profile.css';

function Profile() {
    const [selfInfo, setSelfInfo] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const sessionToken = getSession();
            
            if (sessionToken) {
              const tokenData = await fetchSelfInfo(sessionToken);
              setSelfInfo(tokenData);
            } else {
              console.error("Token de session null.");
            }
          } catch (error) {
            console.error("Error fetching self info:", error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        console.log(selfInfo);
      }, [selfInfo]);
    return (
        <div>
            {!selfInfo && ( <>Loading...</>)}
            
            {selfInfo && (
                <>
                <div className='profile-card'>
                <h2>{selfInfo.username}</h2>
                <p> {selfInfo.aboutMe}</p>
                <p>Joined {convertTimestampToMonthYear(selfInfo.joinDate)}</p>
                <p>{selfInfo.follow.length} followers</p>
                </div>
                </>
            )}

        </div>
    );
}

export default Profile;
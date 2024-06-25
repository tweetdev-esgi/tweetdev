import React from 'react';
import "../styles/TweetDev.css"
function TweetDev2(props) {
    return (
        <div className='bg-[#1c212e] border-2 border-customGray rounded-xl p-4'>
           
            <div className="flex gap-3 mb-3 ">
                  <div
                    className="cursor-pointer bg-green-700 w-10 h-10 rounded-lg"
                  ></div>
                  <div className="flex flex-col">
                    <div className="text-sm font-normal leading-normal ">NFTs</div>
                    <div className='inline mt-[-5px]'><span className=" text-[13px] font-normal leading-normal">Paschyz</span>
                    <span className='text-[13px] font-normal text-gray-400'>  21m</span></div>
                  </div>
                  <div className='cursor-pointer ml-auto'>⋯</div>
                </div>
                <p className='text-xs text-[#C7C9CE] leading-relaxed mb-0'>Over eighteen months, I played a pivotal role in redesigning and enhancing a social network's web application. As the company's first designer, I established a design-centric approach, collaborating closely with the founders and development team. This endeavor involved a ground-up redesign of the web application and a comprehensive revamp of the brand's visual identity. I introduced user-friendly features tailored for a non-tech-savvy audience in the web3 environment— the project culminated in developing a robust design system, solidifying the platform's visual consistency.</p>
        </div>

    );
}

export default TweetDev2;
import React, { useState } from 'react';

import "../styles/TweetDev.css"
function TweetDev() {
        const [input, setInput] = useState('');
        
        const [output, setOutput] = useState('');

        const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setInput(event.target.value);
        };

        const run = () => {
            setOutput("run");
        }
    return (
        <div className="tweetDev-container">
            <div className='up'>
                <div className='author'>paschyz</div>
                <div className='title'>Reverse a string</div>
            </div>
            <div className='code'>
                <pre> # Get all characters relying on default offsets 
                    letters[::] 
                    letters[:] 
                    # Get every other character from 0 to the end 
                    letters[::2] 
                    # Get every other character from 1 to the end 
                    letters[1::2]'abcd'</pre>
            </div>
            <div className='details'>
                <div className='engagement'>

                    <div className='likes'>Likes</div>
                    <div className='comments'>Comments</div>
                </div>
                <div className='langages'>
                    <div className='Python'>Python</div>
                    <div className='Python'>Python</div>
                    <div className='Python'>Python</div>
                </div>
             
            </div>
            <div className='down'>
                    <div className='input'>
                    <textarea 
                        value={input}
                        onChange={handleChange} id="input" name="input" rows={5} cols={50} placeholder='Enter input here'>

</textarea>
                    </div>
                    <div className='run'><button onClick={()=>run()} className='run-button'>RUN</button></div>
                    <div className='result'>
                    
                    <textarea 
                        value={output} readOnly id="result" name="result" rows={5} cols={50} placeholder='Result'>
</textarea></div>
                </div>
        </div>
    );
}

export default TweetDev;
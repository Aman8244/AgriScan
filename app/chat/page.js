"use client";
import Navbar from '@/components/Navbar';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);
    const router = useRouter();
    const {user} = useUser();
    useEffect(() => {
        if (!user) {
            router.push("/auth")
        }
    }, [])
    const handleSend = async () => {
        if (input.trim() === '') return;

        setMessages([...messages, { text: input, type: 'user' }]);
        const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAFG4260b1xJfLGZGnidb8ii2sW33DrCik", {
            contents: [
                {
                    parts: [
                        {
                            text: `Respond to the farmer Query : ${input} as an chat bot of crop disease prediction web application`
                        },
                        {
                            text: `No annotation, just Simple Text Response`
                        }
                    ]
                }
            ]
        })



        setTimeout(() => {
            setMessages([...messages, { text: input, type: 'user' }, { text: response.data.candidates[0].content.parts[0].text, type: 'ai' }]);
        }, 1000);
        setInput('');
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <main className='bg-[#ebebe8] min-h-[100vh]'>
            <header>
                <Navbar />
            </header>
            <section>
                <div className='flex flex-col min-h-[90vh]'>
                    <div className='flex-1 overflow-auto p-4'>
                        <div className='space-y-4'>
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-[#1c5b4c] text-white' : 'bg-white text-black'}`}>
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='flex flex-row justify-center space-x-3 items-end'>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type here"
                                className="input input-bordered input-accent w-full max-w-[80%]"
                            />
                            <button
                                onClick={handleSend}
                                className='btn hover:bg-[#1c5b4c] bg-[#073127] text-[#e2fb6c]'
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ChatBot;

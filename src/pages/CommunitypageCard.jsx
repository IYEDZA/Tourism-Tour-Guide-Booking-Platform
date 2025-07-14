import React from 'react';
import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
const textColors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-info",
  "text-success",
  "text-warning",
  "text-error",
];

const CommunitypageCard = ({ Card }) => {

    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % textColors.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="">
                {/* <motion.h1
                    className={`text-4xl font-bold text-center mb-12 transition-colors duration-500 ${textColors[colorIndex]}`}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    🧳 Travel Stories from the TourZone Community
                </motion.h1> */}

                <div className="grid grid-cols-1 gap-10">
                    {Card?.stories?.map((story, index) => (
                        <motion.div
                            key={story.id}
                            className="bg-base-100 shadow-2xl p-5 rounded-xl border-2 border-transparent relative group"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            {/* 💫 Glow border effect on hover */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-accent to-info blur-md opacity-0 group-hover:opacity-40 transition duration-500 z-0"></div>

                            <div className="relative z-10">
                                <div className="overflow-hidden rounded-xl mb-4 border-4 border-info transition-all duration-500 group-hover:scale-105 group-hover:border-accent shadow-md ">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110 "
                                    />
                                </div>
                                <div className="card-body space-y-2">
                                    <h2 className={`card-title font-semibold text-lg ${textColors[colorIndex]}`}>
                                        {story.title}
                                    </h2>
                                    <p className="text-gray-600">{story.description}</p>
                                    <p className="text-sm text-gray-400">— {Card.name}</p>
                                    <div className="mt-4 flex gap-2 items-center">
                                        <FacebookShareButton
                                            url={window.location.href}
                                            quote={story.title}
                                        >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={window.location.href}
                                            title={story.title}
                                        >
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                        <WhatsappShareButton
                                            url={window.location.href}
                                            title={story.title}
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* {users.map(Card=><CommunitypageCard Card={Card}></CommunitypageCard>)} */}
            </div>
        </div>
    );
};

export default CommunitypageCard;
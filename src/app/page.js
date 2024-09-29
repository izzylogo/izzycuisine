'use client'

import Image from "next/image";

import './page.css'
import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useEffect, useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { BlurText } from "@/components/BlurText";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";


export default function Home() {

  const [load, setLoad] = useState(false)
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);

      try {
        // Fetch from Spoonacular API
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=da50b756ad814ea7bcfd8c0d06fafc8c&query=${query}`
        );
        const data = await res.json();

        // Navigate to search results page, passing the results as state
        router.push(`/search?query=${query}`, {
          state: { recipes: data.results },
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
  };


  useEffect(() => {
    // GSAP animation on page load
    setLoad(true)
  }, []);

  const heroTimeline = gsap.timeline({
    repeat: 0, repeatDelay: 0.1, delay: 4
  })

  useGSAP(() => {
    // gsap.from(".hero-left-contain h1", { opacity: 0, y: -50, duration: 1.5 });
    // gsap.from(".hero-left-contain p", { opacity: 0, y: 50, duration: 1.5, delay: 0.5 });
    // gsap.fromTo(".hero-contain", { backgroundSize: '1000px', duration: 2 });
    heroTimeline.fromTo('.hero-contain', 
      { 
        width: '0%',
        // height: '10%' 
      }, // Start state (small background size)
      { width: '100%', height: '100%', duration: 2, ease: 'power2.inOut' } // End state (cover)
    )
    
    heroTimeline.from('.hero-left', {
      x: -640,
      duration: 1,
      stagger: 0.4,
      // ease: "back.in",
    })
    heroTimeline.from('.hero-right', {
      x: 640,
      duration: 1,
      stagger: 0.4,
      // ease: "back.in",
    })
    heroTimeline.from('.hero-left h1', {
      y: 40,
      duration: 0.5,
      stagger: 0.4,
      opacity: 0,
      // ease: "back.in",
    })
    heroTimeline.from('.hero-right p', {
      y: 40,
      duration: 0.5,
      stagger: 0.4,
      opacity: 0,
      // ease: "back.in",
    })
    heroTimeline.from('.hero-right button', {
      y: 40,
      duration: 0.8,
      stagger: 0.4,
      opacity: 0,
      // ease: "back.in",
    })
    heroTimeline.from('.hero-center', {
      y: 40,
      duration: 0.9,
      stagger: 0.4,
      opacity: 0,
    })

  })

  return (
    <>
      <div className="hero">
        <div className="hero-cover">
          <div className="hero-contain">
            <div className="hero-content">
              <div className="hero-left">
                <svg class="hero-left-one" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_310_2)">
                        <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f0ebe1"></path>
                    </g><defs><clipPath id="clip0_310_2"><rect width="30" height="30" fill="white"></rect></clipPath></defs>
                </svg>
                <h1>Unleash Culinary</h1>
                <h1>Excellence</h1>
                <svg class="hero-left-two" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_310_2)">
                      <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f0ebe1"></path>
                  </g><defs><clipPath id="clip0_310_2"><rect width="30" height="30" fill="white"></rect></clipPath></defs>
                </svg>  
              </div>
              <div className="hero-center">
                <form onSubmit={handleSearch}>
                  <button type="submit" disabled={loading}>
                    <IoSearchCircleSharp color="rgba(242, 156, 51, 1)" fontSize={30} />
                  </button>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for recipes..."
                    required
                  />
                  {/* <button type="submit">Search</button> */}
                </form>
              </div>
              <div className="hero-right">
                <svg class="hero-right-one" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_310_2)">
                        <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f0ebe1"></path>
                    </g><defs><clipPath id="clip0_310_2"><rect width="30" height="30" fill="white"></rect></clipPath></defs>
                </svg>
                {/* <BlurText text='Explore a world of flavors, discover handcrafted recipes,' className="custom-class" delay={100}/> */}
                <p>Explore a world of flavors, discover handcrafted recipes, </p>
                <p>and let the aroma of our passion for cooking fill your kitchen</p>
                <button>Explore Recipe</button>
                <svg class="hero-right-two" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_310_2)">
                      <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f0ebe1"></path>
                  </g><defs><clipPath id="clip0_310_2"><rect width="30" height="30" fill="white"></rect></clipPath></defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

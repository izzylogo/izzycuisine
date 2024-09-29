"use client"

import React, {useRef, useState, useEffect} from 'react'
import './menu.css'
import Link from 'next/link'

import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import { TbMenuDeep } from "react-icons/tb";
import { MdClose } from "react-icons/md";

// import { ScrollSmoother } from 'gsap/all'
// import { ScrollTrigger } from 'gsap/all'

const menuLinks = [
    {path: '/', label: "Home"},
    // {path: '/hot', label: "Hot"},
    {path: '/vegan', label: "Vegan"},
    {path: '/italian', label: "Italian"},
    {path: '/dessert', label: "Dessert"},
    // {path: '/work', label: "Work"},
    // {path: '/about', label: "About"},
    // {path: '/contact', label: "Contact"},
    // {path: '/tab', label: "Lab"},
]

const Menu = () => {

    const container = useRef()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const tl = useRef()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        console.log(isMenuOpen)
    }

    useGSAP(() => {
        gsap.fromTo('.menu-logo', {
            height: '100vh',
            position: 'absolute',
            zIndex: 10,
            width: '100vw',
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'rgba(240, 235, 225, 1)',
            duration: 1.3,

        }, {
            width: '92.5154px',
            zIndex: 'auto',
            position: 'static',
            height: '19.2px',
            duration: 1.3,
            delay: 3
        })
        gsap.from('.menu-open', {
            // height: '100vh',
            // position: 'absolute',
            // zIndex: 10,
            // width: '100vw',
            // top: 0,
            // bottom: 0,
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            // backgroundColor: 'rgba(240, 235, 225, 1)',
            display: 'none',
            delay: 2.3,
            // duration: 1.3

        })
    })

    useGSAP(
    () => {

        gsap.set(".menu-link-item-holder", {y: 75});
        
        tl.current = gsap.timeline({paused: true})
        .to(".menu-overlay", {
            duration: 1.25,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut"
        })
        .to(".menu-link-item-holder", {
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.inOut",
            delay: -0.75,
        })

    }, {scope: container});

    useEffect(() => {
        if (isMenuOpen) {
            tl.current.play()
        } else{
            tl.current.reverse()
        }
    }, [isMenuOpen])

  return (
    <div  className='menu-container' ref={container}>
        <div className="menu-bar">
            <div className="menu-logo">
                <Link href="/">IzzyCusines</Link>
            </div>
            <div className="menu-start"></div>
            <div className="menu-open" onClick={toggleMenu}>
                <TbMenuDeep color='black' fontSize={40} />
            </div>
        </div>
        <div className="menu-overlay">
            <div className="menu-overlay-bar">
                <div className="menu-logo">
                    <Link href="/">IzzyCusines</Link>
                </div>
                <div className="menu-close" onClick={toggleMenu}>
                    <MdClose color='black' fontSize={40}/>
                </div>
            </div>
            <div className="menu-detail-cover">
                
            </div>
            <div className="menu-copy">
                <div className="menu-links">
                    {menuLinks.map((link, index) => (
                        <div className='menu-link-items' key={index}>
                            <div className="menu-link-item-holder" onClick={toggleMenu}>
                                <Link href={link.path} className='menu-link'>{link.label}</Link>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
            <div className="menu-preview">
                <p>View Portfolio</p>
            </div>
        </div>
    </div>
  )
}

export default Menu
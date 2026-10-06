'use client';
import {useLayoutEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export default function IntroLoader(){
 const[visible,setVisible]=useState(true);
 const root=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  let seen=false;
  try{seen=sessionStorage.getItem('trove-intro-v1')==='seen';}catch{}
  if(seen||preference.matches){setVisible(false);return;}
  try{sessionStorage.setItem('trove-intro-v1','seen');}catch{}
  const dismiss=()=>{setVisible(false);if(ScrollTrigger.refresh)ScrollTrigger.refresh();};
  const context=gsap.context(()=>{
   const timeline=gsap.timeline({onComplete:dismiss});
   timeline.fromTo('.intro-loader-word span',{yPercent:115},{yPercent:0,duration:.65,ease:'power3.out'},0)
    .fromTo('.intro-loader-rule',{scaleX:0},{scaleX:1,duration:.8,ease:'power2.inOut'},.05)
    .to('.intro-loader-type',{opacity:0,y:-12,duration:.25,ease:'power2.in'},.95)
    .to('.intro-loader-panel.first',{yPercent:-100,duration:.65,ease:'power3.inOut'},1.08)
    .to('.intro-loader-panel.second',{yPercent:100,duration:.65,ease:'power3.inOut'},1.14);
  },root);
  const safety=window.setTimeout(dismiss,2100);
  const change=()=>{if(preference.matches){context.revert();dismiss();}};
  preference.addEventListener('change',change);
  return()=>{window.clearTimeout(safety);preference.removeEventListener('change',change);context.revert();};
 },[]);
 if(!visible)return null;
 return <div className="intro-loader" ref={root} aria-hidden="true"><div className="intro-loader-panel first"/><div className="intro-loader-panel second"/><div className="intro-loader-type"><span className="label">Interiors / Hyderabad</span><div className="intro-loader-word"><span>The Design</span></div><div className="intro-loader-word italic"><span>Trove.</span></div><div className="intro-loader-rule"/><span className="label intro-loader-credit">Independent concept by Copywrk</span></div></div>;
}

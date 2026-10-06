'use client';
import {useLayoutEffect,useRef,useState} from 'react';
import gsap from 'gsap';
export default function IntroLoader(){
 const[visible,setVisible]=useState(true);
 const root=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  if(!visible)return;
  const element=root.current;
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  let seen=false;
  try{seen=sessionStorage.getItem('trove-intro-v1')==='seen';}catch{}
  if(!element||seen||preference.matches){setVisible(false);return;}
  try{sessionStorage.setItem('trove-intro-v1','seen');}catch{}
  let disposed=false;
  const dismiss=()=>{if(!disposed)setVisible(false);};
  const words=element.querySelectorAll('.intro-loader-word span');
  const rule=element.querySelector('.intro-loader-rule');
  const type=element.querySelector('.intro-loader-type');
  const panels=element.querySelectorAll('.intro-loader-panel');
  const timeline=gsap.timeline({paused:true,onComplete:dismiss});
  timeline.fromTo(words,{yPercent:35,opacity:0},{yPercent:0,opacity:1,duration:.85,stagger:.08,ease:'power3.out'},0)
   .fromTo(rule,{scaleX:0,opacity:0},{scaleX:1,opacity:1,duration:.95,ease:'power2.inOut'},.05)
   .to(type,{opacity:0,duration:.4,ease:'power2.inOut'},1.05)
   .to(panels,{yPercent:-100,duration:1,stagger:.055,ease:'power4.inOut'},1.15);
  const fontTimeout=window.setTimeout(()=>{if(!disposed)timeline.play();},350);
  Promise.all([document.fonts.load('400 80px Bodoni'),document.fonts.load('italic 400 80px Bodoni')]).then(()=>{if(!disposed){window.clearTimeout(fontTimeout);timeline.play();}}).catch(()=>{});
  const safety=window.setTimeout(dismiss,3000);
  const change=()=>{if(preference.matches)dismiss();};
  preference.addEventListener('change',change);
  return()=>{disposed=true;window.clearTimeout(fontTimeout);window.clearTimeout(safety);preference.removeEventListener('change',change);timeline.kill();};
 },[visible]);
 if(!visible)return null;
 return <div className="intro-loader" ref={root} aria-hidden="true"><div className="intro-loader-panel first"/><div className="intro-loader-panel second"/><div className="intro-loader-type"><span className="label">Interiors / Hyderabad</span><div className="intro-loader-word"><span>The Design</span></div><div className="intro-loader-word italic"><span>Trove.</span></div><div className="intro-loader-rule"/><span className="label intro-loader-credit">Independent concept by Copywrk</span></div></div>;
}

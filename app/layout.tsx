import type { Metadata } from 'next';
import './globals.css';
import IntroLoader from './intro-loader';
export const metadata: Metadata = { title: 'The Design Trove — Independent Concept by Copywrk', description: 'An independent editorial concept exploring the journey from a brief to a finished home. All editorial text is sample copy.', robots: {index:false,follow:false}, icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: "try{document.documentElement.dataset.intro=matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('trove-intro-v1')==='seen'?'skip':'play'}catch(e){document.documentElement.dataset.intro='play'}"}}/></head><body><IntroLoader/>{children}</body></html>}

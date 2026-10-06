import type { Metadata } from 'next';
import './globals.css';
import IntroLoader from './intro-loader';
export const metadata: Metadata = { title: 'The Design Trove — Independent Concept by Copywrk', description: 'An independent editorial concept exploring the journey from a brief to a finished home. All editorial text is sample copy.', robots: {index:false,follow:false}, icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body><IntroLoader/>{children}</body></html>}

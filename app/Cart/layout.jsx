'use client'
import Navbar from '../layout/navbar/page';
import Footer from '../layout/footer/page';
import { useAuth } from "../hooks/useAuth";

export default function Layout({ children }) {
    
    return (
        <div >
            <Navbar/>
            <div className="flex-grow p-1 md:overflow-y-auto ">{children}</div>
            <Footer/>
        </div>
    );
}
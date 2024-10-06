'use client'
import Navbar from '../layout/navbar/page';
import Footer from '../layout/footer/page';
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
    const router = new useRouter();

    const { user } = useAuth();

    if (user) {
        console.log(user);
        router.push("/")
        return null;
    }else{
        console.log("error");
    }
    return (
        <div >
            <Navbar/>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            <Footer/>
        </div>
    );
}

import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Phone,
} from "lucide-react";
import { Link } from "react-router"; // note: use "react-router-dom" not "react-router"

export const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-gray-300 pt-12 pb-8">
            <div className="max-w-2xl mx-auto flex flex-col items-center px-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold pt-4 pb-8">
                    {/* PIETRA */}
                    {/* <img src="/pietra-logo.png" alt="" /> */}
                    <p className="font-extrabold text-3xl tracking-tight font-sans -translate-x-3">
                        Brēta
                    </p>
                    <p className="ml-2 text-base font-semibold font-sans translate-x-3">
                        by pietra
                    </p>
                </Link>

                {/* Brand & Tagline */}
                {/* <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold tracking-wide text-white">Brēta</h2>
                    <span className="block text-lg text-gray-400 mb-2">by pietra</span>
                </div> */}

                {/* Contact Details */}
                <div className="text-center text-sm text-gray-400 mb-6">
                    <div className="mb-6 flex items-center justify-center space-x-4 divide-x text-slate-300 divide-gray-700">
                        <a href="mailto:info@bretaworld.com" className="hover:text-white pr-4">info@bretaworld.com</a>
                        <a className="hover:text-white pl-4" href="www.bretaworld.com">www.bretaworld.com</a>
                    </div>
                    <div className="mb-2">8121 Jame St#9, Concord, ON, L4K, 5L8, Canada</div>
                    <div>152. Colaba Chambers, Ground Floor, S.B. Singh Road, Colaba, Mumbai - 400005.</div>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-gray-800 my-6"></div>

                {/* Copyright */}
                <div className="text-xs text-gray-500 text-center">
                    © 2025 Pietra Surfaces. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

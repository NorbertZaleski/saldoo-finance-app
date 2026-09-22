import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export default function SearchBox({ value, onChange, placeholder="Wyszukaj"}){
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);

    //automatyczny fokus po otwarciu
    useEffect(()=>{
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const handleClose = () =>{
        setIsOpen(false);
        onChange("");
    };

    if (isOpen) {
        return (
            <div className="flex items-center gap-2">
                <Search size={32} className="z-10 shrink-0"/>
                <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e)=> onChange(e.target.value)}
                onBlur={()=> {
                    if (!value) handleClose();
                }}
                placeholder={`${placeholder}`}
                className="bg-transparent outline-none shadow-none text-main-text placeholder:text-main-text/40"
                />

            </div>
        );
    }

    return (
        <button
        type="button"
        onClick={()=> setIsOpen(true)}
        className="group flex items-center gap-2 outline-none shadow-none"
        >
            <Search size={32} className="z-10 shrink-0"/>
            <span className=""

            >
                {placeholder}
            </span>
        </button>
    );
}


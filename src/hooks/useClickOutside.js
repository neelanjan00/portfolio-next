import { useEffect, useState } from "react";

export default function useClickOutside(ref1, ref2) {

    const [isClicked, setIsClicked] = useState();

    useEffect(() => {

        function handleClickOutside(event) {
            if (ref1.current && !ref1.current.contains(event.target) && ref2.current && !ref2.current.contains(event.target)) {
                setIsClicked(true);
            } else {
                setIsClicked(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleClickOutside);
        };

    }, [ref1, ref2]);

    return isClicked;
}
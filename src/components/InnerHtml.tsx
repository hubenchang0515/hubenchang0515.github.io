import { useEffect, useRef } from "react";

export interface InnerHtmlProps {
    html: string;
    style?: React.CSSProperties;
}

export default function InnerHtml(props:InnerHtmlProps) {
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (divRef.current) {
            const slot = document.createRange().createContextualFragment(props.html);
            divRef.current.innerHTML = '';
            divRef.current.appendChild(slot);
        }
    }, [props.html, divRef.current]);
    return <div style={props.style} ref={divRef}></div>
}
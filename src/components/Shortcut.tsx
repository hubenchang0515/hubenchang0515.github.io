import { Button } from "@mui/material";
import { ApplicationProps } from "../features/Application";

export interface ShortcutProps {
    app:ApplicationProps;
    onClick?: ()=>void;
}

export default function Shortcut(props:ShortcutProps) {
    const onClick = (ev:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick();
            ev.preventDefault();
        }
    }

    return (
        <Button
            sx={{
                width:'100%',
                height:'100%',
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center', 
                alignItems:'center', 
                padding:1, overflow:'hidden',textOverflow:'ellipsis',
            }}
            title={props.app.title}
            onClick={onClick}
            href={props.app.url}
        >
            <img src={props.app.icon} style={{width:'80%', aspectRatio:1}} draggable='false' alt={props.app.title}/>
        </Button>
    )
}
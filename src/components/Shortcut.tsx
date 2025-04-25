import { Button } from "@mui/material";
import { ApplicationProps } from "../features/Application";

export interface ShortcutProps {
    app:ApplicationProps;
    onClick?: ()=>void;
}

export default function Shortcut(props:ShortcutProps) {
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
            onClick={props.onClick}
        >
            <img src={props.app.icon} style={{width:'80%', aspectRatio:1}} draggable='false'/>
        </Button>
    )
}
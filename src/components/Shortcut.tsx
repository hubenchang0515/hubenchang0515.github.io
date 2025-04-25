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
            onClick={props.onClick}
        >
            <img src={props.app.icon} width={64} height={64}/>
            <span style={{width:'100%', whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{ props.app.title }</span>
        </Button>
    )
}
import { IconButton, Tooltip } from "@mui/material";

export interface DockTrayItemProps {
    icon:string;
    title?:string;
    onClick?:()=>void;
}

export default function DockTrayItem(props:DockTrayItemProps) {
    return (
        <Tooltip title={props.title}>
            <IconButton onClick={props.onClick}>
                <img width={24} height={24} src={props.icon} draggable='false'/>
            </IconButton>
        </Tooltip>
    )
}
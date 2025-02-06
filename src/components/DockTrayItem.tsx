import { IconButton, Tooltip } from "@mui/material";
import { ApplicationProps } from "../features/Application";

export interface DockTrayItemProps {
    icon:string;
    title?:string;
    app?:ApplicationProps;
    onClick?:()=>void;
}

export default function DockTrayItem(props:DockTrayItemProps) {
    return (
        <Tooltip title={props.title}>
            <IconButton onClick={props.onClick}>
                <img width={24} height={24} src={props.icon}/>
            </IconButton>
        </Tooltip>
    )
}
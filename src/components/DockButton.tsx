import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export interface DockButtonProps {
    icon?: string;
    title?: string;
    focus?: boolean
    onClick?: ()=>void;
    children?: React.ReactNode;
}

export default function DockButton(props:DockButtonProps) {
    return (
        <Box 
            className="dock-button"
            sx={{
                borderRadius:32,
                background:"rgb(237,242,250)"
            }}
        >
            <Tooltip title={props.title} arrow>
                <IconButton onClick={props.onClick}>
                    {props.icon ? <img width={32} height={32}  src={props.icon}/> : props.children}
                </IconButton>
            </Tooltip>
        </Box>
    )
}
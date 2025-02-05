import { Fade, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import LauncherItem from "./LauncherItem";
import { ApplicationProps } from "../features/Application";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useEffect, useState } from "react";

export interface LauncherProps {
    open?: boolean;
    items?: ApplicationProps[];
    onUserButtonClick?: ()=>void;
    onCloseButtonClick?: ()=>void;
    onAppClick?: (app:ApplicationProps)=>void;
}

export function Launcher(props:LauncherProps) {
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        if (fullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, [fullscreen]);

    return (
        <Fade 
            in={props.open} 
        >
            <Box
                className="launcher"
                sx={{
                    position:'absolute',
                    bottom: 0,
                    left: 0,
                    width: document.documentElement.clientWidth >= 960 ? 480 : '100%',
                    height: document.documentElement.clientWidth >= 960 && document.documentElement.clientHeight - 64 >= 720 ? 720 : '100%', // 64 是 Dock 的高度
                    zIndex: 9999,
                    display: 'flex'
                }}
                onClick={(ev)=>{ev.stopPropagation()}}
            >
                <Box 
                    sx={{
                        width:48,
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        background: 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    <IconButton href="https://github.com/hubenchang0515/hubenchang0515.github.io" target="_blank">
                        <GitHubIcon/>
                    </IconButton>
                    <Box flexGrow={1}/>
                    <IconButton onClick={props.onUserButtonClick}>
                        <PersonIcon/>
                    </IconButton>
                    <IconButton onClick={()=>setFullscreen(!fullscreen)}>
                        {fullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>}
                    </IconButton>
                    <IconButton onClick={props.onCloseButtonClick}>
                        <PowerSettingsNewIcon/>
                    </IconButton>
                </Box>
                <Box 
                    sx={{
                        flexGrow:1,
                        display:'flex',
                        flexDirection:'column',
                        overflow:'auto',
                        background: 'rgba(255, 255, 255, 0.7)',
                    }}
                >
                    {
                        props.items?.map((item, index) => {
                            return <LauncherItem key={index} app={item} onClick={()=>{props.onAppClick?.(item)}}/>
                        })
                    }
                    
                </Box>
            </Box>
        </Fade>
    )
}
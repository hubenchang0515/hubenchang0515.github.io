import { useEffect, useState } from "react";
import { Fade, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import LauncherItem from "./LauncherItem";
import { ApplicationProps } from "../features/Application";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';

export interface LauncherProps {
    open?: boolean;
    items?: ApplicationProps[];
    installPrompt?: Event;
    onUserButtonClick?: ()=>void;
    onCloseButtonClick?: ()=>void;
    onAppClick?: (app:ApplicationProps)=>void;
}

export function Launcher(props:LauncherProps) {
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        if (fullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        const callback = () => {
            setFullscreen(!!document.fullscreenElement);
        }

        document.addEventListener('fullscreenchange', callback);

        return () => {
            document.removeEventListener('fullscreenchange', callback);
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
                    bottom: 64, // // 64 是 Dock 的高度
                    left: 0,
                    width: document.documentElement.clientWidth >= 960 ? 480 : '100%',
                    height: document.documentElement.clientWidth >= 960 && document.documentElement.clientHeight - 64 >= 720 ? 720 : 'calc(100% - 64px)', // 64 是 Dock 的高度
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
                        background: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <IconButton href="https://github.com/hubenchang0515/hubenchang0515.github.io" target="_blank">
                        <GitHubIcon/>
                    </IconButton>
                    <Box flexGrow={1}/>
                    <IconButton onClick={props.onUserButtonClick}>
                        <PersonIcon/>
                    </IconButton>
                    {
                        props.installPrompt ? 
                        <IconButton onClick={()=>{(props.installPrompt as any).prompt()}}>
                            <InstallDesktopIcon/>
                        </IconButton>
                        : <></>
                    }
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
                        background: 'rgba(255,255,255,0.5)',
                        backdropFilter: 'blur(10px)',
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
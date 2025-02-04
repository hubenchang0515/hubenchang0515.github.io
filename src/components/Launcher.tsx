import { Fade, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import LauncherItem from "./LauncherItem";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PersonIcon from '@mui/icons-material/Person';
import { ApplicationProps } from "../features/Application";

export interface LauncherProps {
    open?: boolean;
    items?: ApplicationProps[];
    onCloseButtonClick?: ()=>void;
    onAppClick?: (app:ApplicationProps)=>void;
}

export function Launcher(props:LauncherProps) {
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
                    width: {xs:'100%', md:'480px'},
                    height: {xs:'100%', lg:'720px'},
                    zIndex: 9999,
                    display: 'flex'
                }}
            >
                <Box 
                    sx={{
                        width:48,
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'end',
                        background: 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    <IconButton onClick={props.onCloseButtonClick}>
                        <PersonIcon/>
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
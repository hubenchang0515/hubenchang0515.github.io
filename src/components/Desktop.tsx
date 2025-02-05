import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Dock from "./Dock";
import { Window, WindowState } from "./Window";
import { Launcher } from "./Launcher";
import { ApplicationProps } from "../features/Application";

export interface DesktopProps {
    background: string;
    apps?: ApplicationProps[];
}

export default function Desktop(props:DesktopProps) {
    const [launcherOpen, setLauncherOpen] = useState(false);
    const [windows, setWindows] = useState<WindowState[]>([]);

    useEffect(() => {
        if (launcherOpen) {
            for (const window of windows) {
                window.focus = false;
            }

            setWindows([...windows]);
        } else {
            focusTop();
        }
    }, [launcherOpen])

    const getFocusWindowIndex = useCallback(() => {
        let focusWindowIndex = -1;
        for (let i = 0; i < windows.length; i++) {
            if (windows[i].minimum) {
                continue;
            }
            if (focusWindowIndex == -1 || windows[focusWindowIndex].z < windows[i].z) {
                focusWindowIndex = i;
            }
        }
        return focusWindowIndex;
    }, [windows]);

    const focusWindow = useCallback((index:number) => {
        if (index < 0 || index >= windows.length) {
            return;
        }

        minimumWindow(index, false);

        let maxZ = 1;
        for (const window of windows) {
            if (window.z > windows[index].z) {
                window.z = window.z - 1;
            }
            if (window.z > maxZ) {
                maxZ = window.z;
            }

            window.focus = false;
        }
        windows[index].z = maxZ + 1;
        windows[index].focus = true;
        setWindows([...windows]);
    }, [windows]);

    const focusTop = useCallback(() => {
        focusWindow(getFocusWindowIndex());
    }, [windows]);

    const moveWindow = useCallback((index:number, x:number, y:number) => {
        if (index < 0 || index >= windows.length) {
            return;
        }

        windows[index].x = x;
        windows[index].y = y;
        setWindows([...windows]);
    }, [windows]);

    const minimumWindow = useCallback((index:number, minimum:boolean) => {
        if (index < 0 || index >= windows.length) {
            return;
        }

        windows[index].minimum = minimum;
        windows[index].focus = false;
        setWindows([...windows]);

        if (minimum) {
            focusTop();
        }
    }, [windows]);

    const maximumWindow = useCallback((index:number, maximum:boolean) => {
        if (index < 0 || index >= windows.length) {
            return;
        }

        windows[index].maximum = maximum;
        setWindows([...windows]);
    }, [windows]);

    const closeWindow = useCallback((index:number) => {
        if (index < 0 || index >= windows.length) {
            return;
        }

        windows.splice(index, 1);
        setWindows([...windows]);
        focusTop();
    }, [windows]);

    const launch = useCallback((app:ApplicationProps) => {
        const index = getFocusWindowIndex();
        const window:WindowState = {
            icon: app.icon,
            title: app.title,
            url: app.url,
            x: index >= 0 ? windows[index].x + 20 : 100,
            y: index >= 0 ? windows[index].y + 20 : 100,
            z: index >= 0 ? windows[index].z + 1 : 1,
            width: 1080,
            height: 720,
            maximum: false,
            minimum: false,
            focus: true,
        }
        if (index >= 0) {
            windows[index].focus = false;
        }
        setWindows([...windows, window]);
        setLauncherOpen(false);
    }, [windows]);

    return (
        <Box 
            className="desktop" 
            sx={{
                width:'100%', 
                height:'100%', 
                overflow:'hidden',
                background: `url(${props.background})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display:'flex',
                flexDirection:'column',
            }}
        >
            <Box 
                sx={{
                    position:'relative',
                    flexGrow: 1
                }}
                onClick={()=>setLauncherOpen(false)}    
            >
                {
                    windows.map((window, index) => {
                        return <Window 
                                    key={index} 
                                    state={window} 
                                    onClick={()=>{focusWindow(index)}} 
                                    onMove={(x,y) => moveWindow(index, x, y)}
                                    onMimimum={(minimum) => minimumWindow(index, minimum)}
                                    onMaximum={(maximum) => maximumWindow(index, maximum)}
                                    onClose={() => closeWindow(index)}
                                />
                    })
                }
                <Launcher open={launcherOpen} items={props.apps} onAppClick={launch}/>
            </Box>
            <Dock 
                items={windows}
                onLaunchClicked={()=>setLauncherOpen(!launcherOpen)} 
                onItemClick={(index)=>focusWindow(index)}
            />
        </Box>
    )
}

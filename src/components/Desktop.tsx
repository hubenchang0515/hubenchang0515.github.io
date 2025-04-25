import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Container, Fade } from "@mui/material";
import Dock from "./Dock";
import { Window, WindowState } from "./Window";
import { Launcher } from "./Launcher";
import { ApplicationProps } from "../features/Application";
import { TransitionGroup } from "react-transition-group";
import DesktopManager from "../features/DesktopManager";
import SearchBox from "./SearchBox";
import { SEARCH_ENGINES } from "../config";

export interface DesktopProps {
    background: string;
    apps?: ApplicationProps[];
    starts?: ApplicationProps[];
    installPrompt?: Event;
    onExit?:()=>void;
}

export default function Desktop(props:DesktopProps) {
    const manager = useRef(new DesktopManager());
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

    const focusWindow = useCallback((id:number) => {
        manager.current.setTop(id);
        setWindows([...manager.current.processes()]);
    }, [manager.current]);

    const focusTop = useCallback(() => {
        focusWindow(manager.current.getTop());
    }, [manager.current]);

    const moveWindow = useCallback((id:number, x:number, y:number) => {
        manager.current.moveWindow(id, x, y);
        setWindows([...manager.current.processes()]);
    }, [manager.current]);

    const minimumWindow = useCallback((id:number, minimum:boolean) => {
        manager.current.setWindowMinimum(id, minimum);
        setWindows([...manager.current.processes()]);

        if (minimum) {
            focusTop();
        }
    }, [manager.current]);

    const maximumWindow = useCallback((id:number, maximum:boolean) => {
        manager.current.setWindowMaximum(id, maximum);
        setWindows([...manager.current.processes()]);
    }, [manager.current]);

    const closeWindow = useCallback((id:number) => {
        manager.current.exitProcess(id);
        setWindows([...manager.current.processes()]);
        focusTop();
    }, [manager.current]);

    const launch = useCallback((app:ApplicationProps, componentProps?:any) => {
        manager.current.startProcess(app, componentProps);
        setWindows([...manager.current.processes()]);
        setLauncherOpen(false);
    }, [manager.current]);

    const onExit = useCallback(() => {
        manager.current.exit();
        props.onExit?.();
    }, [manager.current]);

    useEffect(() => {
        if (!props.starts) {
            return;
        }

        for (const app of props.starts) {
            launch(app);
        }

        return ()=>{
            manager.current.exit();
        };
    }, [props.starts]);

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
                position:'relative',
            }}
        >
            <Container maxWidth='md' sx={{width:'100%', flex:1, display:'flex', alignItems:'center'}}>
                <SearchBox engines={SEARCH_ENGINES}/>
            </Container>
            <Box
                component={TransitionGroup}
                onClick={()=>setLauncherOpen(false)}
            >
                {
                    windows.map((window, _) => {
                        return (
                            <Fade key={window.id}><Box>
                            <Window
                                state={window} 
                                onClick={()=>{focusWindow(window.id)}} 
                                onMove={(x,y) => moveWindow(window.id, x, y)}
                                onMimimum={(minimum) => minimumWindow(window.id, minimum)}
                                onMaximum={(maximum) => maximumWindow(window.id, maximum)}
                                onClose={() => closeWindow(window.id)}
                            /> 
                            </Box></Fade>
                        )
                    })
                }
                <Launcher 
                    open={launcherOpen} 
                    items={props.apps} 
                    installPrompt={props.installPrompt}
                    onAppClick={launch} 
                    onUserButtonClick={() => {
                        // TODO: 用户登录
                    }}
                    onCloseButtonClick={onExit}
                />
            </Box>
            <Dock 
                items={windows}
                onLaunchClicked={()=>setLauncherOpen(!launcherOpen)} 
                onItemClick={focusWindow}
            />
        </Box>
    )
}

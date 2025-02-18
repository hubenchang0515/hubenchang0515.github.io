import { Box, Zoom } from "@mui/material";
import DockItem from "./DockItem";
import DockButton from "./DockButton";
import  TimeView  from "./TimeView";
import { TransitionGroup } from "react-transition-group";
import { WindowState } from "./Window";
import DockTrayItem from "./DockTrayItem";

export interface DockItem {
    id:number;
    title: string;
    icon: string;
    focus?: boolean;
}

export interface DockProps {
    items?: WindowState[];
    onLaunchClicked?: ()=>void;
    onItemClick?: (id:number)=>void;
}

export default function Dock(props:DockProps) {
    return (
        <Box 
            className="dock"
            sx={{
                zIndex: 9999,
                with: '100%',
                height: 64,
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingX: 1,
            }}
        >
            <DockButton title="Launcher" icon='icons/launcher.svg' background="#fff" onClick={props.onLaunchClicked}/>
            <Box flexGrow={1}/>
            <Box
                component={TransitionGroup}
                sx={{
                    display:'flex',
                    alignItems: 'center',
                    height: '100%',
                    overflow: 'auto',
                    marginX: 1,
                }}    
            >
                {
                    props.items?.map((item, _) => {
                        return !item.tray && <Zoom key={item.id}><Box><DockItem title={item.title} icon={item.icon} focus={item.focus} onClick={()=>props.onItemClick?.(item.id)}/></Box></Zoom>
                    })
                }
            </Box>
            <Box flexGrow={1}/>
            <Box
                component={TransitionGroup}
                sx={{
                    display:'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    height: '100%',
                    overflow: 'auto',
                    marginX: 1,
                }}    
            >
                {
                    props.items?.map((item, _) => {
                        return item.tray && <Zoom key={item.id}><Box><DockTrayItem title={item.title} icon={item.icon} onClick={()=>props.onItemClick?.(item.id)}/></Box></Zoom>
                    })
                }
            </Box>
            <TimeView/>
        </Box>
    )
}

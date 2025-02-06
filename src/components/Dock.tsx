import { Box, Zoom } from "@mui/material";
import DockItem from "./DockItem";
import DockButton from "./DockButton";
import  TimeView  from "./TimeView";
import { TransitionGroup } from "react-transition-group";
import { WindowState } from "./Window";

export interface DockItem {
    id:number;
    title: string;
    icon: string;
    focus?: boolean;
}

export interface DockProps {
    items?: WindowState[];
    onLaunchClicked?: ()=>void;
    onItemClick?: (index:number)=>void;
}

export default function Dock(props:DockProps) {
    return (
        <Box 
            className="dock"
            sx={{
                zIndex: 9999,
                with: '100%',
                height: 64,
                background: 'rgba(255, 255, 255, 0.9)',
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
                    props.items?.map((item, index) => {
                        return <Zoom key={item.id}><Box><DockItem title={item.title} icon={item.icon} focus={item.focus} onClick={()=>props.onItemClick?.(index)}/></Box></Zoom>
                    })
                }
            </Box>
            <Box flexGrow={1}/>
            <TimeView/>
        </Box>
    )
}

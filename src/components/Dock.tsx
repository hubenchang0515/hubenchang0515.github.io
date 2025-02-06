import { Box, Zoom } from "@mui/material";
import DockItem from "./DockItem";
import DockButton from "./DockButton";
import  TimeView  from "./TimeView";
import { TransitionGroup } from "react-transition-group";
import { WindowState } from "./Window";
import DockTrayItem, { DockTrayItemProps } from "./DockTrayItem";

export interface DockItem {
    id:number;
    title: string;
    icon: string;
    focus?: boolean;
}

export interface DockProps {
    items?: WindowState[];
    trays?: DockTrayItemProps[];
    onLaunchClicked?: ()=>void;
    onItemClick?: (index:number)=>void;
    onTrayClick?: (index:number)=>void;
}

export default function Dock(props:DockProps) {
    return (
        <Box 
            className="dock"
            sx={{
                zIndex: 9999,
                with: '100%',
                height: 64,
                background: 'rgb(255,255,255,0.7)',
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
                    props.items?.map((item, index) => {
                        return <Zoom key={item.id}><Box><DockItem title={item.title} icon={item.icon} focus={item.focus} onClick={()=>props.onItemClick?.(index)}/></Box></Zoom>
                    })
                }
            </Box>
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
                    props.trays?.map((item, index) => {
                        return <Zoom key={index}><Box><DockTrayItem title={item.title} icon={item.icon} app={item.app} onClick={()=>props.onTrayClick?.(index)}/></Box></Zoom>
                    })
                }
            </Box>
            <TimeView/>
        </Box>
    )
}

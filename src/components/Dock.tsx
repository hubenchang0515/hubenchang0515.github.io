import { Box } from "@mui/material";
import DockItem from "./DockItem";
import DockButton from "./DockButton";
import  TimeView  from "./TimeView";

export interface DockItem {
    title: string,
    icon: string,
    focus?: boolean,
}

export interface DockProps {
    items?: DockItem[];
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
            <DockButton title="Launcher" icon='launcher.svg' onClick={props.onLaunchClicked}/>
            <Box flexGrow={1}/>
            <Box
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
                        return <DockItem key={index} title={item.title} icon={item.icon} focus={item.focus} onClick={()=>props.onItemClick?.(index)}/>
                    })
                }
            </Box>
            <Box flexGrow={1}/>
            <TimeView/>
        </Box>
    )
}

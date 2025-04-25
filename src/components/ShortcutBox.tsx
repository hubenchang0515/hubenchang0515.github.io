import { Grid2 as Grid, Paper } from "@mui/material";
import { ApplicationProps } from "../features/Application";
import Shortcut from "./Shortcut";

export interface ShortcutBoxProps {
    items?: ApplicationProps[];
    onAppClick?: (app:ApplicationProps)=>void;
}

export default function ShortcutBox(props:ShortcutBoxProps) {
    return (
        <Paper 
            sx={{
                background:'rgba(255,255,255,0.7)',
            }}
        >
            <Grid container spacing={2}>
            {
                props.items?.map((item, index) => {
                    return (
                        <Grid 
                            size={2} 
                            sx={{
                                display:'flex', 
                                justifyContent:'center',
                                alignItems:'center',
                            }}
                        >
                            <Shortcut key={index} app={item} onClick={()=>{props.onAppClick?.(item)}}/>
                        </Grid>
                    )
                })
            }
            </Grid>
        </Paper>
    )
}
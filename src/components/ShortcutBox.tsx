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
            <Grid container spacing={1} columns={8}>
            {
                props.items?.map((item, index) => {
                    return (
                        <Grid 
                            key={index}
                            size={{xs:2, md:1}} 
                            sx={{
                                display:'flex', 
                                justifyContent:'center',
                                alignItems:'center',
                            }}
                        >
                            <Shortcut app={item} onClick={()=>{props.onAppClick?.(item)}}/>
                        </Grid>
                    )
                })
            }
            </Grid>
        </Paper>
    )
}
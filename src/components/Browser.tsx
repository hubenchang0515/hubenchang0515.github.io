import { Box, TextField } from "@mui/material"
import { useCallback, useState } from "react";

export interface BrowserProps {
    defaultUrl?:string
}

export default function Browser(props:BrowserProps) {
    const [value, setValue] = useState(props.defaultUrl??"");
    const [url, setUrl] = useState(props.defaultUrl??"");

    const onKeyDown = useCallback((ev:any) => {
        if (ev.key === "Enter") {
            try {
                new URL(value);
                setUrl(value);
            } catch {
                setValue(`https://${value}`);
                setUrl(`https://${value}`);
            }
        }
    }, [value]);

    return (
        <Box className='browser' sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            <TextField variant="standard" placeholder="URL" value={value} onChange={(ev)=>setValue(ev.target.value)} onKeyDown={onKeyDown}/>
            <Box flexGrow={1}>
                <iframe
                    style={{width:'100%', height:'100%',verticalAlign:'bottom',margin:0, padding:0, border:0,userSelect:'none'}} 
                    src={url}
                />
            </Box>
        </Box>
    )
}
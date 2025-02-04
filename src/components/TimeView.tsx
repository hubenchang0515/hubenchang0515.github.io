import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";

export default function TimeView() {
    const [now, setNow] = useState(new Date);
    const updateTime = useCallback(() => {
        setNow(new Date);
    }, [setNow]);

    useEffect(() => {
        const id = setInterval(updateTime, 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography sx={{fontSize:20, p:0, m:0}}>{now.toLocaleTimeString()}</Typography>
            <Typography sx={{fontSize:12, p:0, m:0}}>{now.toLocaleDateString()}</Typography>
        </Box>
    )
}

import { Button, Typography,  } from "@mui/material";
import { Box } from "@mui/system";
import { ApplicationProps } from "../features/Application";

export interface LauncherItemProps {
    app: ApplicationProps;
    onClick?: ()=>void;
}

export default function LauncherItem(props:LauncherItemProps) {
    return(
        <Box 
            className="launcher-item"
            component={Button}
            sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'start',
                gap:1,
                textTransform:'none',
            }}
            onClick={props.onClick}
        >
            <img width={32} height={32}  src={props.app.icon}/>
            <Box>
                <Typography variant="h6" align="left" color="primary">{props.app.title}</Typography>
                <Typography variant="body2" align="left" color="gray">{props.app.subtitle}</Typography>
            </Box>
        </Box>
    )
}

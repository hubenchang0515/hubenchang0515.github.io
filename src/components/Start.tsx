
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Box, Button, Typography } from '@mui/material';

export interface StartProps {
    onClick?:()=>void;
}

export default function Start(props:StartProps) {
    return (
        <Box 
            className='start'
            sx={{
                position:'fixed',
                top:0,
                bottom:0,
                left:0,
                right:0,
                zIndex: 99999,
                background: '#000',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                padding:0, 
                margin:0, 
            }}
        >
            <Button color='error' sx={{display:'flex', flexDirection:'column'}} onClick={props.onClick}>
                <PowerSettingsNewIcon sx={{width:128, height:128}}/>
                <Typography variant='h6'>Start</Typography>
            </Button>
        </Box>
    )
}
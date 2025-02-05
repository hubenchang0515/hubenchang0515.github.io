
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Box, IconButton } from '@mui/material';

export type StartUpState = 'executing' | 'exiting'

export interface StartUpProps {
    state?:StartUpState;
    onClick?:()=>void;
}

export default function StartUp(props:StartUpProps) {
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
            <IconButton onClick={props.onClick} disabled={props.state === 'executing'}>
                <PowerSettingsNewIcon sx={{width:128, height:128, color:props.state === 'executing' ? '#0F0' : '#F00'}}/>
            </IconButton>
        </Box>
    )
}
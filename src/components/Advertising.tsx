import { Box } from "@mui/material";

export interface AdvertisingProps {
    image?: string;
    url?: string;
    children?: React.ReactNode;
}

export default function Advertising(props:AdvertisingProps) {
    return (
        <Box className='Advertising' sx={{width:'100%', height:'100%'}}>
            {
                props.children ? props.children :
                <Box sx={{width:'100%', height:'100%', display:'flex'}}>
                    {
                        props.url ? 
                        <a href={props.url} style={{width:'100%', height:'100%', display:'flex'}}>
                            <img style={{width:'100%', height:'100%', objectFit:'contain'}} src={props.image} draggable="false" alt="AD"></img>
                        </a>
                        :
                        <img style={{width:'100%', height:'100%', objectFit:'contain'}} src={props.image} draggable="false" alt="AD"></img>
                    }
                    
                </Box>
            }
            
        </Box>
    )
}
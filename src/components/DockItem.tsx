import { Button, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

export type DockItemState = "close" | "open" | "focus";

export interface DockItemProps {
    icon?: string;
    title?: string;
    focus?: boolean;
    onClick?: ()=>void;
}

export default function DockItem(props:DockItemProps) {
    return (
        <Box className="dock-icon">
            <Tooltip title={props.title}>
                <Button 
                    variant='text'
                    sx={{
                        border: props.focus ? '1px solid rgb(33,150,243)' : '1px solid transparent'
                    }}
                    onClick={props.onClick}>
                    <img width={32} height={32}  src={props.icon} draggable='false'/>
                </Button>
            </Tooltip>
        </Box>
    )
}
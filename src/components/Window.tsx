import { Fade, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useRef } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import CloseIcon from '@mui/icons-material/Close';

export interface WindowState {
    icon: string;
    title: string;
    url: string;
    x: number;
    y: number;
    z: number;
    width: number|string;
    height: number|string;
    minimum?: boolean;
    maximum?: boolean;
    focus?: boolean;
}

export interface WindowProps {
    state: WindowState;
    onClick?: ()=>void;
    onMove?: (x:number, y:number)=>void;
    onMimimum?: (minimum:boolean)=>void;
    onMaximum?: (maximum:boolean)=>void;
    onClose?: ()=>void;
}

export function Window(props:WindowProps) {
    const pos = useRef({x:NaN, y:NaN})
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const mouseMove = useCallback((ev:any) => {
        if (isNaN(pos.current.x) || isNaN(pos.current.y)) {
            return;
        }

        const dx = ev.clientX - pos.current.x;
        const dy = ev.clientY - pos.current.y;
        pos.current.x = ev.clientX; 
        pos.current.y = ev.clientY;
        props.onMove?.(props.state.x + dx, props.state.y + dy);
    }, [props.onMove]);

    const touchMove = useCallback((ev:any) => {
        if (isNaN(pos.current.x) || isNaN(pos.current.y)) {
            return;
        }

        const dx = ev.touches[0].clientX - pos.current.x;
        const dy = ev.touches[0].clientY - pos.current.y;
        pos.current.x = ev.touches[0].clientX; 
        pos.current.y = ev.touches[0].clientY;
        props.onMove?.(props.state.x + dx, props.state.y + dy);
    }, [props.onMove]);


    return (
        <Fade in={!props.state.minimum}>
            <Paper 
                className="window"
                elevation={12}
                sx={{
                    position: 'absolute',
                    top: props.state.maximum ? 0 : props.state.y,
                    left: props.state.maximum ? 0 : props.state.x,
                    zIndex: props.state.z,
                    width: props.state.maximum ? '100%' : props.state.width,
                    height: props.state.maximum ? '100%' : props.state.height,
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgb(221,227,233)'
                }}
                onMouseDown={() => {
                    props.onClick?.();
                }}
                onTouchStart={() => {
                    props.onClick?.();
                }}
            >
                <Box display='flex' alignItems='center' sx={{userSelect:'none'}}
                    onMouseDown={(ev:any) => {
                        props.onClick?.();
                        pos.current.x = ev.clientX; 
                        pos.current.y = ev.clientY;
                        document.addEventListener("mousemove", mouseMove);

                        const mouseUp = () => {
                            props.onClick?.();
                            pos.current.x = NaN; 
                            pos.current.y = NaN;
                            document.removeEventListener("mousemove", mouseMove);
                            document.removeEventListener("mouseup", mouseUp);
                        }
                        document.addEventListener("mouseup", mouseUp);
                    }}

                    onTouchStart={(ev:any) => {
                        props.onClick?.();
                        pos.current.x = ev.touches[0].clientX; 
                        pos.current.y = ev.touches[0].clientY;
                        document.addEventListener("touchmove", touchMove);

                        const touchUp = () => {
                            props.onClick?.();
                            pos.current.x = NaN; 
                            pos.current.y = NaN;
                            document.removeEventListener("touchmove", touchMove);
                            document.removeEventListener("touchend", touchUp);
                            document.removeEventListener("touchcancel", touchUp);
                        }
                        document.addEventListener("touchend", touchUp);
                        document.addEventListener("touchcancel", touchUp);
                    }}
                >
                    <img style={{width:32, height:32, paddingLeft:8, paddingRight:8}} src={props.state.icon}></img>
                    <Typography>{props.state.title}</Typography>
                    <Box flexGrow={1}/>
                    <IconButton onClick={()=>props.onMimimum?.(true)}>
                        <ExpandMoreIcon color="primary"/>
                    </IconButton>
                    <IconButton onClick={()=>props.onMaximum?.(!props.state.maximum)}>
                        {props.state.maximum ? <UnfoldLessIcon  color="primary"/> : <UnfoldMoreIcon  color="primary"/>}
                    </IconButton>
                    <IconButton onClick={()=>props.onClose?.()}>
                        <CloseIcon color="error"/>
                    </IconButton>
                </Box>
                
                <Box flexGrow={1} sx={{position:'relative'}}>
                    <iframe 
                        ref={iframeRef} // TODO: 点击 iframe 切换窗口焦点
                        style={{width:'100%', height:'100%', border:0,userSelect:'none'}} 
                        src={props.state.url}
                    >

                    </iframe>
                    
                    {/* 一个透明图层，用于捕获事件 */}
                    {(!isNaN(pos.current.x) || !props.state.focus) ? <Box sx={{position:'absolute',top:0,left:0,bottom:0,right:0,userSelect:'none',background:'rgba(0,0,0,0.2)'}}/> : <></>}
                </Box>
            </Paper>
        </Fade>
    )
}

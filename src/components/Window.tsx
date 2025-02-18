import { IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import CloseIcon from '@mui/icons-material/Close';
import Process from "../features/Process";

export type WindowState = Process;

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
    const windowRef = useRef<HTMLDivElement>(null);
    const [mask, setMask] = useState(false);

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

    const forceMaximum:boolean = document.documentElement.clientWidth <= props.state.width || document.documentElement.clientHeight - 64 <= props.state.height;

    useEffect(() => {
        if (!props.state.poor) {
            return;
        }

        const callback = (ev:TransitionEvent) => {
            if (ev.type === 'transitionstart' && ['width', 'height'].includes(ev.propertyName)) {
                setMask(true)
            } else if (ev.type === 'transitionend' && ['width', 'height'].includes(ev.propertyName)) {
                setMask(false)
            }
        }

        windowRef.current?.addEventListener("transitionstart", callback);
        windowRef.current?.addEventListener("transitionend", callback);

        return () => {
            windowRef.current?.removeEventListener("transitionstart", callback);
            windowRef.current?.removeEventListener("transitionend", callback);
        }
    }, [props.state.poor, windowRef.current])

    return (
        <Paper 
            className="window"
            ref={windowRef}
            elevation={12}
            square={forceMaximum || props.state.maximum}
            sx={{
                position: 'absolute',
                top: props.state.minimum ? props.state.y + props.state.height/2 : forceMaximum || props.state.maximum ? 0 : props.state.y,
                left: props.state.minimum ? props.state.x + props.state.width/2 : forceMaximum || props.state.maximum ? 0 : props.state.x,
                zIndex: props.state.z,
                width: props.state.minimum ? 0 : forceMaximum || props.state.maximum ? '100%' : props.state.width,
                height: props.state.minimum ? 0 : forceMaximum || props.state.maximum ? '100%' : props.state.height,
                display: 'flex',
                flexDirection: 'column',
                background: forceMaximum || props.state.maximum ? 'rgb(221,227,233)' : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                overflow: 'hidden',
                transitionProperty: isNaN(pos.current.x) ? 'all': 'none', // 拖动时禁用动画
                transitionDuration: '200ms',
                transitionTimingFunction: 'ease',
            }}
            onMouseDown={() => {
                props.onClick?.();
            }}
            onTouchStart={() => {
                props.onClick?.();
            }}
        >
            <Box display='flex' alignItems='center' sx={{userSelect:'none'}}>
                
                <Box flexGrow={1} display='flex' alignItems='center' 
                    onMouseDown={(ev:any) => {
                        props.onClick?.();
                        if (forceMaximum || props.state.maximum) {
                            return;
                        }

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
                        if (forceMaximum || props.state.maximum) {
                            return;
                        }

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
                    <img style={{width:32, height:32, paddingLeft:8, paddingRight:8}} draggable='false' src={props.state.icon}></img>
                    <Typography>{props.state.title}</Typography>
                </Box>

                {
                    props.state.url ? 
                    <IconButton href={props.state.url} target="_blank">
                        <OpenInNewIcon color="primary"/>
                    </IconButton>
                    :
                    <></>
                }

                <IconButton onClick={()=>props.onMimimum?.(true)}>
                    <ExpandMoreIcon color="primary"/>
                </IconButton>

                {
                    forceMaximum ? <></> :
                    <IconButton onClick={()=>props.onMaximum?.(!props.state.maximum)}>
                        {props.state.maximum ? <UnfoldLessIcon  color="primary"/> : <UnfoldMoreIcon  color="primary"/>}
                    </IconButton>
                }
                
                <IconButton onClick={()=>{props.state.closeIsMinimum ? props.onMimimum?.(true) : props.onClose?.()}}>
                    <CloseIcon color="error"/>
                </IconButton>
            </Box>
            
            <Box flexGrow={1} sx={{position:'relative', overflow:'hidden', background:'#fff'}}>
                <Box sx={{width:'100%', height:'100%', overflow:'auto', display:mask?'none':'block', }}>
                    {
                        props.state.children ? 
                        <Suspense> {props.state.children} </Suspense> :
                        <iframe
                            style={{width:'100%', height:'100%',verticalAlign:'bottom',margin:0, padding:0, border:0,userSelect:'none'}} 
                            src={props.state.url}
                        />
                    }
                    
                    {/* 一个透明图层，用于捕获事件 */}
                    {(!isNaN(pos.current.x) || !props.state.focus) ? <Box sx={{position:'absolute',top:0,left:0,bottom:0,right:0,userSelect:'none',background:'rgba(0,0,0,0.1)'}}/> : <></>}
                </Box>
            </Box>
        </Paper>
    )
}

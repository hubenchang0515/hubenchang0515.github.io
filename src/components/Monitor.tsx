import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";

export default function Monitor() {
    const [fps, setFps] = useState(NaN);
    const [data, setData] = useState<number[]>(new Array(60).fill(0));

    useEffect(() => {
        let prevTime:DOMHighResTimeStamp = 0;
        let frames = 0;
        let loop = true;
        const callback = (t:DOMHighResTimeStamp) => {
            if (prevTime === 0) {
                prevTime = t;
            }

            frames += 1;

            if (t - prevTime >= 1000) {
                
                data.shift()
                setData([...data, frames*1000/(t - prevTime)]);
                setFps(frames*1000/(t - prevTime));
                prevTime = t;
                frames = 0;
            }

            if (loop) {
                window.requestAnimationFrame(callback);
            }
        }
        
        window.requestAnimationFrame(callback);

        return () => {
            loop = false;
        }
    }, [data]);

    return (
        <Box className='monitor' sx={{width:'100%', height:'100%', display:'flex', flexDirection:{xs:'column', md:'row'}}}>
            <Box sx={{width:'100%', height:'100%'}}>
                <LineChart
                    xAxis={[
                        {
                            data:Array.from(data.keys()),
                        }
                    ]}
                    yAxis={[
                        {
                            min: 0,
                            max: isNaN(fps) ? 60 : undefined,
                            colorMap:{
                                type: 'piecewise',
                                thresholds: [24, 55],
                                colors: ['#f44336', '#ff9800', '#00e676'],
                            }
                        },
                    ]}
                    series={[
                        {
                            label: `FPS:${fps.toFixed(2)}`,
                            data:data,
                            showMark:false,
                            color:'#2196f3'
                        },
                    ]}
                    grid={{ vertical: true, horizontal: true }}
                    skipAnimation
                />
            </Box>

            {
                'memory' in window.performance ?
                <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                    <Box sx={{width:'100%', height:'48%', display:'flex', flexDirection:'column'}}>
                        <Typography variant="h6" textAlign='center'>Memory Heap</Typography>
                        <Box sx={{width:'100%', height:'100%'}}>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            {id: 0, label: 'Used', color:'#f44336', value: (window.performance.memory as any).usedJSHeapSize},
                                            {id: 1, label: 'Alloced', color:'#ff9800', value: (window.performance.memory as any).totalJSHeapSize - (window.performance.memory as any).usedJSHeapSize},
                                            {id: 2, label: 'Free', color:'#2196f3', value: (window.performance.memory as any).jsHeapSizeLimit - (window.performance.memory as any).totalJSHeapSize},
                                        ],
                                        outerRadius: '75%',
                                        innerRadius: '50%',
                                    }
                                ]}
                            />
                        </Box>
                    </Box>
                    <Box sx={{width:'100%', height:'48%', display:'flex', flexDirection:'column'}}>
                        <Typography variant="h6" textAlign='center'>JS Heap</Typography>
                        <Box sx={{width:'100%', height:'100%'}}>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            {id: 0, label: 'Used', color:'#f44336', value: (window.performance.memory as any).usedJSHeapSize},
                                            {id: 1, label: 'Free', color:'#2196f3', value: (window.performance.memory as any).totalJSHeapSize - (window.performance.memory as any).usedJSHeapSize},
                                        ],
                                        outerRadius: '75%',
                                        innerRadius: '50%',
                                    }
                                ]}
                            />
                        </Box>
                    </Box>
                </Box>
                :<></>
            }
        </Box>
    )
}
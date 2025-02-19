import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart, PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";
import { UPTIME_ROBOT } from "../config";

export default function Monitor() {
    const [fps, setFps] = useState(NaN);
    const [fpsQueue, setFpsQueue] = useState<number[]>(new Array(60).fill(0));
    const [uptimeDate, setUptimeDate] = useState<string[]>([]);
    const [uptimeRatio, setUptimeRatio] = useState<number[]>([]);
    const [totalRatio, setTotalRatio] = useState(100);
    const [uptimeUrl, setUptimeUrl] = useState(window.location.href);

    useEffect(() => {
        const url = 'https://api.uptimerobot.com/v2/getMonitors';
        const options = { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `api_key=${UPTIME_ROBOT.KEY}&custom_uptime_ratios=30&logs=1`
        };

        fetch(url, options).then((response) => {
            response.json().then((data) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const date = Array.from(Array(30), (_, i) => {
                    const day = new Date(); 
                    day.setDate(today.getDate() - 29 + i);
                    day.setHours(0, 0, 0, 0);
                    return day.toLocaleDateString()
                });
                
                const downtime = Array(30).fill(0);
                for (const log of data.monitors[0].logs) {
                    const day = new Date(log.datetime * 1000);
                    day.setHours(0, 0, 0, 0);

                    const diff = today.getTime() - day.getTime();
                    const index = 29 - diff / (1000 * 60 * 60 * 24);
                    if (log.type !== 2 && log.type !== 98) {
                        downtime[index] += log.duration;
                    }
                }
                
                const ratio = Array.from(Array(30), (_, i) => {
                    return Number((100 - 100 * downtime[i] / (60 * 60 * 24)).toFixed(2));
                });
                
                setUptimeDate(date);
                setUptimeRatio(ratio);
                setTotalRatio(Number(data.monitors[0].custom_uptime_ratio));
                setUptimeUrl(data.monitors[0].url);
            }).catch((reason) => {
                console.error(reason);
            })
        }).catch((reason) => {
            console.error(reason);
        })
    }, []);

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
                
                fpsQueue.shift()
                setFpsQueue([...fpsQueue, frames*1000/(t - prevTime)]);
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
    }, [fpsQueue]);

    return (
        <Box className='monitor' sx={{width:'100%', height:'100%', display:'flex', flexDirection:{xs:'column', md:'row'}}}>
            <Box sx={{width:'100%', height:'100%'}}>
                <LineChart
                    xAxis={[
                        {
                            data: Array.from(fpsQueue.keys()),
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
                            data:fpsQueue,
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
                                            {id: 1, label: 'Allocated', color:'#ff9800', value: (window.performance.memory as any).totalJSHeapSize - (window.performance.memory as any).usedJSHeapSize},
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
                        <Typography variant="h6" textAlign='center'>Uptime ({totalRatio.toFixed(2)}%)</Typography>
                        <Box sx={{width:'100%', height:'100%'}}>
                            <BarChart
                                series={[
                                    {
                                        data: uptimeRatio,
                                        label: uptimeUrl,
                                    }
                                ]}
                                xAxis={[
                                    {
                                        data: uptimeDate,
                                        scaleType:'band',
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
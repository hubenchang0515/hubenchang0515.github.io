import { Box } from "@mui/material";
import Giscus from '@giscus/react';

export default function Discuss() {
    return (
        <Box className='discuss' sx={{width:'100%', height:'100%', boxSizing:'border-box', padding:1, background:'#fff'}}>
            <Giscus
                id="comments"
                repo="hubenchang0515/hubenchang0515.github.io"
                repoId="MDEwOlJlcG9zaXRvcnkxNjY3NDkzMjk="
                category="Announcements"
                categoryId="DIC_kwDOCfBkkc4Cmpkr"
                mapping="url"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="light"
                lang="en"
                loading="lazy"
                />
        </Box>
    )
}
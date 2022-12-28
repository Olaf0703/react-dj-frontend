import { useEffect, useRef, FC } from 'react';
import 'plyr-react/dist/plyr.css';
import Plyr from 'plyr-react';
import { TUTORIAL_VDO_DG_HEIGHT, TUTORIAL_VDO_DG_WIDTH } from 'constants/common';

interface VideoPlayerProps {
    src: string
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
    src,
}) => {
    // export const VideoPlayer = () => {
    //   const ref = useRef(null);
    //   useEffect(() => {
    //     const loadVideo = async () => {
    //       const video:any = document.getElementById('plyr')!;
    //       const hls = new Hls();
    //       hls.loadSource(
    //         src
    //       );
    //       hls.attachMedia(video);
    //     //   ref!.current.plyr.media = video;

    //     //   hls.on(Hls.Events.MANIFEST_PARSED, function () {
    //     //     ref!.current.plyr.play();
    //     //   });
    //     };
    //     loadVideo();
    //   });

    return (
        <Plyr
            style={{width: TUTORIAL_VDO_DG_WIDTH, height: TUTORIAL_VDO_DG_HEIGHT}}
            id='plyr'
            options={{
                // ads: {
                //     enabled: true,
                //     publisherId: 'sd',
                //     tagUrl:
                //         'https://napi.arvancloud.com/vod/channels/c49885f0-11e3-4f15-b0a4-68392958643b/ads'
                // },
                quality: {
                    default: 576,
                    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
                },
                settings: ['captions', 'quality', 'speed', 'loop']
            }}
            source={{
                type: 'video',
                sources: [
                    { src: src }
                ]
            }}
        //   ref={ref}
        />
    );
};


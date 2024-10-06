import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowSize from '../../hooks/useWindow';
import { getLoadingSpinner } from '../../assets/inline-svgs';

const MyTalks = ({ videos }) => {

    const [width] = useWindowSize();

    return (
        <div className='container pt-5'>
            <h1 style={{ 'fontWeight': 800 }} className='mt-5 mt-md-0 pt-5 pb-3'>MY TALKS</h1>
            {Object.values(videos.items).length !== 0 ? <Swiper
                parallax={true}
                spaceBetween={90}
                slidesPerView={width >= 1280 ? 2 : 1}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 2500, pauseOnMouseEnter: true }}>
                {videos.items.map((video, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" width="512"
                                    height="288" loading='lazy' src={video.fields.youTubeEmbedUrl}
                                    title={video.fields.name} frameBorder={0} order="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper> : <div className='mt-5'>{getLoadingSpinner()}</div>}
        </div>
    );
}

export default MyTalks;

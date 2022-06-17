import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import useWindowSize from '../../hooks/useWindow';

const Experience = () => {

    const [width] = useWindowSize()

    return (
        <div>
            <div className="container">
          <h1 className="pb-3" style={{ textAlign: 'center', fontWeight: 800 }}>EXPERIENCE</h1>
          <Swiper
            spaceBetween={30}
            slidesPerView={width >= 1000 ? 3 : 1}
            pagination={{ clickable: true, dynamicBullets: true  }}
            autoplay={{ delay: 2500 }}>
            <SwiperSlide>
              <div className="p-3" style={{
                minHeight: '200px',
                backgroundColor: 'rgb(230, 230, 230)'
              }} >
                <a href='https://harness.io/' style={{textDecoration: 'none'}} target='_blank' rel='noreferrer'>
                  <h5 style={{fontWeight: '700', color: 'black'}}>Software Engineer II, Harness</h5>
                </a>
                <h5>Full-Time</h5>
                <h6>March, 2022 - Present</h6>
                <p className="pt-2">
                Harness is the industry&apos;s first Software Delivery Platform to use AI to simplify the DevOps processes - CI, CD, Feature Flags, Cloud Costs, Chaos Engineering and much more.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-3" style={{
                minHeight: '200px',
                backgroundColor: 'rgb(230, 230, 230)'
              }} >
                <a href='https://chaosnative.com/' style={{textDecoration: 'none'}} target='_blank' rel='noreferrer'>
                  <h5 style={{fontWeight: '700', color: 'black'}}>Software Engineer I, ChaosNative</h5>
                </a>
                <h5>Full-Time Internship</h5>
                <h6>May, 2021 - Mar, 2022</h6>
                <p className="pt-2">
                  ChaosNative is the founder of the LitmusChaos project, a CNCF incubating project for performing Chaos Engineering at scale in Cloud-Native environments.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-3" style={{
                minHeight: '200px',
                backgroundColor: 'rgb(230, 230, 230)'
              }} >
                <a href='https://highradius.com/' style={{textDecoration: 'none'}} target='_blank' rel='noreferrer'>
                  <h5 style={{fontWeight: '700', color: 'black'}}>Project Intern, HighRadius</h5>
                </a>
                <h5>Internship</h5>
                <h6>Jan, 2021 - Mar, 2021</h6>
                <p className="pt-2">
                  HighRadius is a Fintech SaaS company that provides AI-based Autonomous Systems to 600+ companies for automating their Accounts Receivable and Treasury processes.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        </div>
    );
}

export default Experience;

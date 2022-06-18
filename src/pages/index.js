import * as THREE from 'three';
import TOPOLOGY from 'vanta/dist/vanta.waves.min';
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useState, useRef } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import Typewriter from 'typewriter-effect';

import AboutMe from '../components/about-me/about-me';
import ProjectsPreview from '../components/projects-preview/projects-preview'
import Experience from '../components/experience/experience';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { getLoadingSpinner } from '../assets/inline-svgs';
import { db } from '../services/firebase'
import useWindowSize from '../hooks/useWindow';

import '../styles/Home.module.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

export default function Home() {

  const [vantaEffect, setVantaEffect] = useState(0)
  const [projects, setProjects] = useState([])
  const [videos, setVideos] = useState([])
  const myRef = useRef(null)
  const [width] = useWindowSize();

  useEffect(() => {

    if (!vantaEffect) {
      setVantaEffect(TOPOLOGY({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.00,
        scaleMobile: 1.00,
        minHeight: 200.00,
        minWidth: 200.00,
        THREE: THREE,
        color: 0x0,
        shininess: 64.00,
        waveHeight: 21.50,
        waveSpeed: 0.50,
        zoom: 0.84
      }))
    }

    return () => {
      if (vantaEffect)
        vantaEffect.destroy()
    }

  }, [vantaEffect])

  useEffect(() => {
    db.collection('videos')
      .orderBy('dateTime', 'desc')
      .onSnapshot(snap => {
        const newVideos = snap.docs.map(doc => ({
          ...doc.data()
        }))
        setVideos(newVideos)
      })

    return () => {
      setVideos({})
    }
  }, [])

  useEffect(() => {
    db.collection('projects')
      .orderBy('dateTime', 'desc')
      .limit(3)
      .onSnapshot(snap => {
        const newProjects = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProjects(newProjects)
      })

    return () => {
      setProjects({})
    }
  }, [])

  return (
    <div>
      <Navbar />

      <section ref={myRef} style={{ color: 'white', minHeight: '100vh' }}>
        <div style={{ backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,1))', minHeight: '100vh' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
            <div>
              <h1 style={{ fontWeight: 800 }}>{"Hello, I'm Neelanjan!"}</h1>
              <h3>
                <Typewriter
                  options={{
                    pauseFor: 1000,
                    strings: [
                      "I'm a Software Development Engineer at Harness",
                      "I'm a Cloud-Native Enthusiast",
                      "I'm an Open-Source Contributor",
                      "I develop LitmusChaos (a CNCF incubating project)"
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    deleteSpeed: 20
                  }}
                />
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section style={{ color: 'white', minHeight: '100vh' }} id="about-me">
        <AboutMe />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0xc0b0e" fillOpacity="1" d="M0,160L720,96L1440,192L1440,0L720,0L0,0Z"></path>
        </svg>
      </section>

      <section style={{ minHeight: width >= 1280 ? '65vh' : '95vh' }} id="my-talks">
        <div className='container pt-5'>
          <h1 style={{ 'fontWeight': 800 }} className='mt-5 mt-md-0 pt-5 pb-3'>MY TALKS</h1>
          {videos.length !== 0 ? <Swiper
            parallax={true}
            spaceBetween={90}
            slidesPerView={width >= 1280 ? 2 : 1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 2500, pauseOnMouseEnter: true }}>
            {Object.values(videos).map((video, i) => {
              return <SwiperSlide key={i}>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" width="512" height="288" loading='lazy' src={video.embedURL} title="YouTube" frameBorder={0} order="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </SwiperSlide>
            })}
          </Swiper> : <div className='mt-5'>{getLoadingSpinner()}</div>}
        </div>
      </section>

      <section style={{ minHeight: '100vh' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgb(230, 230, 230)" fillOpacity="1" d="M0,256L720,224L1440,288L1440,320L720,320L0,320Z"></path>
        </svg>
        <div style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
          <div className="container">
            <h1 style={{ textAlign: 'center', fontWeight: 800 }} className="m-0">MY PROJECTS</h1>
            {projects.length !== 0 ? Object.values(projects).map((project, i) => {
              if (i % 2 === 0)
                return <ProjectsPreview orientation="lr"
                  title={project.title}
                  domain={project.domain}
                  description={project.description}
                  imageURL={project.image}
                  github={project.github ? project.github : null}
                  deployedLink={project.deployedLink ? project.deployedLink : null}
                  key={project.id} />
              else
                return <ProjectsPreview orientation="rl"
                  title={project.title}
                  domain={project.domain}
                  description={project.description}
                  imageURL={project.image}
                  github={project.github ? project.github : null}
                  deployedLink={project.deployedLink ? project.deployedLink : null}
                  key={project.id} />
            }) : <div className='my-5'>{getLoadingSpinner()}</div>}
            <center>
              <button onClick={() => history.push('/projects')}
                className="btn btn-outline-secondary"
                style={{ borderRadius: '0' }}>View More</button>
            </center>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgb(230, 230, 230)" fillOpacity="1" d="M0,0L720,128L1440,64L1440,0L720,0L0,0Z"></path>
        </svg>
      </section>

      <section className="mb-5">
        <Experience />
      </section>

      <Footer />
    </div>
  )
}

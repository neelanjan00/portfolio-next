import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { useState } from 'react';

import Header from '../components/header/header';
import AboutMe from '../components/about-me/about-me';
import MyTalks from '../components/my-talks/my-talks';
import ProjectsPreview from '../components/projects-preview/projects-preview'
import Experience from '../components/experience/experience';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { getLoadingSpinner } from '../assets/inline-svgs';
import { client } from '../services/contentful/client';
import ReactVisibilitySensor from 'react-visibility-sensor';
import { useRouter } from 'next/router';

import useWindowSize from '../hooks/useWindow';

import generateRssFeed from '../services/rss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

export default function Home({ videos, projects }) {

  const [width] = useWindowSize();

  const [isAboutMeVisible, setIsAboutMeVisible] = useState(false);
  const [isMyTalksVisible, setIsMyTalksVisible] = useState(false);

  const router = useRouter();

  return (
    <div>
      <Navbar isAboutMeVisible={isAboutMeVisible} isMyTalksVisible={isMyTalksVisible} />

      <section style={{ color: 'white' }}>
        <Header />
      </section>

      <section style={{ color: 'white', minHeight: '100vh' }} id="about-me">
        <ReactVisibilitySensor onChange={isVisible => setIsAboutMeVisible(isVisible)} partialVisibility={true} offset={{ bottom: 800 }}>
          <AboutMe />
        </ReactVisibilitySensor>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0xc0b0e" fillOpacity="1" d="M0,160L720,96L1440,192L1440,0L720,0L0,0Z"></path>
        </svg>
      </section>

      <section style={{ minHeight: width >= 1280 ? '65vh' : '95vh' }} id="my-talks">
        <ReactVisibilitySensor onChange={isVisible => setIsMyTalksVisible(isVisible)} partialVisibility={true} offset={{ bottom: 500 }}>
          <MyTalks videos={videos} />
        </ReactVisibilitySensor>
      </section>

      <section style={{ minHeight: '100vh' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgb(230, 230, 230)" fillOpacity="1" d="M0,256L720,224L1440,288L1440,320L720,320L0,320Z"></path>
        </svg>
        <div style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
          <div className="container">
            <h1 style={{ textAlign: 'center', fontWeight: 800 }} className="m-0">MY PROJECTS</h1>
            {
              projects.items.length !== 0 ?
                Object.values(projects.items).map((project, i) => {
                  var orientation = "rl"
                  if (i % 2 === 0)
                    orientation = "lr"

                  return <ProjectsPreview orientation={orientation}
                    title={project.fields.title}
                    domain={project.fields.domain}
                    description={project.fields.description}
                    imageURL={"https:" + project.fields.image.fields.file.url}
                    github={project.fields.githubUrl ? project.fields.githubUrl : null}
                    deployedLink={project.fields.deployedLink ? project.fields.deployedLink : null}
                    key={i} />
                })
              :
                <div className='my-5'>{getLoadingSpinner()}</div>
            }
            <center>
              <button onClick={() => router.push('/projects')}
                className="btn btn-outline-secondary rounded-sm"
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

export async function getStaticProps() {
  try {
    await generateRssFeed();

    const videosRef = await client.getEntries({
      content_type: 'talkVideo',
      order: '-fields.date'
    });

    const projectsRef = await client.getEntries({
      content_type: 'project',
      order: '-fields.date',
      limit: 3
    });

    console.log

    return {
      props: {
        videos: videosRef,
        projects: projectsRef,
        revalidate: 86400
      },
    }
  } catch (err) {
    console.log(err);
  }
}
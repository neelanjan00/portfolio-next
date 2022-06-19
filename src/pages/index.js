import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import Header from '../components/header/header';
import AboutMe from '../components/about-me/about-me';
import MyTalks from '../components/my-talks/my-talks';
import ProjectsPreview from '../components/projects-preview/projects-preview'
import Experience from '../components/experience/experience';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { getLoadingSpinner } from '../assets/inline-svgs';
import { db } from '../services/firebase';

import useWindowSize from '../hooks/useWindow';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

export default function Home({ videos, projects }) {

  const [width] = useWindowSize();

  return (
    <div>
      <Navbar />

      <section style={{ color: 'white' }}>
        <Header />
      </section>

      <section style={{ color: 'white', minHeight: '100vh' }} id="about-me">
        <AboutMe />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0xc0b0e" fillOpacity="1" d="M0,160L720,96L1440,192L1440,0L720,0L0,0Z"></path>
        </svg>
      </section>

      <section style={{ minHeight: width >= 1280 ? '65vh' : '95vh' }} id="my-talks">
        <MyTalks videos={videos} />
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

export async function getStaticProps() {
  const videosRef = db.collection('videos');
  const projectsRef = db.collection('projects');
  try {
    const videosSnapshot = await videosRef.orderBy('dateTime', 'desc').get();
    const videos = videosSnapshot.docs.map(doc => ({ ...doc.data() }));
    const projectsSnapshot = await projectsRef.orderBy('dateTime', 'desc').limit(3).get();
    const projects = projectsSnapshot.docs.map(doc => ({ ...doc.data() }));

    return {
      props: {
        videos,
        projects
      },
      revalidate: 86400
    }
  } catch (err) {
    console.log(err);
  }
}
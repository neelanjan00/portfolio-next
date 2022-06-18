import { db } from '../services/firebase';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import ProjectsPreview from '../components/projects-preview/projects-preview';
import { getLoadingSpinner } from '../assets/inline-svgs';

const Projects = ({ projectsMetadata }) => {

    return (
        <div>
            <Navbar />

            <div className="container">
                <h1 style={{ textAlign: 'center', fontWeight: '800' }}>MY PROJECTS</h1>
                {projectsMetadata.length !== 0 ? Object.values(projectsMetadata).map((project, i) => {
                    if (i % 2 === 0)
                        return <ProjectsPreview orientation="lr"
                            title={project.title}
                            domain={project.domain}
                            description={project.description}
                            imageURL={project.image}
                            github={project.github ? project.github : null}
                            deployedLink={project.deployedLink ? project.deployedLink : null}
                            key={i} />
                    else
                        return <ProjectsPreview orientation="rl"
                            title={project.title}
                            domain={project.domain}
                            description={project.description}
                            imageURL={project.image}
                            github={project.github ? project.github : null}
                            deployedLink={project.deployedLink ? project.deployedLink : null}
                            key={i} />
                }) : <div className='mt-5'>{getLoadingSpinner()}</div>
                }
            </div>

            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const projectsRef = db.collection('projects')
    try {
        const projectsSnapshot = await projectsRef.orderBy('dateTime', 'desc').get();
        const projectsMetadata = projectsSnapshot.docs.map(doc => ({ ...doc.data() }));

        return {
            props: {
                projectsMetadata
            },
            revalidate: 86400
        }
    } catch (err) {
        console.log(err);
    }
}

export default Projects;
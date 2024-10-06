import { client } from '../services/contentful/client';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import ProjectsPreview from '../components/projects-preview/projects-preview';
import { getLoadingSpinner } from '../assets/inline-svgs';

const Projects = ({ projects }) => {
    return (
        <div style={{ marginTop: '100px' }}>
            <Navbar />

            <div className="container">
                <h1 style={{ textAlign: 'center', fontWeight: '800' }}>MY PROJECTS</h1>
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
                        <div className='mt-5'>{getLoadingSpinner()}</div>
                }
            </div>

            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    try {
        const projectsRef = await client.getEntries({
            content_type: 'project',
            order: '-fields.date',
        });

        return {
            props: {
                projects: projectsRef,
                revalidate: 86400
            },
        }
    } catch (err) {
        console.log(err);
    }
}

export default Projects;
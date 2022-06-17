import React from 'react'
import { getGithubIcon, getDeployedLinkIcon } from '../../assets/inline-svgs'
import useWindowSize from '../../hooks/useWindow'

const ProjectsPreview = (props) => {

    const [width] = useWindowSize()

    if (props.orientation === 'lr' || width < 1280 ) {
        return (
            <div className="py-5">
                <div className="row">
                    <div className="col-lg-6" style={{
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src={props.imageURL} width="400" alt={props.title}
                            className="img-fluid" />
                    </div>
                    <div className="col-lg-6" style={{
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{ fontWeight: '600', marginTop: width > 1280 ? '0' : '10px' }}>{props.title}</h3>
                            <h6>{props.domain}</h6>
                            <h5 className="py-1">{props.description}</h5>
                            <div>
                                {
                                    props.github ?
                                        (
                                            <a href={props.github} target="_blank" rel="noopener noreferrer">
                                                {getGithubIcon('black')}
                                            </a>
                                        ) : null
                                }

                                {
                                    props.deployedLink ?
                                        (
                                            <a href={props.deployedLink} target="_blank" rel="noopener noreferrer">
                                                {getDeployedLinkIcon('black')}
                                            </a>
                                        ) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="py-5">
                <div className="row">
                    <div className="col-lg-6" style={{
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{ fontWeight: '600' }}>{ props.title }</h3>
                            <h6>{ props.domain }</h6>
                            <h5>{ props.description }</h5>
                            <div>
                                {
                                    props.github ?
                                        (
                                            <a href={props.github} target="_blank" rel="noopener noreferrer">
                                                {getGithubIcon('black')}
                                            </a>
                                        ) : null
                                }

                                {
                                    props.deployedLink ?
                                        (
                                            <a href={props.deployedLink} target="_blank" rel="noopener noreferrer">
                                                {getDeployedLinkIcon('black')}
                                            </a>
                                        ) : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img src={props.imageURL}
                            width="400" alt={props.title} className="img-fluid" />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsPreview;
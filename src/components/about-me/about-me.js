import React from 'react';
import Image from 'next/image';
import useWindowSize from '../../hooks/useWindow';
import { getTwitterIcon, getLinkedInIcon, getGithubIcon, getEmailIcon, getRSSIcon } from '../../assets/inline-svgs';

const AboutMe = () => {
  const [width] = useWindowSize()

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div className="container pt-5">
        <h1 style={{ fontWeight: 800 }} className='pt-5'>ABOUT ME</h1>
        <div className="row">
          <div className="col-lg-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src="/portrait.png" alt="portrait" width="600" height="600" className="img-fluid"
              style={{ padding: width > 990 ? '0 0 0 0' : '0px 10vw 10vw 10vw' }} loading='lazy' />
          </div>
          <div className="col-lg-7 ml-1">
            <h5 className="mb-0" style={{ textAlign: 'justify' }}>
              I&apos;m a Software Engineer who believes that Software Engineering is not about programming.
              For me, software engineering has been about learning to better understand the problems to be solved and being responsible
              about how my software influences the end-user. <br />
              <br />
              I am a Software Development Engineer working at <a href='https://harness.io/' target="_blank" rel="noopener noreferrer">Harness</a> and
              a core contributor to <a href="https://litmuschaos.io/" target="_blank" rel="noopener noreferrer">LitmusChaos</a>, a CNCF Incubating project
              for performing Chaos Engineering in cloud-native environments. Prior to joining Harness, I have been an SDE intern at <a href='https://chaosnative.com/'
                target="_blank" rel="noopener noreferrer">ChaosNative</a>, the company behind the LitmusChaos framework, where I found the opportunity
              to step into the cloud-native realm, explore the magic of Kubernetes, and ofcourse develop LitmusChaos. While I am not solving problems
              and writing code, I love to share my learnings with fellow software engineers with my technical <a href="/blogs">blogs</a>. I tend
              to write on a variety of topics including Chaos Engineering, Kubernetes, Docker, LitmusChaos to name a few.<br />
              <br />
              Additionally, I am always on the lookout to be a part of open source meetups and tech conferences, either as an attendee or even better,
              as a speaker. I have been a speaker in multiple international and domestic meetups and conferences including <a href='https://community.cncf.io/events/details/cncf-kcd-bengaluru-presents-kubernetes-community-days-bengaluru-2022-virtual-event/' target="_blank" rel="noopener noreferrer">
                KCD Bengaluru 2022</a>, <a href='https://chaoscarnival.io/' target="_blank" rel="noopener noreferrer">ChaosCarnival 2022
              </a>, <a href='https://community.cncf.io/cloud-native-scale/' target="_blank" rel="noopener noreferrer">CNCF Cloud native @Scale Meetup
              </a>, <a href='https://community.cncf.io/kubernetes-chaos-engineering-meetup-group/' target="_blank" rel="noopener noreferrer">CNCF Chaos
                Engineering Meetup</a> and <a href='https://www.meetup.com/Kubernetes-Sri-Lanka/' target="_blank" rel="noopener noreferrer">Kubernetes Sri Lanka Meetup</a>.<br />
              <br />
              Beyond the buzz of the tech life, I cherish a steaming pot of coffee and a hardcover book on rainy days and a long walk through the woods on summer evenings.
            </h5>
            <div className="pt-4">
              <a href="https://www.github.com/neelanjan00" target="_blank" rel="noopener noreferrer">
                {getGithubIcon('white')}
              </a>
              <a href="https://www.linkedin.com/in/neelanjan00" target="_blank" rel="noopener noreferrer">
                {getLinkedInIcon('white')}
              </a>
              <a href="https://www.twitter.com/NeelanjanManna" target="_blank" rel="noopener noreferrer">
                {getTwitterIcon('white')}
              </a>
              <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
                {getRSSIcon('white')}
              </a>
              <a href="mailto:hi@neelanjan.dev" target="_blank" rel="noopener noreferrer">
                {getEmailIcon('white')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;

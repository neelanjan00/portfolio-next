import Typewriter from 'typewriter-effect';

import styles from '../../styles/header.module.css';
import useWindowSize from '../../hooks/useWindow';

const Header = () => {

  const [width] = useWindowSize();

  return (
    <ul className={styles.background}>
      <li style={{display: width >= 1280 ? 'inherit' : 'none'}} />
      <li style={{display: width >= 1280 ? 'inherit' : 'none'}} />
      <li style={{display: width >= 1280 ? 'inherit' : 'none'}} />
      <li style={{display: width >= 1280 ? 'inherit' : 'none'}} />
      <li style={{display: width >= 1280 ? 'inherit' : 'none'}} />
      <li style={{display: width >= 1280 ? 'inherit' : 'none'}} />
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
    </ul>
  );
}

export default Header;

import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  // Initialize the state to store the scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Handler function to update scroll position
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };

    // Add the scroll event listener to the window object
    window.addEventListener('scroll', updateScrollPosition);

    // Initial setting of the scroll position when the hook is first mounted
    updateScrollPosition();

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return scrollPosition;
};

export default useScrollPosition;
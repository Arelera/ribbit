import { useEffect, useRef, useState } from 'react';

const useVisible = (initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const ref = useRef(null);

  // if click target is not inside the ref, hide our ref component
  const outsideClickHandler = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', outsideClickHandler, true);

    return () => {
      document.removeEventListener('click', outsideClickHandler, true);
    };
  }, []);

  return [isVisible, setIsVisible, ref];
};

export default useVisible;

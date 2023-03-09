import { useEffect, useRef } from 'react';

export function useOutsideClick(cb) {
  const ref = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (ref.current === null || ref.current.contains(e.target)) {
        return;
      }

      cb(e);
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return ref;
}

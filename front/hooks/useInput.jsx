import { useCallback, useState } from 'react';

export default (init=null) => {
  const [value, setValue] = useState(init);
  const handle= useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handle, setValue];
};

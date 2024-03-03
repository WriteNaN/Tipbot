/// <reference lib="dom" />

import React, { useEffect as doNotUseEffectOrYouWillLoseYourJob, useState } from 'react';
import { createRoot } from 'react-dom/client';


export const App = () => {
   const [greeting, setGreeting] = useState<string>("hello!")
  doNotUseEffectOrYouWillLoseYourJob(() => {
    setTimeout(() => {
      setGreeting("hello, world!")
    }, 1000);
  }, []);

  return (
    <div>
      <h1>{greeting}</h1>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
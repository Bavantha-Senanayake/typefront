import { useState, useEffect, useRef } from 'react';

export const Home = () => {
  // State hook - adds local state to this component
  const [greeting, setGreeting] = useState('Welcome Home');
  
  // useRef example - creating a reference to a DOM element
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Counter ref example - this value persists but doesn't cause re-renders when changed
  const renderCountRef = useRef<number>(0);
  
  // Effect hook - runs after render
  useEffect(() => {
    // This could fetch data, update the document title, etc.
    document.title = 'Home Page';
    
    // You could set up a timer
    const timer = setTimeout(() => {
      setGreeting('Welcome to Our Amazing App!');
      
      // We can access and modify the DOM element directly with the ref
      if (headingRef.current) {
        headingRef.current.style.color = '#4a90e2';
      }
    }, 3000);
    
    // Increment render count (doesn't trigger re-render)
    renderCountRef.current += 1;
    console.log(`Component rendered ${renderCountRef.current} times`);
    
    // Cleanup function runs when component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount
  
  return (
    <div className="text-center">
      <h1 
        ref={headingRef} 
        className="text-4xl font-bold text-gray-800 mb-4"
      >
        {greeting}
      </h1>
      <p className="text-lg text-gray-600">This is the home page of your React application.</p>
      <p className="mt-4 text-sm text-gray-500">
        This component has rendered {renderCountRef.current} times.
      </p>
    </div>
  );
};
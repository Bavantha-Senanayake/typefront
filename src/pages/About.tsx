export const About = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-lg text-gray-600 mb-4">Learn more about our application.</p>
      <div className="bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto">
        <p className="text-gray-700">
          This is a React application built with TypeScript, Redux Toolkit, and Tailwind CSS.
          It demonstrates modern web development practices with routing, state management, and styling.
        </p>
      </div>
    </div>
  );
};
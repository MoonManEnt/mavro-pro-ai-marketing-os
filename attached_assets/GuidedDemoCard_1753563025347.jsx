import React from 'react';

export const GuidedDemoCard = () => {
  const launchDemo = () => {
    alert('Launching ViVi Guided Walkthrough...');
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2">Need a Demo?</h2>
      <p>Walk through the platform features with ViVi as your guide.</p>
      <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded" onClick={launchDemo}>Launch Demo</button>
    </div>
  );
};

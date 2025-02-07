import React from 'react';

function TipsSection() {
  return (
    <div className="mt-8 p-4 bg-light-100 dark:bg-dark-200 rounded-lg">
      <h3 className="font-minecraft text-lg mb-3 text-dark-200 dark:text-light-100">Tips</h3>
      <ul className="space-y-2 text-muted-100 dark:text-light-300 text-sm">
        <li>• 1 block in the Nether = 8 blocks in the Overworld</li>
        <li>• Y coordinates remain the same in both dimensions</li>
        <li>• Build your portal at Y=64 in the Overworld for easy access</li>
        <li>• The Nether ceiling is at Y=128</li>
        <li>• For best results, build portals in the Nether first</li>
      </ul>
    </div>
  );
}

export default TipsSection;
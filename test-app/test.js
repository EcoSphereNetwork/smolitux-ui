const { Button } = require('@smolitux/core');

console.log('Button component:', Button);

// Test other components
try {
  const utils = require('@smolitux/utils');
  console.log('Utils loaded successfully');
  
  const core = require('@smolitux/core');
  console.log('Core components loaded successfully:', Object.keys(core));
  
  const ai = require('@smolitux/ai');
  console.log('AI components loaded successfully:', Object.keys(ai));
  
  const blockchain = require('@smolitux/blockchain');
  console.log('Blockchain components loaded successfully:', Object.keys(blockchain));
  
  const resonance = require('@smolitux/resonance');
  console.log('Resonance components loaded successfully:', Object.keys(resonance));
} catch (error) {
  console.error('Error loading components:', error);
}
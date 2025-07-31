
console.log('🧹 Clearing invalid authentication tokens...');
localStorage.removeItem('authToken');
localStorage.removeItem('user'); 
localStorage.setItem('tokenCleared', Date.now().toString());
console.log('✅ Authentication cleared. Please refresh the page to re-authenticate.');


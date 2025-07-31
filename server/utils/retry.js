// Retry utility for robust API calls
export async function retry(fn, maxAttempts = 3, delay = 1000) {
  let attempt = 1;
  
  while (attempt <= maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      
      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`, error.message);
      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
      delay *= 1.5; // Exponential backoff
    }
  }
}

export default retry;
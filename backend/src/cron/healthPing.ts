import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

interface RandomRequestConfig {
  endpoint: string;
  method: 'GET' | 'POST';
  description: string;
}

const randomRequests: RandomRequestConfig[] = [
  {
    endpoint: '/health',
    method: 'GET',
    description: 'Health check'
  },
  {
    endpoint: '/tasks/stats/overview',
    method: 'GET',
    description: 'Get task statistics'
  },
  {
    endpoint: '/tasks',
    method: 'GET',
    description: 'Get all tasks'
  },
  {
    endpoint: '/tasks?status=PENDING',
    method: 'GET',
    description: 'Get pending tasks'
  },
  {
    endpoint: '/tasks?priority=HIGH',
    method: 'GET',
    description: 'Get high priority tasks'
  }
];

async function sendRandomRequest(): Promise<void> {
  try {
    // Select a random request
    const randomIndex = Math.floor(Math.random() * randomRequests.length);
    const requestConfig = randomRequests[randomIndex];
    
    const url = `${API_BASE_URL}${requestConfig.endpoint}`;
    
    console.log(`[${new Date().toISOString()}] Sending ${requestConfig.method} request to: ${requestConfig.endpoint}`);
    console.log(`Description: ${requestConfig.description}`);
    
    const response = await fetch(url, {
      method: requestConfig.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CronJob-HealthPing/1.0'
      },
      timeout: 10000 // 10 second timeout
    });
    
    if (response.ok) {
      console.log(`✅ Success: ${response.status} ${response.statusText}`);
    } else {
      console.log(`⚠️  Warning: ${response.status} ${response.statusText}`);
    }
    
  } catch (error) {
    console.error(`❌ Error sending request:`, error instanceof Error ? error.message : error);
  }
}

// If this script is run directly (not imported)
if (require.main === module) {
  sendRandomRequest()
    .then(() => {
      console.log('Random request completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to send random request:', error);
      process.exit(1);
    });
}

export { sendRandomRequest };

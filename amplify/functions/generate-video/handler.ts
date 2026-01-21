import type { Schema } from '../../data/resource';

export const handler: Schema["generateVideo"]["functionHandler"] = async (event) => {
  const { prompt } = event.arguments;
  const EC2_IP = "18.209.117.26"; 
  
  // Use process.env to grab your password safely
  const API_KEY = process.env.GPU_SECRET; 

  try {
    const response = await fetch(`http://18.209.117.26:5000/generate`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": API_KEY || "" 
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) throw new Error(`GPU Error: ${response.status}`);

    const result = await response.json() as { video_url: string };
    return result.video_url; 

  } catch (error) {
    console.error("Connection Failed:", error);
    throw new Error("Failed to connect to GPU instance. Is worker.py running?");
  }
};

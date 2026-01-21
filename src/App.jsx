import { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

Amplify.configure(outputs);
const client = generateClient();

function App() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt) return;
    setLoading(true);
    setVideoUrl(null);
    try {
      const { data, errors } = await client.queries.generateVideo({ prompt });
      if (errors) {
        alert("Server is busy. Please try again in a moment.");
      } else {
        setVideoUrl(data);
      }
    } catch (e) {
      alert("Connection to GPU lost. Check if EC2 is online.");
    }
    setLoading(false);
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="main-container">
          <nav className="navbar">
            <h1 className="logo">Visionary<span>AI</span></h1>
            <div className="user-section">
              <span>{user?.signInDetails?.loginId}</span>
              <button onClick={signOut} className="signout-btn">Sign Out</button>
            </div>
          </nav>

          <div className="hero-section">
            <div className="glass-card">
              <h2>Create Magic with AI</h2>
              <p>Enter a description and our GPU engine will render your video.</p>
              
              <div className="input-group">
                <input 
                  value={prompt} 
                  onChange={e => setPrompt(e.target.value)} 
                  placeholder="A golden retriever surfing in Hawaii..." 
                />
                <button onClick={handleGenerate} disabled={loading}>
                  {loading ? "Rendering..." : "Generate Video"}
                </button>
              </div>
            </div>

            {videoUrl && (
              <div className="video-container glass-card">
                <video controls autoPlay src={videoUrl} />
                <a href={videoUrl} download className="download-btn">Download Video</a>
              </div>
            )}
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;

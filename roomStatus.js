const supabaseUrl = 'https://puisbpdboykphyeexnrh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1aXNicGRib3lrcGh5ZWV4bnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NTUwMDEsImV4cCI6MjAyMTIzMTAwMX0.Sl_aehSlK5xgim5BoGfD4IAezVMuKEi77XmUW2_yRWw';
const supabase = createClient(supabaseUrl, supabaseKey);

const tableBody = document.getElementById('roomTable').getElementsByTagName('tbody')[0];

async function fetchRoomStatus() {
  // Fetch room status data from Supabase
  // ...

  // Populate the table based on the room status data
  // ...
}

// Fetch room status initially
fetchRoomStatus();

// Periodically update the room status (e.g., every 5 seconds)
setInterval(fetchRoomStatus, 5000);

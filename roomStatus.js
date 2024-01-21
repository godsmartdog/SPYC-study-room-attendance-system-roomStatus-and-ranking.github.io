const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
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

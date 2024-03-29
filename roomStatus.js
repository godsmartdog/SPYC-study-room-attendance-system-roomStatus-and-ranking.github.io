import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


async function fetchRoomStatus() {

  const supabaseUrl = 'https://puisbpdboykphyeexnrh.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1aXNicGRib3lrcGh5ZWV4bnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NTUwMDEsImV4cCI6MjAyMTIzMTAwMX0.Sl_aehSlK5xgim5BoGfD4IAezVMuKEi77XmUW2_yRWw';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const tableBody = document.getElementById('roomTable').getElementsByTagName('tbody')[0];

  // Fetch room status data from Supabase
 const { data: roomStatusData, error } = await supabase
    .from('roomStatus')
    .select('*');

  // Clear the table body
  tableBody.innerHTML = '';

  // Populate the table based on the room status data
  roomStatusData.forEach((status) => {
    const row = document.createElement('tr');
    
    const attendeeIdCell = document.createElement('td');
    const checkInCell = document.createElement('td');
 

    
    attendeeIdCell.textContent = status.attendee_id;
    checkInCell.textContent = status.check_in_time;
    

   
    row.appendChild(attendeeIdCell);
    row.appendChild(checkInCell);
    

    tableBody.appendChild(row);
  });
}

// Fetch room status initially
fetchRoomStatus();

// Periodically update the room status (e.g., every 5 seconds)
setInterval(fetchRoomStatus, 5000);

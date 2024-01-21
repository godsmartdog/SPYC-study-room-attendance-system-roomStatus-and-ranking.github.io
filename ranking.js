const supabaseUrl = 'https://puisbpdboykphyeexnrh.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const tableBody = document.getElementById('rankingTable').getElementsByTagName('tbody')[0];

async function fetchRankingData() {
  const { data, error } = await supabase
    .from('room_status')
    .select('name, total_time')
    .order('total_time', { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  // Clear previous table rows
  tableBody.innerHTML = '';

  if (data.length === 0) {
    const row = tableBody.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 3;
    cell.textContent = 'No attendees in the room.';
  } else {
    data.forEach((attendee, index) => {
      const row = tableBody.insertRow();
      const rankCell = row.insertCell();
      const nameCell = row.insertCell();
      const timeCell = row.insertCell();
      rankCell.textContent = index + 1;
      nameCell.textContent = attendee.name;
      timeCell.textContent = attendee.total_time;
    });
  }
}

// Fetch ranking data initially
fetchRankingData();

// Periodically update the ranking data (e.g., every 5 seconds)
setInterval(fetchRankingData, 5000);

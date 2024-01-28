import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

async function fetchRankingData() {

const supabaseUrl = 'https://puisbpdboykphyeexnrh.supabase.co';
const supabaseKey = 'the api key';
const supabase = createClient(supabaseUrl, supabaseKey);

const tableBody = document.getElementById('rankingTable').getElementsByTagName('tbody')[0];

  
  const { data, error } = await supabase
    .from('ranking')
    .select('attendee_Id, total_time')
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
      nameCell.textContent = attendee.attendee_Id;
      timeCell.textContent = attendee.total_time;
    });
  }
}

// Fetch ranking data initially
fetchRankingData();

// Periodically update the ranking data (e.g., every 5 seconds)
setInterval(fetchRankingData, 5000);

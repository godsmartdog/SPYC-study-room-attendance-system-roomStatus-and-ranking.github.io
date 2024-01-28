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
// Function to generate the text file
function generateTextFile() {
  const rewardsList = document.getElementById('rewardsList').textContent;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const nextYear = currentYear + 1;
  const fileName = `${currentYear}-${nextYear}.txt`;

  // Create the file content with the rewards list
  const fileContent = `Rewards List (${currentYear}-${nextYear}):\n\n${rewardsList}`;

  // Create a new Blob object with the file content
  const blob = new Blob([fileContent], { type: 'text/plain' });

  // Create a temporary link element to download the file
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  // Simulate a click event on the link to trigger the file download
  link.click();

  // Clean up the temporary link
  URL.revokeObjectURL(link.href);
}

// Function to check if it's the 31st of January or the 31st of August
function checkFileGeneration() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDateOfMonth = currentDate.getDate();

  if ((currentMonth === 0 && currentDateOfMonth === 31) || (currentMonth === 7 && currentDateOfMonth === 31)) {
    // Generate the text file
    generateTextFile();
  }
}

// Execute checkFileGeneration each day
setInterval(checkFileGeneration, 1000 * 60 * 60 * 24); // Executes every day
// Fetch ranking data initially
fetchRankingData();

// Periodically update the ranking data (e.g., every 5 seconds)
setInterval(fetchRankingData, 5000);

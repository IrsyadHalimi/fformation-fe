document.getElementById('fetchDataBtn').addEventListener('click', async () => {
  const category = document.getElementById('category').value;
  const inputId = document.getElementById('inputId').value.trim();
  const output = document.getElementById('results');

  output.innerHTML = `<p>Loading...</p>`;

  try {
    let url = `http://localhost:9000/v4/${category}`;
    if (inputId) url += `/${inputId}`;

    // Add the 'mode' option to the fetch request
    const response = await fetch(url); 

    if (!response.ok) throw new Error('Failed to fetch data.');

    const data = await response.json();
    console.log(data);
    displayResults(data.competitions);
  } catch (error) {
    output.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

function displayResults(data) {
  const output = document.getElementById('results');
  output.innerHTML = '';

  if (data) {
    const competitionList = document.createElement('div');
    competitionList.classList.add('competition-list');
    output.appendChild(competitionList);

    data.forEach(item => {
      const competitionItem = document.createElement('div');
      competitionItem.classList.add('competition-item');

      const name = document.createElement('h3');
      name.textContent = item.name;
      competitionItem.appendChild(name);
      
      const area = document.createElement('p');
      area.innerHTML = `Area: ${item.area.name} (${item.area.code})`;
      competitionItem.appendChild(area);

      const details = document.createElement('ul');
      details.classList.add('competition-details');
      competitionItem.appendChild(details);

      const detailItems = [
        { label: 'Code:', value: item.code },
        { label: 'Type:', value: item.type },
        { label: 'Emblem:', value: `<img src="${item.emblem}">` },
      ];

      detailItems.forEach(detail => {
        const detailItem = document.createElement('li');
        detailItem.innerHTML = `<b>${detail.label}</br> ${detail.value}`;
        details.appendChild(detailItem);
      });

      if (item.currentSeason) {
        const currentSeason = document.createElement('div');
        currentSeason.classList.add('current-season');
        currentSeason.innerHTML = `<b>Current Season:</b>`;
        competitionItem.appendChild(currentSeason);

        const seasonDetails = document.createElement('ul');
        seasonDetails.classList.add('season-details');
        currentSeason.appendChild(seasonDetails);

        const seasonInfo = [
          { label: 'Start Date:', value: item.currentSeason.startDate },
          { label: 'End Date:', value: item.currentSeason.endDate },
          { label: 'Current Matchday:', value: item.currentSeason.currentMatchday },
        ];

        seasonInfo.forEach(info => {
          const infoItem = document.createElement('li');
          infoItem.innerHTML = `<b>${info.label}</b> ${info.value}`;
          seasonDetails.appendChild(infoItem);
        });
      }

      competitionList.appendChild(competitionItem);
    });
  } else {
    output.innerHTML = `<p>Hmm..</p>`;
  }
    
  //   data.forEach(item => {
  //     const div = document.createElement('div');
  //     div.className = 'result-item';
  //     div.innerHTML = `<pre>${JSON.stringify(item, null, 2)}</pre>`;
  //     output.appendChild(div);
  //   });
  // } else {
  //   output.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  // }
}
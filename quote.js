window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;
      fetchQuotes(selectedTopic, selectedCount);
    });
  });
  
  async function fetchQuotes(topic, count) {
  
    const response = await fetch(
      `https://wp.zybooks.com/quotes.php?topic=${topic}&count=${count}`
    );
    const fetchedQuotesFromAPI = await response.json();
  
    let html = "";
  
    if (fetchedQuotesFromAPI.error) {
      html = `${fetchedQuotesFromAPI.error}`;
    } else {
      html = "<ol>";
      for (let c = 0; c < count; c++) {
        html += `<li>${fetchedQuotesFromAPI[c].quote} - ${fetchedQuotesFromAPI[c].source}</li>`;
      }
      html += "</ol>";
    }
    document.querySelector("#quotes").innerHTML = html;
  }
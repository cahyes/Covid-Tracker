document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  //   const searchInput = document.getElementById("searchInput");
  const activeCasesElement = document.getElementById("activeCases");
  const countryNameElement = document.getElementById("countryName");
  const newCasesElement = document.getElementById("newCases");
  const recoveredCasesElement = document.getElementById("recoveredCases");
  const totalCasesElement = document.getElementById("totalCases");
  const totalDeathsElement = document.getElementById("totalDeaths");
  const totalTestsElement = document.getElementById("totalTests");

  //form submit nilai
  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;

    //nilai inputan dijadikan parameter country
    //masukkan API
    const url = `https://covid-193.p.rapidapi.com/statistics?country=${searchInput}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3cb1e068b7msh5f7363d1341de73p1c4af2jsn242d7fff2bca",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    };

    //fetch API
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      // Perbarui nilai pada card-text dengan data yang diterima dari API
      const statistics = data.response[0]; // Mengambil data dari elemen pertama dalam array response
      countryNameElement.textContent = statistics.country || "N/A";
      activeCasesElement.textContent = statistics.cases.active || "N/A";
      newCasesElement.textContent = statistics.cases.new || "N/A"; // Menggunakan 'N/A' jika data new tidak tersedia
      recoveredCasesElement.textContent = statistics.cases.recovered || "N/A";
      totalCasesElement.textContent = statistics.cases.total || "N/A";
      totalDeathsElement.textContent = statistics.deaths.total || "N/A";
      totalTestsElement.textContent = statistics.tests.total || "N/A";
    } catch (error) {
      countryNameElement.textContent = "Data tidak ditemukan";
      console.error(error);
    }
  });
});

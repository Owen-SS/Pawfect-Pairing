async function FetchBreeds(
    type: string,

) {
    const response = await fetch('https://dogapi.dog/api/v2/breeds');
    const data = await response.json();
  }




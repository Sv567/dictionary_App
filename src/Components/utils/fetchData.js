export const exerciseOptions = {
    method: 'GET',
    // url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
    // params: {limit: '10'},
    headers: {
      'X-RapidAPI-Key': '43ed111151msh78ae25f4216a13fp1de7fbjsn3bce1bf0f397',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
}
export const fetchData = async (url ,options) => {
  const response = await fetch(url , options)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  return data;
}


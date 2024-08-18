import Papa from 'papaparse';

interface CountryData {
  name: string;
  cases: number;
  deaths: number;
  coordinates: [number, number];
}

export const parseCSV = async (url: string): Promise<CountryData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const formattedData: CountryData[] = result.data.map((item: any) => ({
          name: item.country,
          cases: item.cases,
          deaths: item.deaths,
          coordinates: [item.longitude, item.latitude],
        }));
        resolve(formattedData);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
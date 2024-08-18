// utils/csvReader.ts
import Papa from 'papaparse';

// Define the interface for your data
interface CountryData {
  name: string;
  cases: number;
  coordinates: [number, number];
}

// Function to fetch and parse CSV data
export const parseCSV = async (url: string): Promise<CountryData[]> => {
  return new Promise<CountryData[]>((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result.data) {
          // Format the data to match your desired structure
          const formattedData: CountryData[] = result.data.map((item: any) => ({
            name: item.country, // Adjust according to your CSV header
            cases: item.cases,
            coordinates: [item.longitude, item.latitude],
          }));
          resolve(formattedData);
        } else {
          reject('No data');
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

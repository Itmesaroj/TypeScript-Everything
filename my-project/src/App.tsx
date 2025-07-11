import { useEffect, useState } from "react";

// Define the structure of each image item returned by the API
interface ImageData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function App() {
  const [data, setData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`https://picsum.photos/v2/list?page=1&limit=10`);
      if (!res.ok) {
        throw new Error("This is the Error");
      }
      const data: ImageData[] = await res.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Some error occurred.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {data.map((item) => (
        <div key={item.id} className="border rounded-lg overflow-hidden shadow-md">
          <img src={item.download_url} alt={item.author} className="w-full h-48 object-cover" />
          <div className="p-2">
            <h2 className="font-semibold text-lg">{item.author}</h2>
            <p className="text-sm text-gray-500">Image ID: {item.id}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm hover:underline"
            >
              View on Unsplash
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";

function useFetch(url: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                setData(res.data)
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            setError(err)
        })
    }, [url])
  
    return { data, loading, error }
}
  
  export default useFetch
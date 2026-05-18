import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTMDB<T>(endpoint: string | null, params: Record<string, string | number> = {}) {
  const searchParams = new URLSearchParams();
  if (endpoint) searchParams.append('endpoint', endpoint);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, String(value));
  });

  const key = endpoint ? `/api/tmdb?${searchParams.toString()}` : null;
  return useSWR<T>(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
}

export function useTMDBInfinite<T>(endpoint: string, params: Record<string, string | number> = {}) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.results?.length) return null;
    
    const searchParams = new URLSearchParams();
    searchParams.append('endpoint', endpoint);
    searchParams.append('page', (pageIndex + 1).toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });

    return `/api/tmdb?${searchParams.toString()}`;
  };

  return useSWRInfinite<any>(getKey, fetcher, {
    revalidateOnFocus: false,
    persistSize: true,
  });
}

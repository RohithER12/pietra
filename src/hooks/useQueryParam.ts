import { useLocation } from 'react-router';

export function useQueryParam(key: string) {
    const { search } = useLocation();
    return new URLSearchParams(search).get(key);
}

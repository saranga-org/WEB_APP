import { useSelector } from 'react-redux';

export const useAuthToken = () => {
    const { user } = useSelector((state) => state.auth);
    return user && user.token;
};


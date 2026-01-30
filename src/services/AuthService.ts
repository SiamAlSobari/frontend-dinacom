import { apiClient } from '@/common/libs/axios';
import { setUser } from '@/common/stores/user';

interface SignInPayload {
    email: string;
    password: string;
}

interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}


class AuthService {
    public async signIn(payload: SignInPayload) {
        const response = await apiClient({ method: 'post', url: '/auth/login', data: payload });
        return response;

    }

    // Sign Up / Register
    public async signUp(payload: SignUpPayload) {
        const response = await apiClient({ method: 'post', url: '/auth/register', data: payload });
        return response;
    }

    public async session() {
        const response = await apiClient<{ data: { user: { id: string } } }>({ method: 'get', url: '/auth/session' });
        setUser(response.data.user.id);
        return response.data.user;

    }

    public async signOut() {
        const response = await apiClient({ method: 'delete', url: '/auth/logout' });
        setUser(null);
        return response;
    }
}

export default new AuthService();
import { apiClient } from '@/common/libs/axios';

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
        const response = await apiClient({ method: 'get', url: '/auth/session' });
        return response;

    }
}

export default new AuthService();
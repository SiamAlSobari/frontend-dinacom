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
        try {
            const response = await apiClient({ method: 'post', url: '/auth/login', data: payload });
            return response;
        } catch (error: any) {
            throw error.response?.data || { success: false, message: 'Sign in failed' };
        }
    }

    // Sign Up / Register
    public async signUp(payload: SignUpPayload) {
        try {
            const response = await apiClient({ method: 'post', url: '/auth/register', data: payload });
            return response;
        } catch (error: any) {
            throw error.response?.data || { success: false, message: 'Sign up failed' };
        }
    }

    public async session() {
        try {
            const response = await apiClient({ method: 'get', url: '/auth/session' });
            return response;
        } catch (error: any) {
            throw error.response?.data || { success: false, message: 'Fetch session failed' };
        }
    }
}

export default new AuthService();
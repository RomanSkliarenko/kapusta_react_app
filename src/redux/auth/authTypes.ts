export type AuthInitialStateType = {
    isLoading: boolean;
    isLogin: boolean;
    error: string | null;
    userEmail: string | null;
    userSid: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    transactions: any[] | null;
    balance: number | null;
};

export interface RegisterUserData {
    email: string;
    password: string;
}

export interface RegisterUserResponse {
    email: string;
    id: string;
}

interface UserData {
    email: string;
    balance: number;
    id: string;
    transactions: Transaction[];
}

interface Transaction {
    description: string;
    category: string;
    amount: number;
    date: string;
    _id: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    accessToken: string;
    refreshToken: string;
    sid: string;
    userData: UserData;
}

export interface GetUserResponse {
    email: string;
    balance: number;
    transactions: Transaction[];
}

export interface NotiflixOptions {
    position: 'right-top' | 'right-bottom' | 'left-top' | 'left-bottom' | 'center-top' | 'center-bottom' | 'center-center' | undefined
    distance: string;
    backOverlay: boolean;
    clickToClose: boolean;
    useIcon: boolean;
}

export interface NotificationOptionsInterface {
    failure: NotiflixOptions;
    success: NotiflixOptions;
}
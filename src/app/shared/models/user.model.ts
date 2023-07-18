/* USER MODEL */
export interface USER_MODEL {
    user_id:  number;
    display_name: string;
    email: string;
    password: string;
}

/* LOGIN MODEL */
export interface LOGIN_MODEL {
    email: string;
    password: string;
}
/* QUESTION MODEL */
export interface QUESTION_MODEL {
    question_id: number;
    question: string;
    additional_info: string;
    category: string;
    date_created: string;
    question_asker_id: number;
    question_asker: string;
    answers: ANSWER_MODEL[]
}

/* CREATE QUESTION MODEL */
export interface CREATE_QUESTION_MODEL {
    question: string;
    additional_info: string;
    category: string;
    user_id: number;
    display_name: string;
}

/* UPDATE QUESTION MODEL */
export interface UPDATE_QUESTION_MODEL {
    question: string;
    additional_info: string;
    category: string;
    user_id: number;
    question_id: number;
}

/* ANSWER MODEL */
export interface ANSWER_MODEL {
    answer_id: number;
    answer: string;
    answerer: string;
    vote_count: number;
}
export interface CreateParagraphProps {
    id?: number;
    text: string;
    storyID: number;
}
export interface UpdateParagraphProps extends CreateParagraphProps {
    id: number;
}
export interface FreezeParagraphProps {
    storyID: number;
}

export interface Paragraph {
    id: number;
    text: string;
    author: User;
    freeze: boolean;
    comments: Comment[];
    created_at: string;
}

export interface Comment {
    id: number;
    text: string;
    author: User;
    created_at: string;
}

export interface User {
    id: number;
    login: string;
    nick_name: string;
    type: string;
}

export interface Story {
    id: number;
    title: string;
    author: string;
    abstract: string;
    finish_date: string;
    authors: User[];
    created_at: string;
}

export interface StoryListProps {
    list: Story[];
    title?: string;
    handleClick?: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
}

export enum AUTH {
    FETCHING_AUTH,
    NOT_AUTH,
    IS_AUTH
}

export interface StateProps {
    auth: AUTH;
    pathname?: string;
    storyID?: number;
}

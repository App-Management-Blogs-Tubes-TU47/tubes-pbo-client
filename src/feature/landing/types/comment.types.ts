export interface CommentResponseType {
    message: string;
    status:  number;
    data:    CommentResponseTypeData;
}

export interface CommentResponseTypeData {
    item: CommentResponseTypeItem[];
}

export interface CommentResponseTypeItem {
    id:          string;
    comment:     string;
    blogSlug:    string;
    blogTitle:   string;
    userName:    string;
    userProfile: string;
    createdAt:   Date;
}

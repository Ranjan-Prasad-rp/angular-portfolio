export interface Githubrepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    liveUrl?: string;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
}

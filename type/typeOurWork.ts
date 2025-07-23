export type TypeOurWork = {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    onClick: () => void;
    class: string;
};
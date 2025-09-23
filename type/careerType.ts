export interface Career {
    id: string;   
    createdAt: string;        
    dibaca_oleh: string[]; 
    email: string;    
    favorite: boolean;
    message: string;              
    phone: string;
    from: string;
    position: string;       
    rate: number;          
    name: string;              
}

export interface RequirementCareer {
    id: string,
    title: string,
    description: string,
    list: [],
    update: boolean
}
export interface RespuestaToHeadLines {
    status: string;
    data: Feriados[];
}


export interface Feriados {
    title: string;
    date: string;
    type: string;
    inalienable: boolean;
    extra: string;
}


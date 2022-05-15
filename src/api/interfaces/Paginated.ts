export interface IPaginatedRequest {
    page: number;
}

export interface IPaginatedFetchResponse<T> {
    data: T[];
    total: number;
}

export interface IPaginatedResponse<T> {
    data: T[];
    totalElements: number;
    page: number;
    elements: number;
    elementsPerPage: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}

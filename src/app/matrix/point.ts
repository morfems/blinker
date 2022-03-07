export interface Point {
    x: number;
    y: number;
    color: string;
    isBlinking: boolean;
}

export type Matrix = Point[][];
export interface Position {
    x: number;
    y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface PlayerStatus {
    direction: Direction;
    x: number;
    y: number;
}

export interface PlayerMovementEvent {
    movement: PlayerStatus[][]
}


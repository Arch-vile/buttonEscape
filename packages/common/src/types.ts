export interface Position {
    x: number;
    y: number;
}

export interface PlayerStatus {
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    x: number;
    y: number;
}

export interface PlayerMovementEvent {
    movement: PlayerStatus[][]
}


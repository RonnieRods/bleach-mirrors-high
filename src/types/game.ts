export type CardType = 'Attack' | 'Tech' | 'Support';
export type GameRarity = 1 | 2 | 3 | 4;
export type GameElement = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Cyan' | 'Blue' | 'Violet' | 'Gray';


export interface ArtsCard {
    id: string;
    name: string;
    type: CardType;
    cost: number;
    description: string;
}

export interface SoulDriveLogic {
    triggersOn: string[]; // Character IDs that this hero synergizes with
    comboFinisher: string; // The name of the ultimate linked attack
    requiredArtsChain: CardType[]; // The exact order of card types needed to launch it
}

export interface Character {
    id: string;
    name: string;
    title: string;
    rarity: GameRarity;
    element: GameElement;
    role: string;
    avatarUrl: string;
    artsDeck: ArtsCard[];
    soulDriveLinks: SoulDriveLogic;
}

export type OnSelectCharacter = (character: Character) => void;
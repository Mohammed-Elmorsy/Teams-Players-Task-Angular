import { Player } from "./player";

export class Team {
    id?: number;
    name?: string;
    country?: string;
    foundationDate?: number = new Date().getTime();
    coachName?: string;
    logoImageName?: string;
    players?: Player[];
}

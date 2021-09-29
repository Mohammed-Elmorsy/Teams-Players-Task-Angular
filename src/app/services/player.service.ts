import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  updatePlayer(player: Player) {
    return this.http.put(`${environment.baseURL}/players`, player);
  }

  deletePlayer(playerId: any) {
    return this.http.delete(`${environment.baseURL}/players/${playerId}`);
  }

  addPlayers(players: Player[]) {
    return this.http.post<Player[]>(`${environment.baseURL}/players`, players);
  }
}

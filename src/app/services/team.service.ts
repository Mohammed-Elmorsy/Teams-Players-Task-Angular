import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAllTeams() {
    return this.http.get<Team[]>(`${environment.baseURL}/teams`);
  }

  updateTeam(team: Team) {
    return this.http.put(`${environment.baseURL}/teams`, team);
  }

  addTeam(team: Team) {
    return this.http.post(`${environment.baseURL}/Teams/AddTeamWithPlayers`, team);
  }
}

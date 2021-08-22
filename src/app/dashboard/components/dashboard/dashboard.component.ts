import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
  // -------------------------------------------------- constructor --------------------------------------------------
  constructor(private fb: FormBuilder, private teamsService: TeamService,
              private auth: AuthService, private router: Router, private messageService: MessageService,
              private primengConfig: PrimeNGConfig, private playerService: PlayerService,
              private confirmationService: ConfirmationService) {
                this.role = this.auth.getUserPayLoad().role;
                if (this.role === 'Admin') this.isAdmin = true;
                else this.isAdmin = false;
   }
  // ----------------------------------------------------- fields ----------------------------------------------------
  teams: Team[] = [];
  items: MenuItem[];
  role: any;
  isAdmin: boolean = false;
  msgs: Message[] = [];
  displayEditTeam: boolean = false;
  displayEditPlayer: boolean = false;
  displayAddTeamWithPlayers: boolean = false;
  playerTeamId: number = -1;
  teamForm: FormGroup;  
  playerForm: FormGroup; 

  get teamName() {
      return this.teamForm.get('name') as FormControl;
  }
  get playerName() {
    return this.playerForm.get('name') as FormControl; 
  }
  // ----------------------------------------------- life cycle hooks ------------------------------------------------
  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.teamsService.getAllTeams().subscribe( result => {
      this.teams = result;
    })
  }
  // --------------------------------------------------- methods -----------------------------------------------------
  trackById(index: number, obj: any) {
    return obj.id;
  }

  logout(){
    this.auth.logout().subscribe( 
      result => {
        console.log("user logged out successfully", result);
        localStorage.removeItem('token');   
        this.router.navigate(["auth/login"]);
      },
      error => {
        alert('error while logging out');
        console.log("error while logging out", error);
      })

  }

  showTeamEditDialog(team: Team){
    this.displayEditTeam = true;
    this.createTeamForm(team);
  }

  showPlayerEditDialog(player: Player, teamId: any){
    this.displayEditPlayer = true;
    this.playerTeamId = teamId;
    this.createPlayerForm(player);
  }

  showAddTeamWithPlayersDialog(){
    this.displayAddTeamWithPlayers = true;
    this.createTeamWithPlayersStepper();
  }

  nextPage() {
        this.router.navigate(['steps/players']);
  }
  prevPage() {
    this.router.navigate(['steps/team']);
}


  createTeamForm(team: Team) {
    this.teamForm = this.fb.group({
      id : [team.id],
      name: [team.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      country: [team.country, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      foundationDate: [team.foundationDate],
      coachName: [team.coachName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      logoImageName: ['placeholder.png']
    })
  }

  createPlayerForm(player: Player) {
    this.playerForm = this.fb.group({
      id : [player.id],
      name: [player.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      nationality: [player.nationality, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dateOfBirth: [player.dateOfBirth],
      imageName: ['placeholder.png']
    })
  }

  createTeamWithPlayersStepper() {
      this.items = [{
          label: 'Team',
          routerLink: 'team'
      },
      {
          label: 'Players',
          routerLink: 'players'
      },
    ];
  }

  updateTeam() {
    console.log('teamToChange', this.teamForm.value);
    this.teamsService.updateTeam(this.teamForm.value).subscribe(
      res => {
        console.log('res', res);
        //alert('updated successfully');
        let index = this.teams.findIndex(team => team.id === this.teamForm.value.id);
        let players = this.teams[index].players;
        this.teams[index] = { ...this.teamForm.value, players };
        this.messageService.add({key: 'team', severity:'success', summary: 'Updated', detail: 'Successfully updated team info'});
        this.displayEditTeam = false;
      },
      err => {
        console.log('err', err);
        alert('updated failed');
      });
  }

  updatePlayer() {
    this.playerService.updatePlayer(this.playerForm.value).subscribe(
      res => {
        console.log('res2', res);
        //alert('updated successfully');
        let teamIndex = this.teams.findIndex(team => team.id === this.playerTeamId);
        if (teamIndex > -1) {
          let playerIndex = this.teams[teamIndex].players?.findIndex(player => player.id === this.playerForm.value.id);
          if (playerIndex > -1){
            this.teams[teamIndex].players[playerIndex] = this.playerForm.value;
          }
        }

        this.messageService.add({key: 'player', severity:'success', summary: 'Updated', detail: 'Successfully updated player info'});
        this.displayEditPlayer = false;
      },
      err => {
        console.log('err2', err);
        alert('updated failed');
      });
  }


  confirmDeletePlayer(playerId: number, teamId: number) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete?',
        header: 'Delete Confirmation',
        icon: 'pi pi-danger-circle',
        accept: () => {
            this.playerService.deletePlayer(playerId).subscribe( res =>{
              let teamIndex = this.teams.findIndex(team => team.id === teamId);
              if (teamIndex > -1) {
                console.log('teamIndex', teamIndex);

                let playerIndex = this.teams[teamIndex].players?.findIndex(player => player.id === playerId);
                if (playerIndex > -1){
                  console.log('playerIndex', playerIndex);
                  this.teams[teamIndex].players.splice(playerIndex, 1);
                }
              }
              this.msgs = [{severity: 'info', summary:'Confirmed', detail:'Deleted'}];
            });
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'Error on delete'}];
        }
    });
}

}

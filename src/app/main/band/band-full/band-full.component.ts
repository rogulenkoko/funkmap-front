import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { BandService } from "app/main/band/band.service";
import { ActivatedRoute } from "@angular/router";
import { EditableCardContainer } from 'app/tools/entity-full/editable-card';
import { UserService } from 'app/main/user/user.service';
import { UserDataService } from 'app/main/user/user-data.service';

@Component({
  selector: 'app-band-full',
  templateUrl: './band-full.component.html',
  styleUrls: ['./band-full.component.scss'],
  providers: [EditService]
})
export class BandFullComponent extends EditableCardContainer implements OnInit {

 

  constructor(private editService: EditService,
              private bandService: BandService,
              private route: ActivatedRoute,
              userService: UserService,
              userDataService: UserDataService) {
    super(userService, userDataService);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshBand(login);
    })
  }

  private refreshBand(login: string) {
    this.checkIsUserEntity(login);
    if(this.editService.baseModel && this.editService.baseModel.login == login){
      return;
    }
    this.bandService.getBand(login).subscribe(band => {
      this.editService.baseModel = band;
    })
  }

}

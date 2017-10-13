import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseModel } from "app/core";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { EditService } from "app/tools/entity-full/edit.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { RouteBuilder } from "app/tools/route-builder";
import { SaveImageRequest } from "app/main/user/save-image-request";
import { BaseEditService } from "app/tools/entity-full/base-edit.service";
import { InfoItem } from 'app/tools/entity-full/info-item';
import { ActionItem } from 'app/tools/entity-full/action-item';
import { BaseService } from 'app/tools/base.service';

@Component({
  selector: 'entity-base',
  templateUrl: './entity-base.component.html',
  styleUrls: ['./entity-base.component.scss']
})
export class EntityBaseComponent extends EditableCard implements OnInit {

  @Input() entity: BaseModel;
  private isFavorite: boolean;

  @Input() underNameTemplate: any;

  @Input() items: Array<InfoItem>;

  @Input() actionItems: Array<ActionItem>;

  @Output() onAvatarLoaded: EventEmitter<string>;

  private canEditPhoto: boolean;

  private isDeleteMode: boolean = false;
  private changeAvatarMode: boolean = false;

  constructor(userService: UserService,
              userDataService: UserDataService,
              private favouritesService: FavouritesService,
              private router: Router,
              private baseEditService: BaseEditService,
              private baseService: BaseService) {
    super(userService, userDataService);
    this.onAvatarLoaded = new EventEmitter<string>();
    
  }

  ngOnInit() {
    
    this.checkIsUserEntity(this.entity.login);
    this.checkIsFavorite();
    this.baseService.getEntitiesImages([this.entity.avatarId]).subscribe(infos=>{
      if(infos && infos.length == 1){
        this.entity.avatar = infos[0].image;
      }
    });
  }

  

  private checkIsFavorite() {
    if(!this.userService.user) return;
    this.favouritesService.getFavouritesLogins().subscribe(favorites => {
      if (favorites.find(x => x == this.entity.login)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    });
  }

  private addToFavorites() {
    this.favouritesService.setFavourite(this.entity.login).subscribe(response => {
      if (response.success) {
        this.isFavorite = !this.isFavorite;
      }
    })
  }

  private changeUserAvatar(){
    this.changeAvatarMode = true;
  }

  private onAvatarSaved(image: string){
      var request = new BaseModel(this.entity.login, this.entity.name, this.entity.entityType);
      request.avatar = image;
      this.baseEditService.update(request).subscribe(response=>{
        if(response.success){
          this.entity.avatar = image;
        }
      });
  }

  protected changeAvatarEditVisible(choice: number) {
      if (!this.isUsers) return;
      if (choice > 0) this.canEditPhoto = true;
      else this.canEditPhoto = false;
  }

  private onAvatarClosed(){
    
  }

  private deleteEntity(){
    this.baseEditService.delete(this.entity.login).subscribe(resp=>{
      if(resp.success) this.router.navigate(['/']);
    });;
  }

  private changeDeleteMode(){
    this.isDeleteMode = !this.isDeleteMode;
  }

}

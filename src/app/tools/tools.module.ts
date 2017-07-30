import { NgModule } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SideComponent } from './side/side.component';
import { CoreModule } from "app/core/core.module";
import { DateSelectProvider } from "./date/date-select-provider.service";
import { EntitySideComponent } from './entity-side/entity-side.component';
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";
import { EntityFullComponent } from './entity-full/entity-full.component';
import { EntityBaseComponent } from './entity-full/entity-base/entity-base.component';
import { EntityMapComponent } from './entity-full/entity-map/entity-map.component';
import { EntityInfoComponent } from './entity-full/entity-info/entity-info.component';
import { EntityVideoComponent } from './entity-full/entity-video/entity-video.component';
import { DatexPipe } from './datex.pipe';
import { SocialComponent } from './social/social.component';
import { SignalrService } from "app/tools/signalr/signalr.service";


@NgModule({
  declarations: [
    ModalComponent,
    SideComponent,
    EntitySideComponent,
    EntityFullComponent,
    EntityBaseComponent,
    EntityMapComponent,
    EntityInfoComponent,
    EntityVideoComponent,
    DatexPipe,
    SocialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    ModalComponent, 
    BrowserModule,
    FormsModule,
    RouterModule,
    SideComponent,
    EntitySideComponent,
    EntityBaseComponent,
    EntityInfoComponent,
    EntityMapComponent,
    EntityVideoComponent,
    DatexPipe,
    SocialComponent
    ],
  providers: [
    DateSelectProvider,
    EntityTypeProvider,
    SignalrService
  ]
})
export class ToolsModule { }

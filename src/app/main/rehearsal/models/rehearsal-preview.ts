
import { BaseModel } from "app/core";
import { EntityType } from "app/main/map/models";


export class Rehearsal extends BaseModel {
    constructor(login?: string, name?: string, entityType?: EntityType) {
        super(login, name, entityType);
    }
    public address: string;

    public static ToRehearsal(data: any): Rehearsal {
        var result = new Rehearsal(data.Login, data.Name, EntityType.RehearsalPoint);
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;

        result.soundCloudLink = data.SoundCloudLink;

        result.latitude = data.Latitude;
        result.longitude = data.Longitude;
        result.address = data.Address;
        return result;
    }
}


export class RehearsalPreview extends BaseModel {
    constructor(login: string, name: string, entityType: EntityType) {
        super(login, name, entityType);
    }
    public address: string;

    public static ToRehearsalPreview(data: any): RehearsalPreview {
        var result = new RehearsalPreview(data.Login, data.Name, EntityType.RehearsalPoint);
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YouTubeLink;
        result.facebookLink = data.FacebookLink;
        return result;
    }
}
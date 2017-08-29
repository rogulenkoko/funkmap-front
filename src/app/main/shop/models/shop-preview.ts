
import { BaseModel } from "app/core";
import { EntityType } from "app/main/map/models";


export class Shop extends BaseModel {

    constructor(login?:string, name?:string, entityType?: EntityType){
        super(login, name, entityType);
    }

    public webSite: string; 
    public address: string;

     public static ToShop(data: any): ShopPreview{
        var result = new Shop(data.Login, data.Name, EntityType.Shop);
        result.webSite = data.WebSite;
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YoutubeLink;
        result.facebookLink = data.FacebookLink;
        result.soundCloudLink = data.SoundCloudLink;
        result.latitude = data.Latitude;
        result.longitude = data.Longitude;
        result.address = data.Address;
        return result;
    }
}


export class ShopPreview extends BaseModel {

    constructor(login:string, name:string, entityType: EntityType){
        super(login, name, entityType);
    }

    public webSite: string; 
    public address: string;

     public static ToShopPreview(data: any): ShopPreview{
        var result = new ShopPreview(data.Login, data.Name, EntityType.Shop);
        result.webSite = data.WebSite;
        result.address = data.Address;
        result.description = data.Description;
        result.avatar = data.Avatar;
        result.vkLink = data.VkLink;
        result.youTubeLink = data.YoutubeLink;
        result.facebookLink = data.FacebookLink;
        result.soundCloudLink = data.SoundCloudLink;
        return result;
    }
}
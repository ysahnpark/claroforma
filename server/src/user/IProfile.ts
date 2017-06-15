import { TypeUID, IEntityBase } from "../foundation/model/IEntityBase";

export interface IProfile extends IEntityBase {
  email: string;
  accountUid: TypeUID;
  synopsys?: string;
  description?: string;

  hometown?: string;
  location?: {
    countryCode: string;
    province: string;
    city: string;
    address: string;
    postalCode: string
  };

  education?: [
    {
      institution: string;
      location: string;
      degree: string;
      field: string;
      description: string;
      activities: string;
      fromDate: string;
      toDate: string;
    }
  ];
  expertise?: [
    {
      area: string;
      level: number;
    }
  ];
  experiences?: [
    {
      institution: string;
      location: string;
      title: string;
      description: string;
      achievements: string;
      fromDate: string;
      toDate: string;
    }
  ];
  accomplishments?: [
    {
      type: string; // certification, awards, recognition, patents, papers, project
      title: string;
      location: string;
      description: string;
      fromDate: string;
      toDate: string;
      url: string;
    }
  ];
  interests?: Array<string>;
  languages?: Array<string>;
  gender?: string;
  website?: string;

}

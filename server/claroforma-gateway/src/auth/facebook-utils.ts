import { IUserRecords } from "../user/IUserRecords";

/**
 * OAuth Strategy Overview
 *
 */
export const mappings = {
  translateEducations: function (education: any): any {
    if (education && education instanceof Array) {
      return education.map( (entry) => {
        return {
          institution: entry.school ? entry.school.name : null,
          location: null,
          degree: entry.degree ? entry.degree.name : entry.type,
          field: entry.concentration ? entry.concentration[0].name : null,
          description: null,
          activities: null,
          fromDate: null,
          toDate: entry.year ? entry.year.name : null
        };
      });
    }
    return null;
  },

  translateExperiences: function(experience: any): any {
    if (experience && experience instanceof Array) {
      return experience.map( (entry) => {
        return {
          institution: entry.employer ? entry.employer.name : null,
            location: entry.location ? entry.location.name : null,
            title: entry.position ? entry.position.name : null,
            description: entry.description ? entry.description : null,
            achievements: null,
            fromDate: entry.start_date ? entry.start_date : null,
            toDate: entry.end_date ? entry.end_date : null
        };
      });
    }
    return null;
  }
};

export function translateProfileToUser(profile: any): IUserRecords {

  const token = Math.random().toString(36).substr(2, 12);
  const exp = new Date();
  exp.setHours(exp.getHours() + 24);

  const userRecords: IUserRecords = {
    account: {
      username: profile._json.email,
      password: null,

      verifiedInd: false,
      // passwordResetToken: token,
      // passwordResetExpires: exp,

      givenName: profile.name.givenName,
      familyName: profile.name.familyName,
      middleName: profile.name.middleName ? profile.name.middleName : null,
      pictureUri: `https://graph.facebook.com/${profile.id}/picture?type=large`,

      dateOfBirth: profile._json.birthday,

      // preferences
      locale: profile._json.locale,
      timezone: profile._json.timezone
    },
    auths: [{
      accountUid: null,
      provider: "facebook",
      providerAccountId: profile.id,
      rawProfile: profile._raw
    }],
    profile: {
      accountUid: null,
      email: profile._json.email,
      gender: profile._json.gender,

      synopsys: profile._json.about,
      description: null,

      hometown: profile._json.hometown ? profile._json.hometown : null,
      location: null,

      education: mappings.translateEducations(profile._json.education),
      expertise: null,
      experiences: mappings.translateExperiences(profile._json.work),
      accomplishments: null,
      interests: null,
      languages: null,
      website: profile._json.website
    }
  };

  return userRecords;
}

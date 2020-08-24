export interface SiteOwner {
  email: string,
  password: string,
  energyType: {
    wind: boolean,
    solar: boolean,
  },
  siteType: {
    roof: boolean,
    land: boolean,
    water: boolean,
  },
  size: string,
  postCode: string,
  streetNumber: string,
  companyName: string,
  name: string,
  phoneNumber: string,
}
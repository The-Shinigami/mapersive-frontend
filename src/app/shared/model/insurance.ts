export default interface Insurance {
  insuranceId: number;
  policyId: number;
  dateOfPurchase: string;
  customerId: number;
  fuel: string;
  vehicleSegment: string;
  premium: number;
  bodilyInjuryLiability: number;
  personalInjuryProtection: number;
  propertyDamageLiability: number;
  collision: number;
  comprehensive: number;
  customerGender: string;
  customerIncomeGroup: string;
  customerRegion: string;
  customerMaritalStatus: number;
}

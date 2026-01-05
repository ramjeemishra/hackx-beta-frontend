
export type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';

export interface TeamMember {
  fullName: string;
  email: string;
  phone: string;
}

export interface RegistrationData {
  teamName: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadGender: Gender;
  totalMembers: number;
  members: TeamMember[];
}

export enum FormStep {
  TEAM_DETAILS = 0,
  MEMBER_DETAILS = 1,
  SUCCESS = 2
}

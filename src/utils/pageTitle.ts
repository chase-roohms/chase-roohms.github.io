import { profileData } from './profileData';

export function getPageTitle(page?: string) {
  const identity = `${profileData.name} | ${profileData.titleDescriptor}`;
  return page ? `${page} | ${identity}` : identity;
}

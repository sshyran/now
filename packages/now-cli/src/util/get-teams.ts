import Client from './client';
import { APIError, InvalidToken } from './errors-ts';
import { Team } from '../types';

let teams: Team[] | undefined;

export default async function getTeams(client: Client) {
  console.log('getTeams');
  console.log({ teams });

  if (teams) return teams;

  try {
    console.log('will fetch teams');

    const res = await client.fetch<{ teams: Team[] }>('/teams');

    teams = res.teams;
    return teams;
  } catch (error) {
    if (error instanceof APIError && error.status === 403) {
      throw new InvalidToken();
    }
    throw error;
  }
}

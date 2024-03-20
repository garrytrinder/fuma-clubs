export function convertTeamNameToUrl(teamName: string) {
  return teamName.toLocaleLowerCase().replaceAll(" ", "-");
}

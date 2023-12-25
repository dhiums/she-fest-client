import Result from "@/components/result/Result";
import {
  CandidateWithPoint,
  GetAllZonesDocument,
  GetAllZonesQuery,
  GetAllZonesQueryVariables,
  GetEnteredProgrammesDocument,
  GetEnteredProgrammesQuery,
  GetEnteredProgrammesQueryVariables,
  Programme,
  TeamWithPoint,
  Zone,
} from "@/gql/graphql";
import { getUrqlClient } from "@/lib/urql";

export default async function page({ params, searchParams }: any) {
  const { client } = getUrqlClient();

  const zones = await client.query<GetAllZonesQuery, GetAllZonesQueryVariables>(
    GetAllZonesDocument,
    {}
  );

  const zone = searchParams.zone || 'A'

  const enteredProgrammes = await client.query<
    GetEnteredProgrammesQuery,
    GetEnteredProgrammesQueryVariables
  >(GetEnteredProgrammesDocument, {
    zone: zone,
  });

  return (
    <Result
      zones={zones.data?.zones as Zone[]}
      results={
        enteredProgrammes.data?.findResultEnteredProgrammesByZone?.programmes as Programme[]
      }
      zone={searchParams.zone}
      topCandidates={enteredProgrammes.data?.findResultEnteredProgrammesByZone?.topCandidates as CandidateWithPoint[]}
      topTeams={enteredProgrammes.data?.findResultEnteredProgrammesByZone?.topTeams as TeamWithPoint[]}
    />
  );
}

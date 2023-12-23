import Result from "@/components/result/Result";
import {
  CandidateWithPoint,
  GetAllProgrammesDocument,
  GetAllProgrammesQuery,
  GetAllProgrammesQueryVariables,
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
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function page({ params, searchParams }: any) {
  const { client } = getUrqlClient();

  const zones = await client.query<GetAllZonesQuery, GetAllZonesQueryVariables>(
    GetAllZonesDocument,
    {}
  );

  const enteredProgrammes = await client.query<
    GetEnteredProgrammesQuery,
    GetEnteredProgrammesQueryVariables
  >(GetEnteredProgrammesDocument, {
    zone: searchParams.zone,
  });

  console.log('====================================');
  console.log(        enteredProgrammes.error
    );
  console.log('====================================');


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

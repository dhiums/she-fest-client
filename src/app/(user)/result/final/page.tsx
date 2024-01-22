import Result from "@/components/result/Result";
import ResultFinal from "@/components/result/final/ResultFinal";
import {
  CandidateWithPoint,
  GetAllZonesDocument,
  GetAllZonesQuery,
  GetAllZonesQueryVariables,
  GetFinalEnteredProgrammesDocument,
  GetFinalEnteredProgrammesQuery,
  GetFinalEnteredProgrammesQueryVariables,
  Programme,
  TeamWithPoint,
  Zone,
  ZonesWithPoint,
} from "@/gql/graphql";
import { getUrqlClient } from "@/lib/urql";

export default async function page() {
  const { client } = getUrqlClient();

  const zones = await client.query<GetAllZonesQuery, GetAllZonesQueryVariables>(
    GetAllZonesDocument,
    {}
  );

  const enteredProgrammes = await client.query<
    GetFinalEnteredProgrammesQuery,
    GetFinalEnteredProgrammesQueryVariables
  >(GetFinalEnteredProgrammesDocument, {
  });

  console.log(enteredProgrammes.data?.findResultEnteredProgrammesByFinal?.topTeams);
  

  return (
    <ResultFinal
      results={
        enteredProgrammes.data?.findResultEnteredProgrammesByFinal?.programmes as Programme[]
      }
      topCandidates={enteredProgrammes.data?.findResultEnteredProgrammesByFinal?.topCandidates as CandidateWithPoint[]}
      topTeams={enteredProgrammes.data?.findResultEnteredProgrammesByFinal?.topTeams as TeamWithPoint[]}
      zonesWithPoint={enteredProgrammes.data?.findResultEnteredProgrammesByFinal?.topZones as ZonesWithPoint[]}
    />
    // <>
    // Updating soon...
    // </>
  );
}

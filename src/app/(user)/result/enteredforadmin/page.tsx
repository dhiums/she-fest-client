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

  const EnteredProgrammes = await client.query<
    GetFinalEnteredProgrammesQuery,
    GetFinalEnteredProgrammesQueryVariables
  >(GetFinalEnteredProgrammesDocument, {
  });

  console.log(EnteredProgrammes.data?.findResultEnteredProgrammesByFinal);
  

  return (
    <ResultFinal
      results={
        EnteredProgrammes.data?.findResultEnteredProgrammesByFinal?.programmes as Programme[]
      }
      topCandidates={EnteredProgrammes.data?.findResultEnteredProgrammesByFinal?.topCandidates as CandidateWithPoint[]}
      topTeams={EnteredProgrammes.data?.findResultEnteredProgrammesByFinal?.topTeams as TeamWithPoint[]}
      zonesWithPoint={EnteredProgrammes.data?.findResultEnteredProgrammesByFinal?.zonesWithPoint as ZonesWithPoint[]}
    />
    // <>
    // Updating soon...
    // </>
  );
}

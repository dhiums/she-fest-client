import Result from "@/components/result/Result";
import ResultFinal from "@/components/result/final/ResultFinal";
import {
  CandidateWithPoint,
  GetAllZonesDocument,
  GetAllZonesQuery,
  GetAllZonesQueryVariables,
  GetFinalPublishedProgrammesDocument,
  GetFinalPublishedProgrammesQuery,
  GetFinalPublishedProgrammesQueryVariables,
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

  const publishedProgrammes = await client.query<
    GetFinalPublishedProgrammesQuery,
    GetFinalPublishedProgrammesQueryVariables
  >(GetFinalPublishedProgrammesDocument, {
  });

  console.log(publishedProgrammes.data?.findResultPublishedProgrammesByFinal?.topTeams);
  

  return (
    <ResultFinal
      results={
        publishedProgrammes.data?.findResultPublishedProgrammesByFinal?.programmes as Programme[]
      }
      topCandidates={publishedProgrammes.data?.findResultPublishedProgrammesByFinal?.topCandidates as CandidateWithPoint[]}
      topTeams={publishedProgrammes.data?.findResultPublishedProgrammesByFinal?.topTeams as TeamWithPoint[]}
      zonesWithPoint={publishedProgrammes.data?.findResultPublishedProgrammesByFinal?.zonesWithPoint as ZonesWithPoint[]}
    />
    // <>
    // Updating soon...
    // </>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getUrqlClient } from "@/lib/urql";
import {
  GetAllProgrammesDocument,
  GetAllProgrammesQuery,
  GetAllProgrammesQueryVariables,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";

export async function GET() {
  const { client } = getUrqlClient();
  const res = await client.query<
    GetAllProgrammesQuery,
    GetAllProgrammesQueryVariables
  >(GetAllProgrammesDocument, {
    api_key: API_KEY,
  });
  console.log(res);
  

  return NextResponse.json(res.data?.programmes);
}

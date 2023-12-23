
"use client";
import { Candidate } from '@/gql/graphql';
import data from './data.json';

export default function Page(){

    // console.log(data.data.searchCandidates.totalCandidates);

    // data.data.searchCandidates.candidates.map((item: Candidate) => {
    //     if(item?.candidateProgrammes?.length > 6){
    //         console.log(item?.name , item?.candidateProgrammes?.length);
    //         console.log(item?.chestNO);
    //         console.log(item?.team?.name);
            
    //     }
    // }
    // );

    return(
        <div>
            <p>Hi</p>
        </div>
    )
}
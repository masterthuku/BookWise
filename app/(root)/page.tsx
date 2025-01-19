import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { Users } from "@/database/schema";

import React from "react";



const Home = async () => {

  const result = await db.select().from(Users)
  console.log(JSON.stringify(result, null, 2));

  return (
    <>

    {/*@ts-expect-error Server Component */}

      <BookOverview {...sampleBooks[0]} />

      {/*@ts-expect-error Server Component */}
      
      <BookList title="Latest Books" books={sampleBooks} className="mt-28" />
    </>
  );
};

export default Home;

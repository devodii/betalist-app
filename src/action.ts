"use server";

import { getServerSession } from "next-auth";

export async function createWaitlist(
  name: string,
  fields: Record<string, boolean>
) {
  const session = await getServerSession();
  const email = session?.user?.email;

  const fieldNames = Object.keys(fields).filter(
    (fieldName) => fields[fieldName]
  );

  const fieldColumns = fieldNames
    .map((fieldName) => `${fieldName} VARCHAR(255)`)
    .join(", ");

  const query = `
  CREATE TABLE ${name}_${email} (
    id SERIAL PRIMARY KEY,
    ${fieldColumns}
  );
`;

  // TODO: Create table using the query

  // Execute the query against Supabase
  // const { data, error } = await supabase.query(query);

  // if (error) {
  //   console.error("Error creating table:", error);
  // } else {
  //   console.log("Table created successfully:", data);
  // }
}

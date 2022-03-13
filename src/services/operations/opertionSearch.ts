import { Tracks } from "models";
import client from "../client";

interface Response {
  tracks: Tracks;
}

export async function opertionSearch(
  q: string,
  opts?: {
    limit: number;
  }
) {
  const { limit } = { ...opts };
  const { data } = await client.get<Response>("/search", {
    params: {
      q,
      type: "track",
      limit: limit || "10",
    },
  });
  return data;
}

export function opertionSearchAlbum(q: string) {
  return client.get("/search", {
    params: {
      q,
      type: "album",
      limit: "10",
    },
  });
}

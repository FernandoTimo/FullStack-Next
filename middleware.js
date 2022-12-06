import { NextResponse } from "next/server";
import fetch from "node-fetch";

const isAdminRoute = (pathname) => {
  return pathname.startsWith("/api/admin");
};

const isUserRoute = (pathname) => {
  return pathname.startsWith("/api/users");
};

export function middleware(req) {
  // const allCookies = req.cookies.getAll();
  // console.log(allCookies);
  const { origin, pathname } = req.nextUrl;
  // fetch(`${process.env.IPREGISTRY_ENDPOINT}${process.env.IPREGISTRY_API_KEY}${process.env.IPGEOAPI_FIELDS}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     // send the data to the usage api
  const data = {
    ip: "181.67.237.8",
    location: {
      country: {
        name: "Peru",
      },
      region: {
        name: "Cusco",
      },
      city: "Cusco",
      latitude: -13.52066,
      longitude: -71.97587,
    },
    user_agent: {
      name: "Chrome",
      device: {
        type: "desktop",
      },
      os: {
        name: "Windows NT",
      },
    },
  };

  const usage_id = req.cookies.get("usage_id");

  if (pathname !== "/api/usage") {
    fetch(`${origin}/api/usage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.USAGE_API_SEED}`,
      },
      body: JSON.stringify({
        route: pathname,
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        req.cookies.set("usage_id", data._id);
        // console.log("data", data);
      });
  }
  //   });

  return NextResponse.next();
}
export const config = {
  matcher: "/api/:path*",
};
